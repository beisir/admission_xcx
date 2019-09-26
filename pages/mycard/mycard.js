import { shareApp} from '../../utils/util.js';
import {myCard} from '../../utils/config.js';
const { regeneratorRuntime, ajax, consultingPhone, Toast } = global;
Page({
    data: {
        isLoad: false,
        IMG_SAV: '',
        IMG_URL: '',
        companyData: {},
        shareData: {
            imgUrl: 'https://b2b.hc360.com/h5/wj_41.jpg',
            path: '/pages/index/index?pid=100014611426',
            title: '分享小程序码'
        }
    },
    onLoad() {
        let companyData = wx.getStorageSync('companyData');
        let pid = companyData.companyInfo.providerId
        let IMG_SAV = myCard.IMG_SAV + pid;
        let IMG_URL = myCard.IMG_URL + pid;
        let shareData = {
            imgUrl: '',
            path: '/pages/index/index?pid=' + pid,
            title: companyData.companyInfo.name
        };
        this.setData({ companyData, IMG_URL, IMG_SAV, shareData});
    },
    async saveImgToPhotosAlbumTap () {
        let IMG_SAV = this.data.IMG_SAV;
        const _this = this;
        wx.showLoading({
            title: '正在保存中...'
        });
        wx.downloadFile({
            url: IMG_SAV,
            success: function (res) {
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (res) {
                            Toast('保存成功', 'success');
                        },
                        fail: function (res) {
                            if (res.errMsg.includes('cancel')){
                                Toast('取消保存');
                            } else {
                                Toast('请授权保存');                                
                                _this.setData({
                                    isLoad: true
                                });
                            };
                        }
                    });
                } else {
                    Toast('下载图片失败');    
                };
            },
            fail: function (err) {
                Toast('下载图片失败');
            },
            complete () {
                wx.hideLoading();
            }
        });
    },
    async getauthImg (e) {
        if (e.detail.errMsg.includes('ok')){
            this.saveImgToPhotosAlbumTap();
            this.setData({isLoad: false});
        } else {
            this.setData({ isLoad: true });            
        };
    },
    callLink (e) {
        let tel = e.currentTarget.dataset.tel;
        consultingPhone(tel);
    },

    longTapEvent () {
        let IMG_URL = this.data.IMG_URL;
        wx.previewImage({
            current: [IMG_URL], // 当前显示图片的http链接   
            urls: [IMG_URL] // 需要预览的图片http链接列表   
        });
    },
    /**
     * [onShareAppMessage() 分享]
     * [-------------------------------------------------]
     */
    onShareAppMessage: shareApp
});