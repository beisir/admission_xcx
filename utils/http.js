/**
 * [http() 封装 工具函数,ajax 请求 ]
 * [{params: Object(url.. data.. 等参数)}]
 * [-------------------------------------------------]
 */
const ajax = function (params, isLoading = false) {
    return new Promise(function (resolve, reject) {
        !isLoading && wx.showLoading({
            title: '正在加载...',
            mask: true
        });
        wx.showNavigationBarLoading();
        wx.request({
            method: params.method || 'GET',
            url: params.url,
            data: params.data || {},
            header: params.header || {
                "Accept": "application/json, text/javascript, */*",
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf8;' // 默认值
            },
            success: function (options) {
                let result = options.data;
                resolve(result);
            },
            fail: function (err) {
                wx.showToast({
                    title: '请求失败',
                    icon: 'none'
                });
                reject(err);
                wx.showModal({
                    title: '警告',
                    content: `网络异常请重试`,
                    showCancel: false
                });
            },
            complete: function () {
                wx.hideNavigationBarLoading();
                !isLoading && wx.hideLoading();
            }
        });
    });
};
module.exports = ajax;