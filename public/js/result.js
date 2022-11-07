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
}
