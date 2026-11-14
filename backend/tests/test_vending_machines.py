from app.config import MAX_IMAGE_BYTES

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
