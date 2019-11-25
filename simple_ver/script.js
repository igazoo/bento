'use strict';



//表示切り替え

const NAME = document.getElementById('name');
const PRICE = document.getElementById('price');
const IMAGE = document.getElementById('image');

//並
const NAMI = document.getElementById('nami');

NAMI.onclick = ()=>{
  NAME.textContent = "お弁当 -並-";
  PRICE.textContent = "1000";
  IMAGE.setAttribute('src', 'img/nami.png');
}

NAMI.addEventListener('mouseenter', ()=>{
  NAMI.classList.add('btn-lg');
},false);

NAMI.addEventListener('mouseleave', ()=>{
  NAMI.classList.remove('btn-lg');
},false);


//上
const JOU = document.getElementById('jou');

JOU.onclick = ()=>{
  NAME.textContent = "お弁当 -上-";
  PRICE.textContent = "2000";
  IMAGE.setAttribute('src', 'img/jou.png');
}

JOU.addEventListener('mouseenter', ()=>{
  JOU.classList.add('btn-lg');
},false);

JOU.addEventListener('mouseleave', ()=>{
  JOU.classList.remove('btn-lg');
},false);



//ダイアログ
//アラートダイアログ
const HOUR = new Date().getHours();

//console.log(HOUR);
if (HOUR < 16){
  window.alert('朝と昼は並弁当が売れてます！');
} else {
  window.alert('夜は上弁当が売れてます！');
}


//カート確認ダイアログ
const CART_CONFIRM = document.getElementById('cartConfirm');
const CART_LIST = document.getElementById('cartList');
const CART_PRICE = document.getElementById('cartPrice');
const SUM_PRICE = [];

CART_CONFIRM.onclick = ()=>{
  const CART = window.confirm(`${NAME.textContent} をカートに入れますか？` );
  const LI = `<li>${NAME.textContent}</li>`;

  if (CART){
    CART_LIST.insertAdjacentHTML('beforeend', LI);

    // 合計金額の表示
    let totalPrice;
    SUM_PRICE.push(parseInt(PRICE.textContent));
    totalPrice = SUM_PRICE.reduce((total,x) => total+=x,0);
    CART_PRICE.textContent = `合計金額 : ${totalPrice}円`;

  } else {
    window.alert(`カートへの追加をキャンセルしました`)
  }
}

/*
//json ファイルからの在庫状況の取得 (Webサーバー経由で動作)
const STOCK_ARRAY = [];

$(document).ready(()=>{
  $.ajax({url:'stock.json', dataType:'json'})
  .done(data=>{
    data.forEach((item, index)=>{
      STOCK_ARRAY.push(item.num);
    })
  })
})

console.log(STOCK_ARRAY);


//在庫確認文字列ダイアログ (Webサーバー経由で動作)
const STOCK_CONFIRM = document.getElementById('stockConfirm');

STOCK_CONFIRM.onclick = ()=>{
  const STOCK_ANSWER = window.prompt(`${NAME.textContent} の在庫を確認しますか？ yes または no でお答えください。` );
  if (STOCK_ANSWER === 'yes'){
    console.log(NAME.textContent);
    switch(NAME.textContent) {
      case 'お弁当 -並-' : window.alert(`在庫は ${STOCK_ARRAY[0]} 個です。`);
      break;
      case 'お弁当 -上-' : window.alert(`在庫は ${STOCK_ARRAY[1]} 個です。`);
      break;
    }
  } else {
    window.alert(`在庫の確認をキャンセルしました`)
  }
}
*/



//その他メニューの折りたたみ
$(document).ready(()=>{
  let hide = 0;

  $('#hide').on('click', ()=>{
    if (hide === 0) {
      $('#otherMenu li').addClass('d-none');
      $('#hide').text('表示');
      hide = 1;
    } else {
      $('#otherMenu li').toggleClass('d-none');
      $('#hide').text('非表示');
      hide = 0;
    };
  })
});



//フォーム入力値の取得
//出力
const OPTION_ANSWER = document.getElementById('optionAnswer');


//ラジオボタン -name属性あり
function riceButtonClick(){
  const RICE_INPUT = document.riceForm.rice;
  let rice_output;
  for (let i=0; i<RICE_INPUT.length; i++){
      if (RICE_INPUT[i].checked){
          rice_output = RICE_INPUT[i].value;
      }
  }
  OPTION_ANSWER.textContent = `ご飯の量 : ${rice_output}`;
}

//ラジオボタン -name属性なし / getElementsByName() 使用
/*
function riceButtonClick(){
  const RICE_INPUT = document.getElementsByName('rice');
  let rice_output;
  for (let i=0; i<RICE_INPUT.length; i++){
      if (RICE_INPUT[i].checked){
          rice_output = RICE_INPUT[i].value;
      }
  }
  OPTION_ANSWER.textContent = `ご飯の量 : ${rice_output}`;
}
*/


//チェックボックス -name属性あり
function accessoryButtonClick(){
  const ACCESSORY_INPUT = document.accessoryForm.accessory;
  let accessory_output = '';

  for (let i=0; i<ACCESSORY_INPUT.length; i++){
      if (ACCESSORY_INPUT[i].checked){
          accessory_output = accessory_output + ' ' + ACCESSORY_INPUT[i].value;
      }
  }
  OPTION_ANSWER.textContent = `付属品 :${accessory_output}`;
}

//チェックボックス -name属性なし / getElementsByName() 使用
/*
function accessoryButtonClick(){
  const ACCESSORY_INPUT = document.getElementsByName('accessory');
  let accessory_output = '';

  for (let i=0; i<ACCESSORY_INPUT.length; i++){
      if (ACCESSORY_INPUT[i].checked){
          accessory_output = accessory_output + ' ' + ACCESSORY_INPUT[i].value;
      }
  }
  OPTION_ANSWER.textContent = `付属品 :${accessory_output}`;
}
*/


//セレクトボックス - name属性あり
/*
function mediaButtonClick() {
    const num = document.mediaForm.media.selectedIndex;
    OPTION_ANSWER.textContent = `当店を知ったきっかけ : ${document.mediaForm.media.options[num].value}`;
}
*/

//セレクトボックス -name属性あり
function mediaButtonClick(){
  const MEDIA_INPUT = document.mediaForm.media;
  const NUM = MEDIA_INPUT.selectedIndex;
  OPTION_ANSWER.textContent = `当店を知ったきっかけ : ${MEDIA_INPUT.options[NUM].value}`;
}

//セレクトボックス -name属性なし / getElementById() 使用
/*
function mediaButtonClick(){
  const MEDIA = document.getElementById('media').value;
  OPTION_ANSWER.textContent = `お届け先住所 : ${MEDIA}`;
}
*/

//テキストボックス -name属性あり
function addressButtonClick(){
    const ADDRESS = document.addressForm.address.value;
    OPTION_ANSWER.textContent = `お届け先住所 : ${ADDRESS}`;
}

//テキストボックス -name属性なし / getElementById()使用
/*
function addressButtonClick(){
  const ADDRESS = document.getElementById('address').value;
  OPTION_ANSWER.textContent = `お届け先住所 : ${ADDRESS}`;
}
*/


//テキストエリア -name属性あり
function requestButtonClick(){
  const REQUEST = document.requestForm.request.value;
  OPTION_ANSWER.textContent = `その他ご要望 : ${REQUEST}`;
}

//テキストエリア -name属性なし / getElementById()使用
/*
function requestButtonClick(){
  const REQUEST = document.getElementById('request').value;
  OPTION_ANSWER.textContent = `その他ご要望 : ${REQUEST}`;
}
*/



//Google Maps API を利用し入力した値に該当する地図を表示
/*
const TEXT_FORM = document.getElementById('textForm');
const MAP_KEY = "AIzaSyC8F2vD0OFURJR3LovVPmhNjTUkNOswwZE&q";
const MAP_STYLE = 'width="300" height="225" frameborder="0" style="border:0;" allowfullscreen=""';

TEXT_FORM.onsubmit = event =>{
  event.preventDefault();

  const TEXT = document.getElementById('textForm').text.value;
  const MAP = `<iframe src="https://www.google.com/maps/embed/v1/place?key=${MAP_KEY}=${TEXT}" ${MAP_STYLE}></iframe>`;
  OPTION_EXPLANATION.textContent = `お届け先住所 : ${TEXT}`;
  OPTION_EXPLANATION.insertAdjacentHTML('beforeend', MAP);
};

//テキストエリアボックスの入力値を取得して表示
const TEXTAREA_FORM = document.getElementById('textareaForm');

TEXTAREA_FORM.onsubmit = event =>{
  event.preventDefault();

  const TEXTAREA = document.getElementById('textareaForm').textarea.value;
  OPTION_EXPLANATION.textContent = `その他ご要望 : ${TEXTAREA}`;
};
*/



//閉店カウントダウン
const COUNTDOWN = document.getElementById('countdown');

setInterval(()=> {
   const NOW =  moment();
   let goal = new Date();
   goal.setHours('23');
   goal.setMinutes('59');
   goal.setSeconds('59');
   goal = moment(goal);

   //console.log(`now : ${NOW}`);
   //console.log(`goal : ${goal}`);

   const DIFF = goal.diff(NOW);
   const DURATION = moment.duration(DIFF);

   COUNTDOWN.textContent = `本日閉店まで ${DURATION.hours()} 時間 ${DURATION.minutes()} 分 ${DURATION.seconds()} 秒`;
}, 1000);
