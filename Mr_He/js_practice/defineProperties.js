var book = {};
Object.defineProperties(book,{
    _year:{
        value:2004,
        writable: true,
        configurable:true
    },
    edition:{
        value:1,
        writable: true
        
    },
    year:{
        get:function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue >2004){
                this._year = newValue;
                this.edition += newValue -2004;
            }
        }
    }
});

book.year = 2005;
alert(book.edition);
var s = Object.getOwnPropertyDescriptor(book,"_year");
alert(s.value);
alert(s.enumerable);
