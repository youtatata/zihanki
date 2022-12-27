// $(function(){
//   $.ajax({
//     type: "get", //HTTP通信の種類
//     url:'/home', //通信したいURL
//     dataType: 'json'
//   })
//   //通信が成功したとき
//   .done((res) => { // resの部分にコントローラーから返ってきた値 $users が入る
//     $.each(res, function (index, value) {
//       html = `
//                     <tr class="user-list">
//                         <td class="col-xs-2">ユーザー名：${value.lat}</td>
//                     </tr>
//        `;
//     $("#jss").append(html); //できあがったテンプレートを user-tableクラスの中に追加
//     });
//   })
//   //通信が失敗したとき
//   .fail((error) => {
//     console.log(error.statusText);
//   });
// });
// $("#要素名")で、idを指定することができる。
// $(".要素名")で、classを指定することができる。




// function showmarker(marker, name) {
//   var infowindow = new google.maps.InfoWindow({
//     content: name
//   }); //詳細情報のウィンドウを作る

//   google.maps.event.addListener(marker, "mouseover", function() {
//     infowindow.open(map_canvas, marker);
//   }); //カーソルを合わせると情報が表示される

//   google.maps.event.addListener(marker, "mouseout", function() {
//     infowindow.close(map_canvas, marker);
//   });//カーソルを外すと情報が消える
// }







// function createMarker(lat, lng){
//   //        マーカの作成
//             var marker = new google.maps.Marker({
//               position: new google.maps.LatLng(lat, lng),
//               map: map
//             });
//         }


// data = document.getElementById("jss").innerHTML;


// jQuery(function ($) {
//   $.ajax({
//     type: 'POST',
//     dataType: 'html', //他にjsonとか選べるとのこと
//     crossDomain: true,
//     url: home,
//     data: {
//       'action': document.getElementById("jss").innerHTML
//     },
//     success: function (response) {
//       console.log(response);
//       var data = response;
//       for (i = 0; i < data.length; i++) {
//         createMarker(data[i].lat, data[i].lng); 
//       }
//     }
//   });
// })





// function getAllData(){

//   fetch('ajax-test/show_all', { // 第1引数に送り先
//   })
//       .then(response => response.json()) // 返ってきたレスポンスをjsonで受け取って次のthenへ渡す
//       .then(res => {
//        /*--------------------
//             PHPからの受取成功
//            --------------------*/
//           // 取得したレコードをeachで順次取り出す
//           res.forEach(elm =>{
//               var insertHTML = "<tr class=\"target\"><td>" + elm['id'] + "</td><td>" + elm['img_path'] + "</td><td>" + elm['lat'] + "</td></tr>" + elm['lng'] + "</td></tr>"
//               var all_show_result = document.getElementById("all_show_result");
//               all_show_result.insertAdjacentHTML('afterend', insertHTML);
//           })
//           console.log("通信成功");
//           console.log(res); // 返ってきたデータ
//       })

//       .catch(error => {
//           console.log(error); // エラー表示
//       })
// }

// // 関数を実行
// getAllData();

// function クリックリンク(Zpin_marker[i], data[i]['img_path']){
//   google.maps.event.addListener(
//       クリックマーカー,
//       'click',
//       function(event) {
//           window.open(data[i]['img_path']);
//       }
// };


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



      // var point = JSON.parse(response);
      //   var markers = new Array();
      //   var icon = new google.maps.MarkerImage("hata.png"); //アイコンの画像指定
      //   for (var i = 0; i < point.length; i++) {
      //     var marker_options = {
      //       map: map_canvas,
      //       position: new google.maps.LatLng(point[i].lat, point[i].lng),
      //       icon: icon
      //     };
      //   markers[i] = new google.maps.Marker(marker_options);
      // var data =
      //       '<div class="sample">' +
      //       point[i].name +
      //       "</div>" +
      //       point[i].time +
      //       "<div>" +
      //       point[i].detail +
      //       "</div>";
      //     showmarker(markers[i], data);
      //    }


      
    // 文字列をint型に
    // document.getElementById("all_show_result").innerHTML = Number(data[data.length - 1]['lat']);

  
    // datas = document.getElementById("img").innerHTML
    // datas = data[1]['img_path']
    // datas = data.length
    // document.getElementById("target").innerHTML = datas;
    // img = 'storage/img/ncH7qG0C5QUJS0sTTTCLghF5h3gjRXojoWgKxPXj.jpg'
    // img = 'storage/' + data[1]['img_path']
    // document.getElementById("imgpath").src = img


    function changingimg(Zpin_marker, path) {
      google.maps.event.addListener(Zpin_marker, 'click', function() {
        document.getElementById("imgpath").src = 'storage/' + path
      });
    }

    // // jss=jss[3];
    // document.getElementById("all_show_result").innerHTML = all;
    // for (i = 0; i <Number(data[data.length - 1]['lat']); i++) {
    for (i = 0; i < Number(data.length); i++) {    
      //自販機ピンをセット
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

      // // マーカーにクリックイベントを追加
      // function markerEvent(i) {
      //   Zpin_marker[i].addListener('click', function() { // マーカーをクリックしたとき
      //     infoWindow[i].open(map, data[i]['img_path']); // 吹き出しの表示
      // });
      // }
      // markerEvent(i); // マーカーにクリックイベントを追加
   
      // google.maps.event.addListener(Zpin_marker, 'click', function(event) {
      //   document.getElementById("imgpath").src = 'storage/' + data[i]['img_path']
      // });

      changingimg(Zpin_marker, data[i]['img_path']);
    }

}
