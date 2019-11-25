'use strict';

const NAME = document.getElementById('name');
const PRICE = document.getElementById('price');
const IMAGE =  document.getElementById('image');

//並
//表示切り替え
const NAMI = document.getElementById('nami');
NAMI.onclick = () => {
    NAME.textContent = "お弁当 -並-";
    PRICE.textContent = "1000";
    IMAGE.setAttribute('src', 'img/nami.png');
}

//mouseevnter でボタンを大きくする
NAMI.addEventListener('mouseenter', () => {
    NAMI.classList.add('btn-lg');
}, false);

//mouseleave でボタンを小さくする
NAMI.addEventListener('mouseleave', () => {
    NAMI.classList.remove('btn-lg');
}, false);

//上
//表示切り替え
const JOU = document.getElementById('jou');
JOU.onclick = () => {
    NAME.textContent = "お弁当 -上-";
    PRICE.textContent = "2000";
    IMAGE.setAttribute('src', 'img/jou.png');
}

//mouseevnter でボタンを大きくする
JOU.addEventListener('mouseenter', () => {
    JOU.classList.add('btn-lg');
}, false);

//mouseleave でボタンを小さくする
JOU.addEventListener('mouseleave', () => {
    JOU.classList.remove('btn-lg');
}, false);


//お弁当のカートへの追加
const CART_CONFIRM = document.getElementById('cartConfirm');
const CART_LIST = document.getElementById('cartList');

CART_CONFIRM.onclick = () => {
    const LI = `<li>${NAME.textContent}</li>`;
    CART_LIST.insertAdjacentHTML('beforeend', LI);    
}

