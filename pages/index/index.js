const { regeneratorRuntime, ajax } = global;
import {index} from '../../utils/config.js';
import { shareApp } from '../../utils/util.js';
Page({
    data: {
        allData: {
            reach: 1,
            pid: ''
        },
        isFiexd: false,
        pid: 0,
        imid: '',
        // 轮播图默认Index
        activeIndex: 0,
        // 轮播图四个显示内容数据
        hcLogoImg: 'https://style.org.hc360.com/images/admission_xcx/hcLogoImg.png',
        ImageList: ['首页', '全部商品', '公司介绍', '联系我们'],
        // 是否显示供应商联系弹框
        aniStyle: false,
        companyData: {},
        titleBoxHieght: 0,
        shareData: {
            imgUrl: '',
            path: '',
            title: ''
        }
    },
    onLoad({ scene , pid, activeIndex = 0 }) {
        // console.log(pid);
        // pid = 100001766997;
        pid = scene ? scene: pid;
        // console.log(pid);
        this.getData(pid);
        this.setData({ pid, activeIndex, 'allData.pid': pid});
        this.getQueryEle();
    },
    async getData (pid) {
        try {
            let companyData = await ajax({ url: index.companyIntro + pid});
            // console.log('用户信息', companyData)
            this.setData({ companyData, imid: companyData.companyInfo.userName, 'shareData.title': companyData.companyInfo.name });
            this.settingParams(companyData);
            wx.setStorageSync('companyData', companyData);
        } catch(e) {
            console.log(e);
        };
    },
    settingParams (companyData) {
        wx.setNavigationBarTitle({
            title: companyData.companyInfo.name
        });
    },
    /**
     * [switchTab 切换首页轮播图内容]
     * @param  {[e]} [swiper切换事件对象]
     * @return {[null]}
     */
    switchTab: function (e) {
        const _this = this;
        let activeIndex = e.detail.current;
        this.setData({activeIndex}, res => {
            
        });
    },
    /**
     * [swichNav 点击切换标题cur，同时切换首页轮播图事件]
     * @param  {[e]} [bind点击切换事件对象]
     * @return {[null]}
     */
    swichNav: function (e) {
        const _this = this;
        let activeIndex = e.target.dataset.index;
        if (_this.data.activeIndex == activeIndex) {
            return false;
        } else {
            this.setData({ activeIndex, isFiexd: false}, res => {
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 0
                });
            });
        };
    },
    xjAlertBox () {
        this.setData({aniStyle: true});
    },
    getQueryEle () {
        //创建节点选择器
        var query = wx.createSelectorQuery();
        query.select('#titleBox').boundingClientRect();
        query.exec((res) => {
            this.setData({ titleBoxHieght: res[0].height });
        });
    },
    onPageScroll (e) {
        let titleBoxHieght = this.data.titleBoxHieght - 10;
        let isFiexd = e.scrollTop >= titleBoxHieght ? true : false;
        this.setData({ isFiexd});
    },
    onReachBottom (e) {
        let activeIndex = this.data.activeIndex,
            reach = this.data.allData.reach; 
        if (activeIndex == 1){
            this.setData({
                'allData.reach': reach + 1
            });
        };
    },
    /**
     * [onShareAppMessage() 分享]
     * [-------------------------------------------------]
     */
    onShareAppMessage: shareApp
});