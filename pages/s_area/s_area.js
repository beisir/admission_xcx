const { regeneratorRuntime, ajax, Toast } = global;
import addressData from '../../utils/address.js';
import { loadingIMG, search, xcx_list} from '../../utils/config.js';
import { setStore } from '../../utils/util.js';
Page({
    data: {
        tabLi: [{
            text: '综合',
            flag: true
        }, {
            text: '价格',
            flag: true,
            icon: 'picon'
        }, {
            text: '筛选',
            flag: true,
            icon: 'tabIco'
        }],
        patternIndex: null,
        patternList: [
            { text: ' 生产型', j: '1' },
            { text: ' 贸易型', j: '2' },
            { text: ' 服务型', j: '4' },
            { text: ' 政府或其他', j: '8' }
        ],
        clear: false,
        icon: 0,
        tabLiCur: 0,
        loadingIMG: loadingIMG,
        active: '0',
        isLoading: false,
        addressData: addressData,
        pageno: 1,
        parentindex: null,
        childsindex: null,
        rightindex: null,
        parentText: '',
        childsText: '',
        w: '',
        area: '中国',
        screen: true,
        screenChild: false,
        min: '',
        max: '',
        v: '',
        j: '',
        searchResultInfo: []
    },
    onLoad (result) {
        // result = { active: '1', w: '挖掘机' };
        let flag = result.active === '1' ? false: true;
        wx.setNavigationBarTitle({
            title: flag ? '产品' : '企业'
        });
        this.setData({ ...result, 'tabLi[1].flag': flag }, () => {
            this.getProductData(1);
        });
        console.log(result);
    },
    searchEvent (e){
        let active = this.data.active;
        this.setData({ searchResultInfo: []});
        setStore(e.detail.value, active, (flag) => {
            this.onLoad({ w: e.detail.value, active });
        });
        
    },
    tabLiActive (e) {
        let { tabLi, v, screen, icon, searchResultInfo} = this.data;
        let tabLiCur = e.currentTarget.dataset.index;
        tabLi[1].icon = 'picon';
        tabLi[2].icon = 'tabIco';
        v = '';
        if (tabLiCur === 0) {
            screen = true;
            icon = 0;
            searchResultInfo = [];
            this.clearBtn();
        } else if (tabLiCur === 1) {
            screen = true;            
            icon = icon >= 2 ? 1 : icon+ 1;
            if (icon === 1){
                tabLi[1].icon = 'picon picoUp';
                v = '8';
            } else if (icon === 2) {
                tabLi[1].icon = 'picon picoDown';
                v = '9';
            };
            searchResultInfo = [];
        } else if (tabLiCur === 2) {
            icon = 0;
            tabLi[2].icon = !screen ? 'tabIco' : 'curIco';
            screen = !screen;
        };
        this.setData({ searchResultInfo, tabLiCur, v, tabLi, icon, screen: screen, screenChild: false}, () => {
            if (tabLiCur !== 2){
                this.getProductData(1);
            };
        });
    },
    activeLeft (e){
        let { addressData, parentText, childsText, rightindex, screenChild, area} = this.data;
        let { childsindex, parentindex} = e.currentTarget.dataset;
        parentText = addressData[parentindex].title[childsindex];
        childsText = '';
        rightindex = null;
        area = '中国' + ':' + parentText;
        screenChild = addressData[parentindex].city[childsindex].length ? false : true; 
        this.setData({ childsindex, parentindex, parentText, childsText, rightindex, screenChild, area});
    },
    activeRight (e) {
        let { childsindex, parentindex, addressData, childsText, screenChild, area} = this.data;
        let rightindex = e.currentTarget.dataset.rightindex;
        childsText = addressData[parentindex].city[childsindex][rightindex];
        screenChild = true;
        area = area + ':' + childsText;
        this.setData({ rightindex, childsText, screenChild, area});
    },
    sildeDown () {
        let screenChild = this.data.screenChild;
        this.setData({ screenChild: !screenChild})
    },
    submitBtn (){
        this.setData({ searchResultInfo: []});
        this.getProductData(1);
        let { clear, tabLi, tabLiCur } = this.data;
        if (clear){
            tabLiCur = 0;
        };
        tabLi[2].icon = 'tabIco';
        this.setData({screen: true, tabLi, tabLiCur, clear: false});
    },
    clearBtn (){
        this.setData({
            clear: true,
            parentText: '',
            childsText: '',
            j: '',
            max: '',
            min: '',
            area: '中国',
            patternIndex: null,
            parentindex: null,
            childsindex: null,
            rightindex: null,
        });
    },
    async getProductData (pageno){
        try {
            this.setData({ isLoading: true});
            let params = this.filterData(pageno);
            let active = this.data.active;
            let url = active === '0' ? search.search : search.searchshop
            let searchResultInfo = this.data.searchResultInfo;
            let result = await ajax({ 
                url: url,
                data: params
            });
            if (result.searchResultInfo.length) {
                searchResultInfo = searchResultInfo.concat(result.searchResultInfo);
                this.setData({ searchResultInfo, pageno: pageno, isLoading: false});
            } else {
                this.setData({ isLoading: false});
                Toast('没有更多了...');
            };
        } catch (err){
            Toast('搜索异常，稍后再试');
            console.log(err);
        };
    },
    filterData (pageno) {
        let data = this.data;
        let dataArr = data.active === '0' ? ['w', 'area', 'max', 'min','v'] : ['w', 'area', 'j'];
        let params = {};
        dataArr.map((item) => {
            if (data[item]){
                params[item] = data[item];
            };
        });
        if (data.max === '' && data.min === '' && data.v === '' && data.j === '') {
            this.setData({clear: true});
        };
        return Object.assign({
            pageno: pageno,
            pagesize: 10
        }, params);
    },
    keyPrice (e) {
        let dataType = e.currentTarget.dataset.type;
        if (dataType === 'min') {
            let min = e.detail.value;
            this.setData({min});
        } else {
            let max = e.detail.value;
            this.setData({max});
        };
    },
    patternActive (e){
        let patternIndex = e.currentTarget.dataset.index,
            j = e.currentTarget.dataset.j;
        this.setData({ patternIndex, j});
    },
    async goShopIndex(e) {
        try {
            let pid = e.currentTarget.dataset.pid;
            let url = '/pages/blankpage/blankpage';
            let options = await ajax({
                url: xcx_list.getorderstate + pid
            });
            if (options.state === '0') {
                url = `/pages/index/index?pid=${pid}`;
                wx.navigateTo({ url });
            } else {
                wx.showModal({
                    title: '提示',
                    content: `此公司未开通小程序商铺`,
                    showCancel: false
                });
            };
        } catch (e) {
            console.log(e);
        };
    },
    onReachBottom(e) {
        let pageno = this.data.pageno;
        pageno += 1;
        this.getProductData(pageno);
    }
});