(function() {
    
    'use strict';
    
    function Modal(el) {
        this.initialize(el);
    }
    Modal.prototype.initialize = function(el) {
        this.$el = el;
        this.$container = $('#modal');
        this.$contents = $('#modal-contents');
        this.$close = $('#modal-close');
        this.$next = $('#modal-next');
        this.$prev = $('#modal-prev');
        this.$overlay = $('#modal-overlay');
        this.$window = $(window);
        this.index = 0;
        this.handleEvents();
    };
    // イベント登録する
    Modal.prototype.handleEvents = function() {
        
        var self = this;
        
        // クリック時にモーダルウィンドウ表示
        this.$el.on('click', function(e) {
            self.show(e);
            return false;
        });
        
        // 閉じるボタンクリック時
        this.$close.on('click', function(e) {
           self.hide(e);
           return false;
        });
        
        // モーダルの背景クリック時
        this.$overlay.on('click', function(e) {
           self.hide(e);
           return false;
        });
    };
    // モーダルウィンドウを表示する
    Modal.prototype.show = function(e) {
        
        // クリックされた要素のhref属性を取得
        var $target = $(e.currentTarget);
        var src = $target.attr('href');
        
        // 表示画像と表示順をセット
        this.$contents.html('<img src="' + src + '" />');
        this.index = $target.data('index');
        
        // フェードインでモーダルを表示
        this.$container.fadeIn();
        this.$overlay.fadeIn();
        
        return false;
    };
    // モーダルウィンドウを閉じる
    Modal.prototype.hide = function(e) {
        this.$container.fadeOut();
        this.$overlay.fadeOut();
    };
    
    // インスタンス生成
    var modal = new Modal($('#modal-thumb a'));
})();