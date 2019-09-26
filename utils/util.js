import { app } from './config.js';
import ajax from './http.js';

/**
 * [http() 封装 工具函数,ajax 请求 ]
 * [{params: Object(url.. data.. 等参数)}]
 * [-------------------------------------------------]
 */
// const ajax = function (params, isLoading = false) {
//     return new Promise(function (resolve, reject) {
//         !isLoading && wx.showLoading({
//             title: '正在加载...',
//             mask: true
//         });
//         wx.showNavigationBarLoading();
//         wx.request({
//             method: params.method || 'GET',
//             url: params.url,
//             data: params.data || {},
//             header: params.header || {
//                 "Accept": "application/json, text/javascript, */*"  
//                 // 'content-type': 'application/x-www-form-urlencoded' // 默认值
//             },
//             success: function (options) {
//                 let result = options.data;
//                 resolve(result);
//             },
//             fail: function (err) {
//                 wx.showToast({
//                     title: '请求失败',
//                     icon: 'none'
//                 });
//                 reject(err);
//                 wx.showModal({
//                     title: '警告',
//                     content: `接口请求失败,错误${JSON.stringify(err)}`,
//                 })
//             },
//             complete: function () {
//                 wx.hideNavigationBarLoading();
//                 !isLoading && wx.hideLoading();
//             }
//         });
//     });
// };

/**
 * [wechatLogin() 登陆信息 主要获取openid ，sesstionKey ]
 * [{params: Object({callback: '获取成功返回回调函数', 'session': Boolean值 ，是否获取最新，sesstionKey})}]
 * [-------------------------------------------------]
 */
function wechatLogin (callback, session) {
    if (session){
        ISlogin()
    } else {
        wx.getStorage({
            key: 'openID',
            success(res) {
                // console.log(res);
                if (res.errMsg.includes('ok')) {
                    callback(res.data);
                };
            },
            fail(err) {
                ISlogin();
            }
        });
    }
    function ISlogin() {
        wx.login({
            success: res => {
                ajax({
                    url: app.weixin,
                    data: {
                        code: res.code
                    }
                }).then(options => {
                    wx.setStorage({
                        key: 'openID',
                        data: options,
                    });
                    callback(options);
                });
            }
        })
    }

};
/**
 * [AuthorIzation() 授权登陆 ]
 * [{params: Object({e ：如果有e的参数带表手动触发获取授权，没有情况下获取缓存授权信息})}]
 * [-------------------------------------------------]
 */
const AuthorIzation = (e) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: 'userInfo',
            success(options) {
                if (options.errMsg.includes('ok')) {
                    resolve(options.data);
                } else {
                    wx.showToast({
                        title: '获取错误',
                        icon: 'none'
                    });
                };
            },
            fail() {
                if (e !== undefined) {
                    let { userInfo, errMsg } = e.detail;
                    if (errMsg.includes('ok')) {
                        wx.setStorageSync('userInfo', userInfo);
                        resolve(userInfo);
                    } else {
                        wx.showToast({
                            title: '授权失败',
                            icon: 'none'
                        });
                    };
                }
            }
        });
    });
};

    
const shareApp = function (options) {
    // console.log(options);
    const _this = this;
    let shareData = _this.data.shareData,
        // shareImg = prodimage[0].name || '',
        shareImg = 'https://style.org.hc360.com/images/microMall/program/dImg1.png',
        // title = prodinfo.name;
        title = 'hello word';
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    console.log(shareData);
    let shareObj = {
        // 默认是小程序的名称(可以写slogan等)
        title: shareData.title,
        // 默认是当前页面，必须是以‘/’开头的完整路径
        path: shareData.path,
        /*自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 
        imageUrl 则使用默认截图。显示图片长宽比是 5:4*/
        imageUrl: shareData.imgUrl,
        success: function (res) {
            // 转发成功之后的回调
            // console.log(res);
            if (res.errMsg == 'shareAppMessage:ok') { };
        },
        // 转发失败之后的回调
        fail: function (res) {
            // 用户取消转发
            if (res.errMsg == 'shareAppMessage:fail cancel') { }
            // 转发失败，其中 detail message 为详细失败信息
            else if (res.errMsg == 'shareAppMessage:fail') { }
        }
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
        // console.log(options);
        // var eData = options.target.dataset;
    };
    // console.log(shareObj);
    return shareObj;
}

const setStore =  function (val, active, callback) {
    let histor_word = wx.getStorageSync('histor_word');
    if (histor_word === '') {
        histor_word = [{ w: val, active }];
    } else {
        histor_word.unshift({ w: val, active });
        if (histor_word.length >= 20) {
            histor_word.length = 20;
        };
        var hash = {};
        histor_word = histor_word.reduce(function (item, next) {
            hash[next.w] ? '' : hash[next.w] = true && item.push(next);
            return item
        }, []);
    };
    wx.setStorage({
        key: 'histor_word',
        data: histor_word,
        success() {
            callback(true);
        }
    });
}



module.exports = {
    ajax: ajax,
    AuthorIzation: AuthorIzation,
    wechatLogin: wechatLogin,
    shareApp: shareApp,
    setStore: setStore
}



/* function AuthorIzation (authorString = 'scope.userInfo') {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(options) {
                // console.log(options)
                let authSetting = options.authSetting[authorString];
                if (authSetting === undefined) {
                    getAuthor(authorString).then(autor => {
                        wx.showToast({
                            icon: 'none',
                            title: '授权成功'
                        });
                        resolve(autor);
                    }).catch(err => {
                        wx.showToast({
                            icon: 'none',
                            title: '授权失败'
                        });
                        reject(err);
                    });
                } else if (authSetting === false) {
                    wx.openSetting({
                        success: function (options) {
                            if (options.authSetting[authorString]) {
                                getAuthor(authorString).then(autor => {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '授权成功'
                                    });
                                    resolve(autor);
                                }).catch(err => {
                                    reject(err);
                                })
                            } else {
                                wx.showToast({
                                    icon: 'none',
                                    title: '授权失败'
                                });
                                reject({ errMsg: '拒绝了' });
                            };
                        },
                        fail: function (err) {
                            reject(err);
                        }
                    });
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '授权成功'
                    });
                    wx.getStorage({
                        key: 'userInfo',
                        success: function(res) {
                            resolve(res.data)
                        }
                    });
                }
            }
        })
    });
};
function getAuthor (authorString) {
    return new Promise((resolve, reject) => {
        switch (authorString) {
            case 'scope.userInfo': wx.getUserInfo({
                success(options) {
                    wx.setStorageSync('userInfo', options.userInfo);
                    resolve(options.userInfo)
                },
                fail(err) {
                    reject(err);
                }
            }); break;
            default: return false;
        }

    });
};
*/