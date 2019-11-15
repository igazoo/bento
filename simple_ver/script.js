'use strict';



//表示切り替え

const name = document.getElementById('name');
const price = document.getElementById('price');
const image = document.getElementById('image');

//並
const nami = document.getElementById('nami');

nami.onclick = ()=>{
  name.textContent = "お弁当 -並-";
  price.textContent = "1000";
  image.src = "img/nami.png";
}

nami.addEventListener('mouseenter', ()=>{
  nami.classList.add('btn-lg');
},false);

nami.addEventListener('mouseleave', ()=>{
  nami.classList.remove('btn-lg');
},false);


//上
const jou = document.getElementById('jou');
jou.onclick = ()=>{
  name.textContent = "お弁当 -上-";
  price.textContent = "2000";
  image.src = "img/jou.png";
}

jou.addEventListener('mouseenter', ()=>{
  jou.classList.add('btn-lg');
},false);

jou.addEventListener('mouseleave', ()=>{
  jou.classList.remove('btn-lg');
},false);



//ダイアログ
//アラートダイアログ
const hour = new Date().getHours();
//console.log(hour);
if (hour < 16){
  window.alert('朝と昼は並弁当が売れてます！');
} else {
  window.alert('夜は上弁当が売れてます！');
}

//カート確認ダイアログ
const sumPrice = [];
document.getElementById('cart-confirm').onclick = ()=>{
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

//json ファイルからの在庫状況の取得 (Webサーバー経由で動作)
const stockArray = [];
$(document).ready(()=>{
  $.ajax({url:'stock.json', dataType:'json'})
  .done((data)=>{
    data.forEach((item, index)=>{
      stockArray.push(item.num);
    })
  })
})

console.log(stockArray);

//在庫確認文字列ダイアログ (Webサーバー経由で動作)
document.getElementById('stock-confirm').onclick = ()=>{
  const stockConfirm = window.prompt(`${name.textContent} の在庫を確認しますか？ yes または no でお答えください。` );
  if (stockConfirm === 'yes'){
    console.log(name.textContent);
    switch(name.textContent) {
      case 'お弁当 -並-' : window.alert(`在庫は ${stockArray[0]} 個です。`);
      break;
      case 'お弁当 -上-' : window.alert(`在庫は ${stockArray[1]} 個です。`);
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

const optionExplanation = document.getElementById('optionExplanation');

//ラジオボタンの入力値を取得して表示

const radioForm = document.getElementById('radioForm');
radioForm.onsubmit = (event)=>{
  event.preventDefault();

  let radio;
  radio = radioForm.option.value;
  optionExplanation.textContent = `ご飯の量 : ${radio}`;
};

//チェックボックスの入力値を取得して表示
document.getElementById('checkboxForm').onsubmit = (event)=>{
  event.preventDefault();

  const elements = document.getElementsByName('accessory');
  const checkbox = "付属品 :";
  const i=0;
  while(i < 3){
    if(elements[i].checked) checkbox = checkbox + ' ' + elements[i].value;
    i += 1;
  };
  optionExplanation.textContent = checkbox;
};

//セレクトドロップダウンの入力値を取得して表示
const selectForm = document.getElementById('selectForm');
selectForm.onsubmit = (event)=>{
  event.preventDefault();
  const option = selectForm.select.value;
  optionExplanation.textContent = `当店を知ったきっかけ : ${option}`;
};

//テキストボックスの入力値を取得して表示
//Google Maps API を利用し入力した値に該当する地図を表示
document.getElementById('textForm').onsubmit = (event)=>{
  event.preventDefault();
  const text = document.getElementById('textForm').text.value;
  const map = `<br><iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC8F2vD0OFURJR3LovVPmhNjTUkNOswwZE&q=${text}"  width="300" height="225" frameborder="0" style="border:0;" allowfullscreen=""></iframe>`;
  optionExplanation.textContent = `お届け先住所 : ${text}`;
  optionExplanation.insertAdjacentHTML('beforeend', map);
};

//テキストエリアボックスの入力値を取得して表示
document.getElementById('textareaForm').onsubmit = (event)=>{
  event.preventDefault();
  const textarea = document.getElementById('textareaForm').textarea.value;
  optionExplanation.textContent = `その他ご要望 : ${textarea}`;
};



//閉店カウントダウン
setInterval(()=> {
   const now =  moment();
   const goal = new Date();
   goal.setHours('23');
   goal.setMinutes('59');
   goal.setSeconds('59');
   goal = moment(goal);

   const diff = goal.diff(now);
   const duration = moment.duration( diff );
   document.getElementById('countdown').textContent = `本日閉店まで ${duration.hours()} 時間 ${duration.minutes()} 分 ${duration.seconds()} 秒`;
}, 1000);
