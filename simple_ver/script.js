'use strict';

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



//定数
const name = document.getElementById('name');
const price = document.getElementById('price');
const image = document.getElementById('image');

//表示切り替え
//並
document.getElementById('nami').onclick = function(){
  name.textContent = "お弁当 -並-";
  price.textContent = "1000";
  image.src = "img/nami.png";
}

document.getElementById('nami').addEventListener('mouseenter', ()=>{
  nami.classList.add('btn-lg');
},false);

document.getElementById('nami').addEventListener('mouseleave', ()=>{
  nami.classList.remove('btn-lg');
},false);


//上
document.getElementById('jou').onclick = function(){
  name.textContent = "お弁当 -上-";
  price.textContent = "2000";
  image.src = "img/jou.png";
}

document.getElementById('jou').addEventListener('mouseenter', ()=>{
  jou.classList.add('btn-lg');
},false);

document.getElementById('jou').addEventListener('mouseleave', ()=>{
  jou.classList.remove('btn-lg');
},false);



//ダイアログ
//アラートダイアログ
const hour = new Date().getHours();
if (hour < 16){
  window.alert('朝と昼は並弁当が売れてます！');
} else {
  window.alert('夜は上弁当が売れてます！');
}

//カート確認ダイアログ
const sumPrice = [];
document.getElementById('cart-confirm').onclick = function(){
  const cart = window.confirm(`${name.textContent} をカートに入れますか？` );
  const li = `<li>${name.textContent}</li>`;

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
