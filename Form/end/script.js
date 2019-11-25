/*
なんちゃってお弁当サイトの 1 ファイル内のコードを分割しています。

HTML, CSS へのアウトプット編
https://github.com/mayasan-sc/bento/tree/master/HTML_CSS_output
*/

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
    let accessory_output;

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
function mediaButtonClick() {
    const MEDIA_INPUT = document.mediaForm.media;
    const NUM = MEDIA_INPUT.selectedIndex;
    OPTION_ANSWER.textContent = `当店を知ったきっかけ : ${MEDIA_INPUT[NUM].value}`;
}

//セレクトボックス - name属性なし / getElementById() 使用
/*
function mediaButtonClick() {
    const MEDIA = document.getElementById('media').value;
    OPTION_ANSWER.textContent = `お届け先住所 : ${MEDIA}`;
}
*/


//テキストボックス - name属性あり
function addressButtonClick() {
    const ADDRESS = document.addressForm.address.value;
    OPTION_ANSWER.textContent = `お届け先住所 : ${ADDRESS}`;
}

//テキストボックス - name属性なし / getElementById() 使用
/*
function addressButtonClick() {
    const ADDRESS = document.getElementById('address').value;
    OPTION_ANSWER.textContent = `お届け先住所 : ${ADDRESS}`;
}
*/


//テキストエリア - name属性あり
function requestButtonClick() {
    const REQUEST = document.requestForm.request.value;
    OPTION_ANSWER.textContent = `その他ご要望 : ${REQUEST}`;
}

//テキストエリア - name属性なし / getElementById() 使用
/*
function requestButtonClick() {
    const REQUEST = document.getElementById('request').value;
    OPTION_ANSWER.textContent = `その他ご要望 : ${REQUEST}`;
}
*/