(function() {
    
    'use strict';
    
    function App(url) {
        
        this.template = _.template($('[data-template="item"]').html());
        this.bindEvents();
        
        var self = this;
        this.fetch(url).then(function(data) {
            self.data = data;
            self.render(self.data.list);
        }, function() {
            console.log('データの取得に失敗しました。');
        });
    }
    
    // ajaxでデータを取得する
    App.prototype.fetch = function(url) {
        return $.ajax({
            url: url,
            dataType: 'json'
        });
    };
    
    // select要素にchangeイベントをバインドする
    App.prototype.bindEvents = function() {
        
        // onChangeのthisをこのクラスのthisに縛る
        _.bindAll(this, 'onChange');
        
        $('select').on('change', this.onChange);
    };
    
    // select要素が変更されたときの処理
    App.prototype.onChange = function() {
        
        var self = this;
        
        // select要素それぞれに対応した処理関数を返す
        var where = $('select').map(function(i, el){
            var $el = $(el);
            return function(list) { return self[$el.attr('name')](list, $el.val()); };
        });
        
        // whereの関数を順次実行。結果を次の処理に渡して最終結果を得る。
        var list = _.reduce(where, function(prev, current) {
            return current(prev);
        }, this.data.list);
        
        this.render(list);
    };
    
    // ソート処理を行う
    App.prototype.sort = function(list, key) {
        
        if(this.isEmpty(key)) { return list; }
        
        // listオブジェクトを指定のキーで並び替え
        return _.sortBy(list, function(e) {
            return e[key];
        });
    };
    
    // フィルタ処理を行う
    App.prototype.filter = function(list, value) {
        
        if(this.isEmpty(value)) { return list; }
        
        // listオブジェクトのgroupが一致する値でフィルタリングする
        return _.filter(list, function(e) {
            return e.group === value;
        });
    };
    
    // 空判定
    App.prototype.isEmpty = function(value) {
        return value === '';
    };
    
    // 結果を画面表示する
    App.prototype.render = function(data) {
        var html = this.template({
            list: data
        });
        $('.table tbody').html(html);
    };
    
    new App('data.json');
    
})();