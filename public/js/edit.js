//地図の初期化
function initMap() {
  // スタイルの設定
  var myMapType = new google.maps.StyledMapType([
    {
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    }],
    {
      name: '登録済み'
  });
  var myMapTypeId = 'my_style';

  // 地図生成
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    scrollwheel: true,
    center: {lat: 34.987594, lng: 135.7506212},
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, myMapTypeId] 
    }
  });
  // 地図にスタイルを追加
  map.mapTypes.set(myMapTypeId, myMapType);
  map.setMapTypeId(myMapTypeId);
  

    //自販機ピンをセット
  function changingimg(Zpin_marker, path, I, ID) {
    google.maps.event.addListener(Zpin_marker, 'click', function() {
      document.getElementById("date").innerHTML = data[I]['date'];
      document.getElementById("imgpath").src = 'storage/' + path;
      document.getElementById("delete-form").action = "delete/*".replace('*', ID);
      document.getElementById("button").disabled = false;
    });
  }

  for (i = 0; i < Number(data.length); i++) {
  var Zpin_marker = new google.maps.Marker({
  position: {lat: data[i]['lat'], lng: data[i]['lng']},
  map: map,
  icon: {
      url: "hata.png",
      size: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
  },
  clickable: true, /* クリック不可 */
  zIndex: 0
  });

  changingimg(Zpin_marker, data[i]['img_path'], i, data[i]['id']);
  }

  $('#image').on('change', function(){
    var $fr = new FileReader();
    $fr.onload = function(){
      $('#preview').attr('src', $fr.result);
    }
    $fr.readAsDataURL(this.files[0]);
  });
}

