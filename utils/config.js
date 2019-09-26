const hostname = 'https://wsmobile.hc360.com/';
const hostname2 = 'https://madata.hc360.com/';
module.exports = {
    errImg: 'https://style.org.hc360.com/images/cpk/pc/nImg.png',
    loadingIMG: 'https://style.org.hc360.com/images/my/images/corcenter/mmt4/new/wjz/wj_loading.gif',
    index: {
        gethotandlate: `${hostname}gethotandlate?pid=`,
        companyIntro: `${hostname}companyinfo?pid=`,
        getallbusin: `${hostname}getallbusin`,
        getUseDiyTemplate: `${hostname2}mobileapp/diyTemplate/getUseDiyTemplate?appid=wxceaf011491c56633&source=1&imid=`
        // getUseDiyTemplate: `http://madata.hc360.com/mobileapp/diyTemplate/getUseDiyTemplate?appid=wxceaf011491c56633&source=1&imid=`
    },
    detail: {
        busininfo: `${hostname}busininfo`,
		doperform: 'https://my.b2b.hc360.com/my/turbine/action/inquiry.InquiryActionM/eventsubmit_doPerform/doperform',
		html2wxml:`${hostname2}html2wxml4J/`
    },
    classs: {
        getseries: `${hostname}getseries`,
        seriesproduct: `${hostname}getseriesproduct?pageno=10`,
        Groupproduct: `${hostname}/getseriesGroupproduct?pid=`
    },
    xcx_querys: {
        inquery: 'https://mlogin.hc360.com/get/inquery',
        gethcseries: `${hostname}gethcseries`
    },
    setup_shop: {
        LoginTicket: 'https://sso.hc360.com/LoginTicket.jsp', // 图形验证码验证码
        sendMessage: 'https://mlogin.hc360.com/int/sendMessage', // 手机验证码
        regLodingmobile: 'https://mlogin.hc360.com/regLodingmobile.html' // 注册开店接口
    },
    xcx_index: {
        fromconfigure: `${hostname}getcompanyfromconfigure`
    },
    xcx_list: {
        getorderstate: `${hostname}/getorderstate?pid=`
    },
    myCard: {
        IMG_SAV: `${hostname}getMergeSharePict?pid=`,
        IMG_URL: `${hostname}getAppCode?pid=`
    },
    search: {
        search: `https://wsmobile.hc360.com/get/search`,
        searchshop: `https://wsmobile.hc360.com/get/searchshop`
    }
    
    
}