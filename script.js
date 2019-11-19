'use strict';

//商品の表示切り替え

const NAME = document.getElementById('name');
const PRICE = document.getElementById('price');

//並
const NAMI = document.getElementById('nami');
NAMI.onclick = () => {
    NAME.textContent = "お弁当 -並-";
    PRICE.textContent = "1000";
    image.setAttribute('src', 'img/nami.png');
}

NAMI.addEventListener('mouseenter', () => {
    NAMI.classList.add('btn-lg');
}, false);

NAMI.addEventListener('mouseleave', () => {
    NAMI.classList.remove('btn-lg');
}, false);

//上
const JOU = document.getElementById('jou');
JOU.onclick = () => {
    NAME.textContent = "お弁当 -上-";
    PRICE.textContent = "2000";
    image.setAttribute('src', 'img/jou.png');
}

JOU.addEventListener('mouseenter', () => {
    JOU.classList.add('btn-lg');
}, false);

JOU.addEventListener('mouseleave', () => {
    JOU.classList.remove('btn-lg');
})



//ダイアログ
//アラートダイアログ
const HOUR = new Date().getHours();

//コンソールへの出力
//console.log(HOUR);

if (HOUR < 16){
    window.alert('朝と昼は並弁当が売れています！');
} else {
    window.alert('夜は上弁当が売れています！');
}

//カート確認ダイアログ
const CART_CONFIRM = document.getElementById('cartConfirm');
const CART_LIST = document.getElementById('cartList');

const CART_PRICE = document.getElementById('cartPrice');
const SUM_PRICE = [];

CART_CONFIRM.onclick = () => {
    const CART = window.confirm(`${NAME.textContent} をカートに入れますか？`);
    const LI = `<li>${NAME.textContent}</li>`;

    if (CART){
        CART_LIST.insertAdjacentHTML('beforeend', LI);

        //合計金額の表示
        let totalPrice;
        SUM_PRICE.push(parseInt(PRICE.textContent));
        totalPrice = SUM_PRICE.reduce( (total,x) => total+=x, 0);
        CART_PRICE.textContent = `合計金額 : ${totalPrice}円`;

    } else {
        window.alert('カートへの追加をキャンセルしました。');
    }

    
}

//在庫確認文字列ダイアログ
const STOCK_CONFIRM = document.getElementById('stockConfirm');

STOCK_CONFIRM.onclick = () => {
    window.prompt(`${NAME.textContent} の在庫を確認しますか？ yes または no でお答えください。`)
}



//その他のメニューの折りたたみ
$(document).ready( () => {
    let hide =0;

    $('#hide').on('click', () => {
        if (hide === 0){
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

RADIO_FORM.onsubmit = event => {
    event.preventDefault();

    let radio;
    radio = RADIO_FORM.size.value;
    OPTION_EXPLANATION.textContent = `ご飯の量 : ${radio}`;
};

//チェックボックスの値を取得して表示
const CHECKBOX_FORM = document.getElementById('checkboxForm');

CHECKBOX_FORM.onsubmit = event => {
    event.preventDefault();

    const ELEMENTS = document.getElementsByName('accessory');

    let checkbox = "付属品  :";
    let i = 0;
    while (i < 3){
        if (ELEMENTS[i].checked) checkbox = checkbox + ' ' + ELEMENTS[i].value;
        i += 1;
    };
    OPTION_EXPLANATION.textContent = checkbox;
};

//セレクトドロップダウンの入力値を取得して表示
const SELECT_FORM = document.getElementById('selectForm');

SELECT_FORM.onsubmit = event => {
    event.preventDefault();

    const MEDIA = SELECT_FORM.media.value;
    OPTION_EXPLANATION.textContent = `当店を知ったきっかけ : ${MEDIA}`;
};

//テキストボックスの入力値を取得して表示
const TEXT_FORM = document.getElementById('textForm');

TEXT_FORM.onsubmit = event => {
    event.preventDefault();

    const ADDRESS = TEXT_FORM.address.value;
    OPTION_EXPLANATION.textContent = `お届先住所 : ${ADDRESS}`;
}

//テキストエリアボックスの入力値を取得して表示
const TEXTAREA_FORM = document.getElementById('textareaForm');

TEXTAREA_FORM.onsubmit = event => {
    event.preventDefault();

    const REQUEST = TEXTAREA_FORM.request.value;
    OPTION_EXPLANATION.textContent = `その他ご要望 : ${REQUEST}`;
};


//閉店カウントダウン
const COUNTDOWN = document.getElementById('countdown');

setInterval( () => {
    const NOW = moment();
    let goal = new Date();
    goal.setHours('23');
    goal.setMinutes('59');
    goal.setSeconds('59');
    goal = moment(goal);

    const DIFF = goal.diff(NOW);
    const DURATION = moment.duration(DIFF);

    COUNTDOWN.textContent = `本日閉店まで ${DURATION.hours()} 時間 ${DURATION.minutes()} 分 ${DURATION.seconds()} 秒`;
},1000);