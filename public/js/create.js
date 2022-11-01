
// 1.地図表示
// // googleMapsAPIを持ってくるときに,callback=initMapと記述しているため、initMap関数を作成
// function initMap() {
//     // welcome.blade.phpで描画領域を設定するときに、id=mapとしたため、その領域を取得し、mapに格納します。
//     map = document.getElementById("map");
//     // 東京タワーの緯度は35.6585769,経度は139.7454506と事前に調べておいた
//     let tokyoTower = {lat: 35.6585769, lng: 139.7454506};
//     // オプションを設定、京都タワー(34.987594,135.7506212,15)
//     opt = {
//         zoom: 13, //地図の縮尺を指定
//         center: tokyoTower, //センターを東京タワーに指定
//     };
//     // 地図のインスタンスを作成します。第一引数にはマップを描画する領域、第二引数にはオプションを指定
//     mapObj = new google.maps.Map(map, opt);

//      // 追加
//      marker = new google.maps.Marker({
//         // ピンを差す位置を決めます。
//         position: tokyoTower,
// 	// ピンを差すマップを決めます。
//         map: mapObj,
// 	// ホバーしたときに「tokyotower」と表示されるようにします。
//         title: 'tokyotower',
//     });
// }


// // 2.地図のスタイル変化
// //地図の初期化
// function initMap() {
//     // 地図生成
//     let map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 12,
//       center: {lat: 35.7, lng: 139.7}, 
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       styles: [
//         {
//           "elementType": "labels",
//           "stylers": [
//             { "visibility": "off" }
//           ]
//         }
//       ]
//     });
//   }


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
        name: 'ラベルなし'
    });
    var myMapTypeId = 'my_style';
  
    // 地図生成
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      scrollwheel: true,
      center: {lat: 35.7, lng: 139.7}, 
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
            url: "./icon.png",
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
