(function() {
    
    'use strict';
    
    // Observerクラスの宣言
    function Observer() {
        this.listeners = {};
    }
    
    Observer.prototype.on = function(event, func) {
        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }
        
        this.listeners[event].push(func);
    };
    
    Observer.prototype.off = function(event, func) {
        
        var ref = this.listeners[event];
        var len = ref.length;
        for(var i = 0; i < len; i++) {
            
            var listener = ref[i];
            if(listener === func) {
                ref.splice(i, 1);
            }
        }
    };
    
    Observer.prototype.trigger = function(event) {
        
        var ref = this.listeners[event];
        for(var i = 0; i < ref.length; i++) {
            
            var listener = ref[i];
            if(typeof listener === 'function') {
                listener();
            }
        }
    };
    
    var greet = function() {
        console.log('Good Morning!');
    };
    
    var sayEvening = function() {
        console.log('Good Evening!');
    };
    
    var btn2 = document.getElementById('btn2');
    btn2.addEventListener('click', function(){
        
        var observer = new Observer();
        observer.on('morning', greet);
        observer.on('evening', sayEvening);
        
        observer.trigger('morning');
        observer.trigger('evening');
    });
}());

