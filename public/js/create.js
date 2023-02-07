3.
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
        name: '自販機登録'
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
    
    //ターゲットスコープをセット
    var tgt_marker = new google.maps.Marker({
      position: {lat: 0, lng: 0},
      map: map,
      icon: {
          url: "icon.png",
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
      },
      clickable: false, /* クリック不可 */
      zIndex: 0
      });
      //ターゲットスコープ表示
      tgt_marker.setMap(map);
  
      //地図の表示内容が変更されたら、センター座標取得しマーカー座標変更
      google.maps.event.addListener( map ,'bounds_changed',function(){
      var pos = map.getCenter();
      tgt_marker.setPosition(pos);
      });

      //マップの中心の緯度、経度の取得
    google.maps.event.addListener( map ,'bounds_changed',function(){
    let latlng = map.getCenter();
    let lat = latlng.lat();
    let lng = latlng.lng();
    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;
    document.getElementById("Lat").innerHTML = '緯度:' + ((Math.floor(lat * 100000))/100000);
    document.getElementById("Lng").innerHTML = '経度:' + ((Math.floor(lng * 100000))/100000);
    // console.log(lng)
    });

}

// input画像のプレビュー
function imgPreView(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  var preview = document.getElementById("preview");
  var previewImage = document.getElementById("previewImage");
   
  if(previewImage != null) {
    preview.removeChild(previewImage);
  }
  reader.onload = function(event) {
    var img = document.createElement("img");
    img.setAttribute("src", reader.result);
    img.setAttribute("id", "previewImage");
    preview.appendChild(img);
  };
 
  reader.readAsDataURL(file);
}
