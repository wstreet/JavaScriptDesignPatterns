/************************
*******发布订阅通用实现*****
*************************/


const event = {
    clientList: [],

    // 订阅方法
    listen: (key, fn) => { // fn最好是有名称函数
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },

    trigger: () => {
        // const key = Array.prototype.shift(arguments);
        const [key, ...rest] = [...arguments]
        const fns = this.clientList[key]

        if (!fns || fns.length === 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, rest)
        })
    },
    remove: (key, fn) => {
        const fns = this.clientList[key];

        if (!fns) { // key对应的消息没有被订阅
            return false;
        }

        if (!fn) { // 如果没有传入具体的fn，则取消key对象的所有订阅
            fns && (fns.length = 0);
            // 或令this.clientList[key] = [], 
            // fns引用this.clientList[key]，如果直接fns = [],
            // 则会断开fns对this.clientList[key]的引用
        } else {
            for (let posi = fns.length - 1; l >= 0; l--) {
                const _fn = fns[posi];
                if (_fn === fn) {
                    fns.splice(posi, 1)
                }
            }
        }
    }
}

// 向target对象上安装Event（将event上的属性和方法添加到target上）
const installEvent = (target) => {
    for (const prop in event) {
        target[prop] = event[prop]
    }
}

// example

const saleOffices = {};
installEvent(saleOffices);

saleOffices.listen('squarMeter88', (price) => {
    console.log('price', price);
})

saleOffices.listen('squarMeter100', (price) => {
    console.log('price', price);
})

saleOffices.trigger('squarMeter88', 20000)
saleOffices.trigger('squarMeter100', 20000)



/***
*  通用方法的例子：网站登陆
*  描述：有需要用到用户信息的模块在用户登陆成功之后收到发布的信息
*/


const login = {}
installEvent(login);

ajax('http://xxx.com/login', (data) => {
    // 登陆成功之后向订阅者发布用户信息
    login.trigger('loginSuccess', data)
})


// header模块订阅登陆成功信息
const header = (function () {
    login.listen('loginSuccess', data => {
        header.setAvatar(data.avatar)
    })

    return {
        setAvatar: (avatar) => {
            console.log('header-avatar', avatar)
        }
    }
})()



// nav模块订阅登陆成功信息

const nav = (function () {
    login.listen('loginSuccess', data => {
        nav.setAvatar(data.avatar)
    });

    return {
        setAvatar: (avatar) => {
            console.log('nav-avatar', avatar)
        }
    }
})()



/************************
*******最终版本**********
*************************/















// class Event {
//     _default = 'default'
//     _slice = Array.prototype.slice
//     _shift = Array.prototype.shift
//     _unshift = Array.prototype._unshift
//     namespaceCache = {}

//     // 
//     _create(namespace) {

//     }

//     // 添加订阅
//     _listen() {

//     }

//     // 发布
//     _trigger() {

//     }

//     // 删除订阅
//     _remove() {

//     }


// }