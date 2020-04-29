# 每周总结可以写在这里

找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？
    JS中对象（若无特殊说明，本文中的对象都为对象实例，即使是空对象实例）可谓是一个核心的概念，纵观整个JS的数据结构如String、Number、Array、Boolean等，都有其对应的对象。细细数来，感觉上就是JS里一切数据皆对象(除了纯数字、null和undefined外，其他数据都可以访问到__proto__属性)。

对象的特殊属性
    JS中的对象本质上就是一个若干个无序的键值对组成的集合。每个键值对就是对象的属性或方法。而对象中的每个属性都对应着有属性描述符，属性描述符分为数据描述符和存储描述符。属性描述符又包含了以下几个属性。

数据描述符和存取描述符均具有以下可选键值：

    configurable
        当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。 enumerable 当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。 数据描述符同时具有以下可选键值：

    value
        该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

    writable
        当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。 存取描述符同时具有以下可选键值：

    get
        一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 >undefined。

    set
        一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值>分配给该属性。默认为 undefined。

    call
        视为函数Function

    Construct
        可以被new 操作符调用，根据new的规则返回对象。

    DefineOwnProperty
    callee
        视为函数参数对对象，伪数组 caller

    GetPrototypeOf
        对应getPrototypeOf方法 获取对象原型

    SetPrototypeOf
        对应setPrototypeOf方法 设置对象原型

    GetOwnProperty
        getOwnPropertyDescriptor 获取对象私有属性的描述列表

    HasProperty
        hasOwnProperty 私有属性判断

    IsExtensible
        isExtensible对象是否可扩展

    PreventExtensions
        preventExtension控制对象是否可以添加属性

    DefineOwnProperty
        defineProperty 定义对象属性

    Delete
        delete 操作符

    OwnPropertyKeys
        Object.keys() Object.entries() Object.values()

    Module
        视为一个引入的模块

    Exports
        视为一个导出的模块

    对象的属性和方法中有几个特殊的存在
    constructor
        该属性指向对象的构造函数

    proto(非标准，不推荐使用)
        该属性指向对象的构造函数的原型对象，因为对象没有prototype属性，所以通过该属性指向它。此属性为访问器属性，不推荐使用。若需要获取对象的原型对象可以用Object.getPrototypeOf(obj)来获取。 通过对象访问的属性和方法除了来自对象自身定义的以外，还有从其原型链上继承的属性和方法。


总结：
    1、什么是对象：
        面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。
        （1）对象是单个实物的抽象。

            一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

        （2）对象是一个容器，封装了属性（property）和方法（method）。

            属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是那一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

    2、js创建对象的几种方法：
        2.1 Object构造函数创建：
            var Person =new Object();
            Person.name = 'Jason';Person.age = 21;
        2.2 使用对象字面量表示法来创建：
            var Person={};   //等同于var Person =new Object();
            var Person={
                name:"Jason",
                age:21
            }
        2.3使用工厂模式创建对象：
            function createPerson(name,age,job){ 
                var o = new Object(); 
                o.name = name; 
                o.age = age; 
                o.job = job; 
                o.sayName = function() {  
                    alert(this.name);  
                };
                return o;
            }
            var person1 = createPerson('Nike',29,'teacher');
            var person2 = createPerson('Arvin',20,'student');
        2.4 使用构造函数创建对象：
            function Person(name,age,job) { 
                this.name = name; 
                this.age = age; 
                this.job = job; 
                this.sayName = function() { 
                    alert(this.name); 
                }; 
            }
            var person1 = new Person('Nike',29,'teacher');
            var person2 = new Person('Arvin',20,'student');
        2.5 原型创建对象模式：
            function Person(){}
            Person.prototype.name = 'Nike';
            Person.prototype.age = 20;
            Person.prototype.jbo = 'teacher';
            Person.prototype.sayName = function(){ alert(this.name);};
            var person1 = new Person();person1.sayName();

    3、js对象分类：
        1、宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
            在 console 面板打印出 window 的所有属性, 会显示超出1000个，但这些属性不是都来自javascript语言，有一部分是来浏览器，以及用户创建的对象。
            像 web api, bom对象，dom对象是由浏览器提供的宿主对象。   

        2、内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。分为固有对象、原生对象和普通对象。
            2.1 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
                2.2.1 基本类型
                    Boolean
                    String
                    Number
                    Symbol
                    Object
                2.2.2 基础功能和数据结构
                    Array
                    Date
                    RegExp
                    Promise
                    Proxy
                    Map
                    WeakMap
                    Set
                    WeakSet
                    Function
                2.2.3 错误类型
                    Error
                    EvalError
                    RangeError
                    ReferenceError
                    SyntaxError
                    TypeError
                    URIError
                2.2.4 二进制操作
                    ArrayBuffer
                    SharedArrayBuffer
                    DateView
                2.2.5 带类型的数组
                    Float32Array
                    Float64Array
                    Int8Array
                    Int16Array
                    Int32Array
                    UInt8Array
                    UInt16Array
                    UInt32Array
                    Uint8ClampedArray

            2.2 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。

                利用代码：可以找到441个固有对象。

                    var set = new Set();
                    var objects = [
                        eval,
                        isFinite,
                        isNaN,
                        parseFloat,
                        parseInt,
                        decodeURI,
                        decodeURIComponent,
                        encodeURI,
                        encodeURIComponent,
                        Array,
                        Date,
                        RegExp,
                        Promise,
                        Proxy,
                        Map,
                        WeakMap,
                        Set,
                        WeakSet,
                        Function,
                        Boolean,
                        String,
                        Number,
                        Symbol,
                        Object,
                        Error,
                        EvalError,
                        RangeError,
                        ReferenceError,
                        SyntaxError,
                        TypeError,
                        URIError,
                        ArrayBuffer,
                        SharedArrayBuffer,
                        DataView,
                        Float32Array,
                        Float64Array,
                        Int8Array,
                        Int16Array,
                        Int32Array,
                        Uint8Array,
                        Uint16Array,
                        Uint32Array,
                        Uint8ClampedArray,
                        Atomics,
                        JSON,
                        Math,
                        Reflect];
                    objects.forEach(o => set.add(o));

                    for(var i = 0; i < objects.length; i++) {
                        var o = objects[i]
                        for(var p of Object.getOwnPropertyNames(o)) {
                            var d = Object.getOwnPropertyDescriptor(o, p)
                            if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
                                if(!set.has(d.value))
                                    set.add(d.value), objects.push(d.value);
                            if( d.get )
                                if(!set.has(d.get))
                                    set.add(d.get), objects.push(d.get);
                            if( d.set )
                                if(!set.has(d.set))
                                    set.add(d.set), objects.push(d.set);
                        }
                    }
