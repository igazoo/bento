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
const goal = new Date();
goal.setHours('23');
goal.setMinutes('59');
goal.setSeconds('59');

function countdown(){
  const now = new Date();

  const rest = goal.getTime()-now.getTime();
  const hour = Math.floor(rest/1000/60/60)%24;
  const min = Math.floor(rest/1000/60)%60;
  const sec = Math.floor(rest/1000)%60;
  const count = [hour, min, sec];

  return count;
}

function recalc(){
  const counter = countdown(goal);
  document.getElementById('countdown').textContent = `本日閉店まで ${counter[0]} 時間 ${counter[1]} 分 ${counter[2]} 秒`;
  refresh();
}

function refresh(){
  setTimeout(recalc, 1000);
}

recalc();




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
