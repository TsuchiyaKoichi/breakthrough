(function(){
    
    // input要素のdata属性を与え、その要素に対するバリデーション等の機能を実行する
    // [attrs] inputのdata-*属性と、required属性
    function AppModel(attrs) {
        
        this.val = ""; 
        
        this.attrs = {
            required: "",
            maxlength: 8,
            minlength: 4
        };
        
        this.listeners =    {
            valid: [],
            invalid: []
        };
    }
    
    // イベント登録する
    AppModel.prototype.on = function(event, func) {
        
        console.log('######eventbind:' + event + ',' + func);
        this.listeners[event].push(func);
        console.log('listeners:' + JSON.stringify(this.listeners));
    };
    
    // イベントを実行する
    AppModel.prototype.trigger = function(event) {
        console.log('event:' + event);
        console.log('listeners:' + JSON.stringify(this.listeners));
        $.each(this.listeners[event], function() {
            console.log('event:' + this.name);
            this();
        });
    };
    
    // 値をセットする
    AppModel.prototype.set = function(val) {
        if(this.val === val) return;
        this.val = val;
        this.validate();
    };
    
    // バリデーションを行い、イベント発火する
    AppModel.prototype.validate = function() {
        
        console.log('validate実行');
        
        var val;
        this.errors = [];
        
        for(var key in this.attrs) {
            console.log('key:' + key + ' value:' + this.attrs[key]);

            val = this.attrs[key];
            if(!this[key](val)) this.errors.push(key);
        }
        
        console.log('error.length:' + this.errors.length);
        this.trigger(!this.errors.length ? "valid" : "invalid");
    };
    
    // 値が空かどうかチェックする
    AppModel.prototype.required = function() {
        console.log('required:' + this.val !== "");
        return this.val !== "";
    };
    
    // 最大長のチェック
    AppModel.prototype.maxlength = function(num) {
        console.log('maxlength:' + num >= this.val.length);
        return num >= this.val.length;
    };
    
    // 最小長のチェック
    AppModel.prototype.minlength = function(num) {
        console.log('minlength:' + num <= this.val.length);
        return num <= this.val.length;
    };
    
    
    function AppView(el) {
        this.initialize(el);
        this.handleEvents(); 
    }
    
    // AppView初期化処理
    AppView.prototype.initialize = function(el) {
        
        this.$el = $(el);
        this.$list = this.$el.next().children();
        
        var obj = this.$el.data();
        if(this.$el.prop("required")){
            obj["required"] = "";
        }
        
        this.model = new AppModel(obj);
    };
    
    // 各種イベントハンドラを登録
    AppView.prototype.handleEvents = function() {
      
      var self = this;
      
      this.$el.on("keyup", function(e) {
         self.onKeyup(e);
      });
      
      this.model.on("valid", function() {
         self.onValid(); 
      });
      
      this.model.on("invalid", function() {
         self.onInvalid(); 
      });
    };
    
    // keyupイベントが発生したらAppModelに現在の入力値を渡す
    AppView.prototype.onKeyup = function(e) {
        console.log('keyupイベント');
        console.log('value:' + $(e.currentTarget).val());
        
        
        var $target = $(e.currentTarget);
        this.model.set($target.val());
    };
    
    AppView.prototype.onValid = function() {
        this.$el.removeClass("error");
        this.$list.hide();
    };
    
    AppView.prototype.onInvalid = function() {
        
        var self = this;
        self.$el.removeClass("error");
        this.$list.hide();
        
        $.each(this.model.errors, function(index, val){
            self.$list.filter("[data-error=\"" + val + "\"}").show();
        });
    };
    
    // 入力要素をAppViewクラスにセットして初期化する
    $("#sample input").each(function() {
        new AppView(this);
        
        console.log('AppView初期化');
    });
})();