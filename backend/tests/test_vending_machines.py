from app.config import MAX_IMAGE_BYTES, NAME_MAX_LENGTH

API = "/api/vending-machines"
VALID_FORM = {"lat": "34.987594", "lng": "135.7506212", "date": "2026-11-14"}
PNG_BYTES = b"\x89PNG\r\n\x1a\n" + b"0" * 100


def post_machine(client, form=VALID_FORM, content=PNG_BYTES, content_type="image/png"):
    return client.post(API, data=form, files={"image": ("a.png", content, content_type)})


def test_list_is_empty_initially(client):
    res = client.get(API)
    assert res.status_code == 200
    assert res.json() == []


def test_create_and_list(client, upload_dir):
    res = post_machine(client)
    assert res.status_code == 201
    body = res.json()
    assert body["lat"] == 34.987594
    assert body["date"] == "2026-11-14"
    assert body["image_url"].startswith("/uploads/")

    filename = body["image_url"].removeprefix("/uploads/")
    assert (upload_dir / filename).read_bytes() == PNG_BYTES
    assert [m["id"] for m in client.get(API).json()] == [body["id"]]


def test_create_rejects_non_image(client, upload_dir):
    res = post_machine(client, content=b"hello", content_type="text/plain")
    assert res.status_code == 422
    assert list(upload_dir.iterdir()) == []


def test_create_rejects_too_large_image(client, upload_dir):
    res = post_machine(client, content=b"0" * (MAX_IMAGE_BYTES + 1))
    assert res.status_code == 413
    assert list(upload_dir.iterdir()) == []


def test_create_rejects_out_of_range_latitude(client):
    res = post_machine(client, form={**VALID_FORM, "lat": "91"})
    assert res.status_code == 422


def test_create_requires_image(client):
    res = client.post(API, data=VALID_FORM)
    assert res.status_code == 422


def test_delete_removes_record_and_file(client, upload_dir):
    created = post_machine(client).json()

    res = client.delete(f"{API}/{created['id']}")
    assert res.status_code == 204
    assert client.get(API).json() == []
    assert list(upload_dir.iterdir()) == []


def test_delete_unknown_id_returns_404(client):
    res = client.delete(f"{API}/999")
    assert res.status_code == 404


def test_create_defaults_details_to_empty(client):
    body = post_machine(client).json()
    assert body["name"] == ""
    assert body["memo"] == ""
    assert body["payment_methods"] == []


def test_create_with_details(client):
    form = {**VALID_FORM, "name": "  駅前の自販機  ", "memo": "冷たいおしるこあり", "payment_methods": ["cash", "ic"]}
    body = post_machine(client, form=form).json()
    assert body["name"] == "駅前の自販機"  # 前後の空白は取り除く
    assert body["memo"] == "冷たいおしるこあり"
    assert body["payment_methods"] == ["cash", "ic"]
    assert client.get(API).json()[0]["payment_methods"] == ["cash", "ic"]


def test_create_rejects_unknown_payment_method(client, upload_dir):
    res = post_machine(client, form={**VALID_FORM, "payment_methods": ["bitcoin"]})
    assert res.status_code == 422
    assert list(upload_dir.iterdir()) == []


def test_create_rejects_too_long_name(client):
    res = post_machine(client, form={**VALID_FORM, "name": "あ" * (NAME_MAX_LENGTH + 1)})
    assert res.status_code == 422


UPDATED_FORM = {
    "lat": "35.0",
    "lng": "135.0",
    "date": "2026-12-01",
    "name": "新しい名前",
    "memo": "メモ",
    "payment_methods": ["qr"],
}
JPEG_BYTES = b"\xff\xd8\xff" + b"1" * 100


def test_update_details_keeps_image(client, upload_dir):
    created = post_machine(client).json()

    res = client.put(f"{API}/{created['id']}", data=UPDATED_FORM)
    assert res.status_code == 200
    body = res.json()
    assert (body["lat"], body["lng"], body["date"]) == (35.0, 135.0, "2026-12-01")
    assert (body["name"], body["memo"], body["payment_methods"]) == ("新しい名前", "メモ", ["qr"])
    assert body["image_url"] == created["image_url"]
    assert len(list(upload_dir.iterdir())) == 1


def test_update_can_clear_payment_methods(client):
    created = post_machine(client, form={**VALID_FORM, "payment_methods": ["cash"]}).json()
    res = client.put(f"{API}/{created['id']}", data=VALID_FORM)
    assert res.json()["payment_methods"] == []


def test_update_replaces_image_and_deletes_old_file(client, upload_dir):
    created = post_machine(client).json()

    res = client.put(
        f"{API}/{created['id']}",
        data=UPDATED_FORM,
        files={"image": ("b.jpg", JPEG_BYTES, "image/jpeg")},
    )
    assert res.status_code == 200
    new_filename = res.json()["image_url"].removeprefix("/uploads/")
    assert new_filename != created["image_url"].removeprefix("/uploads/")
    assert [p.name for p in upload_dir.iterdir()] == [new_filename]
    assert (upload_dir / new_filename).read_bytes() == JPEG_BYTES


def test_update_rejects_invalid_image_and_keeps_old(client, upload_dir):
    created = post_machine(client).json()

    res = client.put(
        f"{API}/{created['id']}",
        data=UPDATED_FORM,
        files={"image": ("a.txt", b"hello", "text/plain")},
    )
    assert res.status_code == 422
    assert client.get(API).json()[0] == created
    assert len(list(upload_dir.iterdir())) == 1


def test_update_unknown_id_returns_404(client):
    res = client.put(f"{API}/999", data=UPDATED_FORM)
    assert res.status_code == 404


def test_create_and_update_area(client):
    created = post_machine(client).json()
    assert (created["prefecture"], created["city"]) == ("", "")

    form = {**VALID_FORM, "prefecture": "京都府", "city": "京都市"}
    updated = client.put(f"{API}/{created['id']}", data=form).json()
    assert (updated["prefecture"], updated["city"]) == ("京都府", "京都市")
