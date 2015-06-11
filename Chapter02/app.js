(function() {
    
    'use strict';
    
    function Modal(el) {
        this.initialize(el);
    }
    Modal.prototype.initialize = function(el) {
        this.$el = el;
        this.$container = $('#modal');
        this.$contents = $('#modal-contents');
        // this.$close = $('#modal-close');
        // this.$next = $('#modal-next');
        // this.$prev = $('#modal-prev');
        this.$overlay = $('#modal-overlay');
        this.$parents = this.$el.parents('ul');
        
        
        this.$window = $(window);
        //this.index = 0;
        this.handleEvents();
        
    };
    // イベント登録する
    Modal.prototype.handleEvents = function() {
        
        var self = this;
        
        // クリック時にモーダルウィンドウ表示
        this.$parents.on('click', 'a', function(e) {
            self.show(e);
            // falseを返すと以降のイベント伝搬がキャンセルされる。またデフォルトの処理もキャンセルされる。
            // つまり、e.preventDefault()とe.cancelPropagation()を実行するのと同じ。
            // 仮にここで下記のreturnをコメントアウトすると、デフォルト処理が動作し、画像へのリンクが実行されてしまう。
            // 余計な処理を発生させないためにfalseを返している？
            return false;
        });
        
        // 次へボタンクリック時
        this.$container.on('click', '#modal-next', function(e) {
            self.next(e);
            return false;
        });
        
        // 前へボタンクリック時
        this.$container.on('click', '#modal-prev', function(e) {
            self.prev(e);
            return false;
        });
        
        // 閉じるボタンクリック時
        this.$container.on('click', '#modal-close', function(e) {
           self.hide(e);
           return false;
        });
        
        // モーダルの背景クリック時
        this.$overlay.on('click', function(e) {
           self.hide(e);
           return false;
        });
        
        // ウィンドウサイズが変更されたとき
        this.$window.on('resize load', function() {
            self.resize();
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
        
        // indexをクロージャにすることで他からのアクセスを防いでいる
        var index = $target.data('index');
        this.countChange = this.createCounter(index, this.$el.length);
        
        return false;
    };
    // indexカウンタを作成する
    Modal.prototype.createCounter = function(index, len) {
        return function(num) {
            index = (num + index + len) % len;
            return index;
        };
    };
    // 次の画像を表示する
    Modal.prototype.next = function() {
        //this.index = this.countChange(1, this.index, this.$el.length);
        this.slide(this.countChange(1));
    };
    // 前の画像を表示する
    Modal.prototype.prev = function() {
        //this.index = this.countChange(-1, this.index, this.$el.length);
        this.slide(this.countChange(-1));
    };
    // モーダルウィンドウを閉じる
    Modal.prototype.hide = function() {
        this.$container.fadeOut();
        this.$overlay.fadeOut();
    };
    // numで指定された数だけindexを増減する
    // ループできるように関係する変数を全て足した後に%lenする
    // Modal.prototype.countChange = function(num, index, len) {
    //     return (num + index + len) % len;
    // };
    // 表示画像を変更する
    Modal.prototype.slide = function(index) {
        
        // 現在の画像をフェードアウトする
        this.$contents.find('img').fadeOut({
            complete: function() {
                
                // フェードアウトが完了したのちに、次の画像をフェードインする
                var src = $('[data-index="' + index + '"]').find('img').attr('src');
                $(this).attr('src', src).fadeIn();
            }
        });
    };
    // ウィンドウサイズが変更されたとき、640px以下ならモーダルのサイズを変更する
    Modal.prototype.resize = function() {
        
        var w = this.$window.width();
        if(w < 640) {
            this.$container.css({ width: '320px', height: '213px '});
        } else {
            this.$container.css({ width: '750px', height: '500px '});
        }
    };
    
    // インスタンス生成
    // サムネイルのA要素全てを引数で渡す形
    var modal = new Modal($('#modal-thumb a'));
    
    // もっと見るボタンを押したら画像を追加する
    $('#more-btn').on('click', function() {
        var html = '<li><a href="../images/photo-04.JPG" data-index="3"><img src="../images/photo-04.JPG" alt="" width="160" class="img-thumbnail"></a></li>';
        
        // 要素をmodal-thumb(ul)に追加
        $(html).appendTo($('#modal-thumb')).hide().fadeIn();
        // ボタンはフェードアウトさせる
        $(this).fadeOut();
        // modalクラスの$elを再セット
        modal.$el = $('#modal-thumb a');
    });
})();