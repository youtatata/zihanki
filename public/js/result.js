// 3.
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

}
