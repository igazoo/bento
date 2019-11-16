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
  IMAGE.src = "img/nami.png";
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
  IMAGE.src = "img/jou.png";
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

console.log(HOUR);
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

const OPTION_EXPLANATION = document.getElementById('optionExplanation');

//ラジオボタンの入力値を取得して表示
const RADIO_FORM = document.getElementById('radioForm');

RADIO_FORM.onsubmit = event =>{
  event.preventDefault();

  let radio;
  radio = RADIO_FORM.option.value;
  OPTION_EXPLANATION.textContent = `ご飯の量 : ${radio}`;
};


//チェックボックスの入力値を取得して表示
const CHECKBOX_FORM = document.getElementById('checkboxForm');

CHECKBOX_FORM.onsubmit = event =>{
  event.preventDefault();

  const ELEMENTS = document.getElementsByName('accessory');

  let checkbox = "付属品 :";
  let i=0;
  while(i < 3){
    if(ELEMENTS[i].checked) checkbox = checkbox + ' ' + ELEMENTS[i].value;
    i += 1;
  };
  OPTION_EXPLANATION.textContent = checkbox;
};


//セレクトドロップダウンの入力値を取得して表示
const SELECT_FORM = document.getElementById('selectForm');

SELECT_FORM.onsubmit = event =>{
  event.preventDefault();

  const OPTION = SELECT_FORM.select.value;
  OPTION_EXPLANATION.textContent = `当店を知ったきっかけ : ${OPTION}`;
};


//テキストボックスの入力値を取得して表示
//Google Maps API を利用し入力した値に該当する地図を表示
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



//閉店カウントダウン
const COUNTDOWN = document.getElementById('countdown');

setInterval(()=> {
   const NOW =  moment();
   let goal = new Date();
   goal.setHours('23');
   goal.setMinutes('59');
   goal.setSeconds('59');
   goal = moment(goal);

   const DIFF = goal.diff(NOW);
   const DURATION = moment.duration(DIFF);

   COUNTDOWN.textContent = `本日閉店まで ${DURATION.hours()} 時間 ${DURATION.minutes()} 分 ${DURATION.seconds()} 秒`;
}, 1000);
