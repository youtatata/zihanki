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

    // //自販機ピンをセット
    // var Zpin_marker = new google.maps.Marker({
    //   position: {lat: 0, lng: 0},
    //   map: map,
    //   icon: {
    //       url: "hata.png",
    //       size: new google.maps.Size(32, 32),
    //       origin: new google.maps.Point(0, 0),
    //       scaledSize: new google.maps.Size(32, 32),
    //       anchor: new google.maps.Point(16, 16)
    //   },
    //   clickable: false, /* クリック不可 */
    //   zIndex: 0
    //   });


    jss = "data"
    document.getElementById("jss").innerHTML = jss;

    datas = "tests"
    document.getElementById("target").innerHTML = datas;
}