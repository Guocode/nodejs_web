function HashMap(){
    //定义长度
    var length = 0;
    //创建一个对象
    var obj = new Object();

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function(){
        return length == 0;
    };

    /**
     * 判断对象中是否包含给定Key
     */
    this.containsKey=function(key){
        return (key in obj);
    };

    /**
     * 判断对象中是否包含给定的Value
     */
    this.containsValue=function(value){
        for(var key in obj){
            if(obj[key] == value){
                return true;
            }
        }
        return false;
    };

    /**
     *向map中添加数据
     */
    this.put=function(key,value){
        if(!this.containsKey(key)){
            length++;
        }
        obj[key] = value;
    };

    /**
     * 根据给定的Key获得Value
     */
    this.get=function(key){
        return this.containsKey(key)?obj[key]:null;
    };
    /**
     * pop
     */
    this.pop=function(){
        if (this.isEmpty()){
            return null;
        }else {
            for (var key in obj){
                var object = obj[key];
                this.remove(key);
                return object;
            }
        }

    };

    /**
     * 根据给定的Key删除一个值
     */
    this.remove=function(key){
        if(this.containsKey(key)&&(delete obj[key])){
            length--;
        }
    };

    /**
     * 获得Map中的所有Value
     */
    this.values=function(){
        var _values= new Array();
        for(var key in obj){
            _values.push(obj[key]);
        }
        return _values;
    };

    /**
     * 获得Map中的所有Key
     */
    this.keySet=function(){
        var _keys = new Array();
        for(var key in obj){
            _keys.push(key);
        }
        return _keys;
    };
    /**
     * 获得Map中的Key进行排序
     */
    this.keySort=function(sortType){
        return this.keySet().sort(function(v1,v2){
            let cal = v1-v2;
            let res = cal==0?0:cal>0?1:-1;
            return sortType==="asc"?res:-res;//默认降序
        });
    }
    /**
     * 获得Map的长度
     */
    this.size = function(){
        return length;
    };

    /**
     * 清空Map
     */
    this.clear = function(){
        length = 0;
        obj = new Object();
    };
}
module.exports = HashMap;