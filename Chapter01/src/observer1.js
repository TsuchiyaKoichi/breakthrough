(function() {
    'use strict';
    
    // Observerクラスの宣言
    function Observer() {
        this.listeners = [];
    }
    
    Observer.prototype.on = function(func) {
        this.listeners.push(func);
    };
    
    Observer.prototype.off = function(func) {
        
        var len = this.listeners.length;
        for(var i = 0; i < len; i++) {
            
            var listener = this.listeners[i];
            if(listener === func) {
                this.listeners.splice(i, 1);
            }
        }
    };
    
    Observer.prototype.trigger = function() {
        var len = this.listeners.length;
        for(var i = 0; i < len; i++) {
            var listener = this.listeners[i];
            listener();
        }
    };
    
    var greet = function() {
        console.log('Good Morning!');
    };
    
    var btn1 = document.getElementById('btn1');
    btn1.addEventListener('click', function(){
        
        var observer = new Observer();
        observer.on(greet);
        observer.trigger();
    });
}());

