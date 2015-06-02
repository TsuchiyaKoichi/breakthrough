(function(){
    
    'use strict';

    // input要素のdata属性を与え、その要素に対するバリデーション等の機能を実行する
    // [attrs] inputのdata-*属性と、required属性
    //
    // 
    function AppModel(attrs) {

        // 要素の入力値
        this.val = ''; 
        
        // data-*で指定されているチェックプロパティの値オブジェクト
        this.attrs = attrs;
        
        // イベントリスナを保持する
        this.listeners =    {
            valid: [],
            invalid: []
        };
    }
    
    // イベント登録する
    AppModel.prototype.on = function(event, func) {
        
        this.listeners[event].push(func);
    };
    
    // イベントを実行する
    AppModel.prototype.trigger = function(event) {

        $.each(this.listeners[event], function() {
            this();
        });
    };
    
    // 値をセットする
    AppModel.prototype.set = function(val) {

        // 入力値をセットする
        if(this.val === val) { return; }
        this.val = val;

        // セットされた入力値のバリデーションを実行
        this.validate();
    };
    
    // バリデーションを行い、イベント発火する
    AppModel.prototype.validate = function() {
        
        var val;
        this.errors = [];
        
        for(var key in this.attrs) {
            val = this.attrs[key];

            // this[key](val)は、例えばkeyがmaxlengthの時、関数maxlength(val)を実行する
            if(!this[key](val)) { this.errors.push(key); }
        }
        this.trigger(!this.errors.length ? 'valid' : 'invalid');
    };
    
    // 値が空かどうかチェックする
    AppModel.prototype.required = function() {
        return this.val !== '';
    };
    
    // 最大長のチェック
    AppModel.prototype.maxlength = function(num) {
        return num >= this.val.length;
    };
    
    // 最小長のチェック
    AppModel.prototype.minlength = function(num) {
        return num <= this.val.length;
    };
    
    
    function AppView(el) {
        this.initialize(el);
        this.handleEvents(); 
    }
    
    // AppView初期化処理
    AppView.prototype.initialize = function(el) {
        
        // input要素自身
        this.$el = $(el);
        // エラー表示用のリスト配列
        this.$list = this.$el.next().children();
        
        // AppModelにセットするためのチェックプロパティの取得
        var obj = this.$el.data();
        if(this.$el.prop('required')){
            obj.required = '';
        }
        
        // AppModelインスタンスを生成
        this.model = new AppModel(obj);
    };
    
    // 各種イベントハンドラを登録
    AppView.prototype.handleEvents = function() {
      
      var self = this;
      
      // 入力時のkeyupイベントを捕捉
      this.$el.on('keyup', function(e) {
         self.onKeyup(e);
      });
      
      // 入力時の正常イベントを捕捉
      this.model.on('valid', function() {
         self.onValid(); 
      });
      
      // 入力時のエラー入力イベントを捕捉
      this.model.on('invalid', function() {
         self.onInvalid(); 
      });
    };
    
    // keyupイベントが発生したらAppModelに現在の入力値を渡す
    AppView.prototype.onKeyup = function(e) {

        // AppModelへ入力値を渡す
        var $target = $(e.currentTarget);
        this.model.set($target.val());
    };
    
    AppView.prototype.onValid = function() {

        this.$el.removeClass('error');
        this.$list.hide();
    };
    
    AppView.prototype.onInvalid = function() {

        var self = this;
        self.$el.removeClass('error');
        this.$list.hide();

        $.each(this.model.errors, function(index, val){
            self.$list.filter('[data-error=\"' + val + '\"]').show();
        });
    };
    
    // 入力要素をAppViewクラスにセットして初期化する
    $('#sample input').each(function() {
        new AppView(this);
    });
})();