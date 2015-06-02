/* jshint strict: false */
(function() {

    function Human(name) {
        this.name = name;
    }
    
    function greet(arg1, arg2) {
        console.log(this);
        console.log(arg1 + this.name + arg2);
    }
    
    var btn3 = document.getElementById('btn3');
    btn3.addEventListener('click', function(){
        
        greet('Hello ', '!!');
    
        var mike = new Human('Mike');
        
        greet.call(mike, 'Hello ', '!!');
        greet.apply(mike, ['Hello ', '!!']);
        
        var greetMike = greet.bind(mike);
        greetMike('Hello ', '!!');
    });
    
}());