module.exports = function (global) {
    global.regeneratorRuntime = require('./regenerator-runtime/runtime-module.js');
    global.ajax = require('./http.js');
    global.Toast = function (msg, icon) {
        wx.showToast({
            title: msg,
            mask: true,
            // image: '/images/error.png',
            icon: icon || 'none'
        });
    };
    global.consultingPhone = function (phoneNum) {
        phoneNum = phoneNum ? phoneNum : "00000000";
        wx.makePhoneCall({
            phoneNumber: phoneNum,
        });
    };
}