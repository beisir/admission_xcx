const { regeneratorRuntime, ajax } = global;
import { index } from '../../utils/config.js';
Page({
    data: {
        allData: {
            reach: 0,
            pid: ''
        },
        classOption: {},
        companyData: {}
        // ,reach: 0
    },
    onLoad(classOption){
        let companyData = wx.getStorageSync('companyData');
        // this.setData({ companyData });
        wx.setNavigationBarTitle({
            title: companyData.companyInfo.name
        });
        // this.companyInfo(classOption.pid);
        this.setData({ companyData, classOption, 'allData.pid': classOption.pid});
    },
    async companyInfo(pid) {
        try {
            let companyData = await ajax({ url: index.companyIntro + pid });
            
            wx.setNavigationBarTitle({
                title: companyData.companyInfo.name
            });
        } catch (e) {
            console.log(e);
        };
    },
    onReachBottom(e) {
        let reach = this.data.allData.reach;
        this.setData({
            'allData.reach': reach + 1
        });
    }
});