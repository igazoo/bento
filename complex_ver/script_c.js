'use strict';



//定数
const name = document.getElementById('name');
const price = document.getElementById('price');
const explanation = document.getElementById('explanation');
const image = document.getElementById('image');
const border = document.getElementById('border');
const borderClass = "col-md-4 border mt-4";



//表示切り替え

//松
document.getElementById('shou').onclick = function(){
  name.textContent = "スペシャル弁当 -松-";
  price.textContent = "1000";
  explanation.textContent = "美味しいスペシャル弁当です。";
  image.src = "img/shou.png";
  border.className = `${borderClass} border-secondary`;
}

//竹
document.getElementById('chiku').onclick = function(){
  name.textContent = "スペシャル弁当 -竹-";
  price.textContent = "2000";
  explanation.textContent = "とっても美味しいスペシャル弁当です。";
  image.src = "img/chiku.png";
  border.className = `${borderClass} border-success`;
}

//梅
document.getElementById('bai').onclick = function(){
  name.textContent = "スペシャル弁当 -梅-";
  price.textContent = "3000";
  explanation.textContent = "とってもとっても美味しいスペシャル弁当です。";
  image.src = "img/bai.png";
  border.className = `${borderClass} border-danger `;
}




//ダイアログ

//アラートダイアログ
const hour = new Date().getHours();
if (hour < 8){
  window.alert('朝は松弁当が一番売れてます！');
} else if (hour < 16){
  window.alert('昼は竹弁当が一番売れてます！');
} else {
  window.alert('夜は梅弁当が一番売れてます！');
}

//カート確認ダイアログ
const sumPrice = [];
document.getElementById('cart-confirm').onclick = function(){
  const cart = window.confirm(`${name.textContent} をカートに入れますか？` );
  const li = `<li class="list-group-item">${name.textContent}</li>`;

  if (cart){
    document.getElementById('cart-list').insertAdjacentHTML('beforeend', li);

    // 合計金額の表示
    let totalPrice;
    sumPrice.push(parseInt(price.textContent));
    totalPrice = sumPrice.reduce((total,x) => total+=x,0);
    document.getElementById('totalPrice').textContent = `合計金額 : ${totalPrice}円`;

  } else {
    window.alert(`カートへの追加をキャンセルしました`)
  }
}

//json ファイルからの在庫状況の取得 (Webサーバー経由で動作)
const stockArray = [];
$(document).ready(function(){
  $.ajax({url:'stock.json', dataType:'json'})
  .done(function(data){
    data.forEach(function(item, index){
      stockArray.push(item.num);
    })
  })
})

console.log(stockArray);

//在庫確認文字列ダイアログ (Webサーバー経由で動作)
document.getElementById('stock-confirm').onclick = function(){
  const stockConfirm = window.prompt(`${name.textContent} の在庫を確認しますか？ yes または no でお答えください。` );
  if (stockConfirm === 'yes'){
    console.log(name.textContent);
    switch(name.textContent) {
      case 'スペシャル弁当 -松-' : window.alert(`在庫は ${stockArray[0]} 個です。`);
      break;
      case 'スペシャル弁当 -竹-' : window.alert(`在庫は ${stockArray[1]} 個です。`);
      break;
      case 'スペシャル弁当 -梅-' : window.alert(`在庫は ${stockArray[2]} 個です。`);
      break;
    }
  } else {
    window.alert(`在庫の確認をキャンセルしました`)
  }
}




//閉店カウントダウン
setInterval(function () {
   let now =  moment();
   let goal = new Date();
   goal.setHours('23');
   goal.setMinutes('59');
   goal.setSeconds('59');
   goal = moment(goal);

   let diff = goal.diff(now);
   let duration = moment.duration( diff );
   document.getElementById('countdown').textContent = `本日閉店まで ${duration.hours()} 時間 ${duration.minutes()} 分 ${duration.seconds()} 秒`;
   console.log(goal);
}, 1000);




//その他メニューの折りたたみ
$(document).ready(function(){
  let hide = 0;

  $('#hide').on('click', function(){
    if (hide === 0) {
      $('#cartlist li').addClass('d-none');
      $('#hide').text('表示');
      hide = 1;
    } else {
      $('#cartlist li').toggleClass('d-none');
      $('#hide').text('非表示');
      hide = 0;
    };
  })
});




//フォーム入力値の取得

//ラジオボタンの入力値を取得して表示
document.getElementById('radioForm').onsubmit = function(event){
  event.preventDefault();

  let radio;
  radio = document.getElementById('radioForm').option.value;
  document.getElementById('optionExplanation').textContent = `ご飯の量 : ${radio}`;
};

//チェックボックスの入力値を取得して表示
document.getElementById('checkboxForm').onsubmit = function(event){
  event.preventDefault();

  let elements = document.getElementsByName('accessory');
  let checkbox = "付属品 :";
  let i=0;
  while(i < 3){
    if(elements[i].checked) checkbox = checkbox + ' ' + elements[i].value;
    i += 1;
  };
  document.getElementById('optionExplanation').textContent = checkbox;
};

//セレクトドロップダウンの入力値を取得して表示
document.getElementById('selectForm').onsubmit = function(event){
  event.preventDefault();
  const option = document.getElementById('selectForm').select.value;
  document.getElementById('optionExplanation').textContent = `当店を知ったきっかけ : ${option}`;
};

//テキストボックスの入力値を取得して表示
//Google Maps API を利用し入力した値に該当する地図を表示
document.getElementById('textForm').onsubmit = function(event){
  event.preventDefault();
  const text = document.getElementById('textForm').text.value;
  const map = `<br><iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC8F2vD0OFURJR3LovVPmhNjTUkNOswwZE&q=${text}"  width="300" height="225" frameborder="0" style="border:0;" allowfullscreen=""></iframe>`;
  document.getElementById('optionExplanation').textContent = `お届け先住所 : ${text}`;
  document.getElementById('optionExplanation').insertAdjacentHTML('beforeend', map);
};

//テキストエリアボックスの入力値を取得して表示
document.getElementById('textareaForm').onsubmit = function(event){
  event.preventDefault();
  const textarea = document.getElementById('textareaForm').textarea.value;
  document.getElementById('optionExplanation').textContent = `その他ご要望 : ${textarea}`;
};



// 現在地から東京駅までの経路
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

let crd;
function success(pos) {
  crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  return {Latitude: crd.latitude, Longitude: crd.longitude};
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


document.getElementById('maptest').onclick = function(){

  let startLatLng = [crd.latitude, crd.longitude]; // 現在地
  let targetLatLng = [35.681382, 139.76608399999998]; // 東京駅
  let goalMarkerImg = 'https://82mou.github.io/src/images/marker-on-dummy.png';
  let map;

  function initialize() {
    let options = {
      zoom: 16,
      center: new google.maps.LatLng(startLatLng[0], startLatLng[1]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), options);
    let rendererOptions = {
      map: map, // 描画先の地図
      draggable: true, // ドラッグ可
      preserveViewport: true // centerの座標、ズームレベルで表示
    };
    let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    let directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);
    let request = {
      origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), // スタート地点
      destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), // ゴール地点
      travelMode: google.maps.DirectionsTravelMode.TRANSIT, // 移動手段
    };
    directionsService.route(request, function(response,status) {
      if (status === google.maps.DirectionsStatus.OK) {
        new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          suppressMarkers: true // デフォルトのマーカーを削除
        });
        let leg = response.routes[0].legs[0];
        makeMarker(leg.end_location, markers.goalMarker, map);
        setTimeout(function() {
          map.setZoom(16); // ルート表示後にズーム率を変更
        });
      }
    });
  }

  function makeMarker(position, icon, map) {
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon
    });
  }

  let markers = {
    goalMarker: new google.maps.MarkerImage(
      goalMarkerImg, // 画像のパス
      new google.maps.Size(24, 33), // マーカーのwidth,height
      new google.maps.Point(0, 0), // 画像データの中で、どの部分を起点として表示させるか
      new google.maps.Point(12, 33), // マーカーのpositionで与えられる緯度経度を画像のどの点にするか
      new google.maps.Size(24, 33)) // 画像の大きさを拡大縮小
  };

  initialize();
}
