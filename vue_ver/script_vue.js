'use strict';

//ダイアログ
//アラートダイアログ
new Vue({
  methods: {
    window:onload = function() {
      let hour = new Date().getHours();
      if (hour < 16){
        alert('朝と昼は並弁当が売れてます！');
      } else {
        alert('夜は上弁当が売れてます！');
      }
    },
  }
});



//表示切り替え
let total = 0;
new Vue({
  el:'#select',
  data: {
    img: 'img/jou.png',
    name: 'お弁当 -上-',
    price: '2000',
    sum: '0',
    items: [],
    nFocus: '',
    jFocus: ''
  },
  methods: {
    onclick: function(e){
      if (e.target.id === 'nami'){
        this.img = 'img/nami.png';
        this.name = 'お弁当 -並-';
        this.price = 1000;
      } else {
        this.img = 'img/jou.png';
        this.name = 'お弁当 -上-';
        this.price = 2000;
      }
    },
    onselect: function(){
      if (confirm(this.name +'をカートに入れますか？')){
        total = total + parseInt(this.price);
        this.sum = total;
        this.items.push(this.name);
      }
    },
    onmouseenter: function(e){
      if (e.target.id === 'nami'){
        this.nFocus = 'btn-lg';
      } else {
        this.jFocus = 'btn-lg';
      }
    },
    onmouseleave: function(){
      this.nFocus = '';
      this.jFocus = '';
    }
  }
});



//その他メニューのトグル
new Vue({
  el: '#others',
  data: {
    show: true,
    btn: '非表示'
  },
  methods: {
    onclick: function(){
      if (this.show === true) {
        this.show = false;
        btn = '表示';
      } else {
        this.show = true;
        btn = '非表示';
      }
    }
  }
})



//フォーム内容の取得と出力
//ラジオボタン
new Vue({
  el: '#radioForm',
  data: {
    rice: ''
  },
  methods: {
    onSubmit: function(){
      optionExplanation.textContent = `ご飯の量 : ${this.rice}`;
    }
  }
})

//チェックボックス
new Vue({
  el: '#checkboxForm',
  data: {
    accessory: []
  },
  methods: {
    onSubmit: function(){
      optionExplanation.textContent = `付属品 : ${this.accessory}`;
    }
  }
})

//選択オプション
new Vue({
  el: '#selectForm',
  data: {
    media: ''
  },
  methods: {
    onSubmit: function(){
      optionExplanation.textContent = `当店を知ったきっかけ : ${this.media}`;
    }
  }
})

//テキストフォーム
new Vue({
  el: '#textForm',
  data: {
    text: ''
  },
  methods: {
    onSubmit: function(){
      optionExplanation.textContent = `お届け先住所 : ${this.text}`;
    }
  }
})

//テキストエリア
new Vue({
  el: '#textareaForm',
  data: {
    textarea: ''
  },
  methods: {
    onSubmit: function(){
      optionExplanation.textContent = `その他ご要望 : ${this.textarea}`;
    }
  }
})



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
}, 1000);
