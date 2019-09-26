const { regeneratorRuntime, ajax, consultingPhone} = global;
import { index, detail, xcx_list} from '../../utils/config.js';
import { shareApp } from '../../utils/util.js';
var html2wxml = require('../../html2wxml-template/html2wxml.js');
Page({
    data: {
        bcid: '',
        shareData: {},
        tabArr: ['图文详情', '产品参数'],
        tabCur: 0,
        aniStyle: false,
        swiperIndex: 0,
        busindetail: '',
        busininfo: {
            price: 0
        },
        companyInfo: {}
    },
    aniStyleFn () {
        this.setData({aniStyle: true});
    },
    onLoad (options) {
        let { bcid } = options;
        this.getDetailData(bcid);
    },
    async goPageIndex (e) {
        try {
            let pid = this.data.companyInfo.providerId;
            let active = e.currentTarget.dataset.active;
            let options = await ajax({
                url: xcx_list.getorderstate + pid
            });
            if(options.state === '0') {
                let url = `/pages/index/index?pid=${pid}&activeIndex=${active}`;
                wx.navigateTo({ url });
            } else {
                wx.showModal({
                    title: '提示',
                    content: `此公司未开通小程序商铺`,
                    showCancel: false
                });
            };
        } catch (err){
            console.log(err);
        }
        
    },
    async getDetailData (bcid) {
        try{
            let detailData = await ajax({
                url: detail.busininfo,
                data: { bcid: bcid }
            });
            let shareData = {
                title: detailData.busininfo.title,
                imgUrl: 'https:' + detailData.busininfo.bigPicUrl,
                path: `/pages/detail/detail?bcid=${bcid}`
            };
			this.setData({bcid, shareData, ...detailData});
			wx.request({
				url: detail.html2wxml,
				data: {
					text: detailData.busindetail,
					type: 'html',
					linenums: true,
					highlight: true
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					wx.stopPullDownRefresh();
					// html2wxml.html2wxml('article', res.data, this, 5);
					html2wxml.html2wxml('busindetail', res.data, this, 5);
				}
			})
            this.companyInfo(detailData.busininfo.providerId);
        } catch (e) {
            console.log(e);
        }
    },
    async companyInfo(pid) {
        try {
            let companyData = await ajax({ url: index.companyIntro + pid });
            let companyInfo = companyData.companyInfo;
            this.setData({ companyInfo });
        } catch (e) {
            console.log(e);
        };
    },
    swiperChange (e) {
        let swiperIndex = e.detail.current;
        this.setData({ swiperIndex});
    },
    tabTitConTap (e) {
        let tabCur = e.currentTarget.dataset.index;
        
        this.setData({tabCur});
    },
    telCallLink() {
        let mp = this.data.companyInfo.mp;
        consultingPhone(mp);
    },
    onShareAppMessage: shareApp
});