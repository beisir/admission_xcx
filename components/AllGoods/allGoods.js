const { regeneratorRuntime, ajax, Toast } = global;
import { index, classs, loadingIMG} from '../../utils/config.js';
Component({
    properties: {
        allData: {
            type: Object,
            observer (opt) {
                if (opt.pid){
                    this.scrollLoading();
                };
            }
        },
        series: {
            type: String
        }
    },
    data: {
        loadingIMG: loadingIMG,
        titleBar: ['综合', '价格'],
        activeIndex: 0,
        priceClass: '',
        activeNum: -1,
        dataList: [],
        isLoading: false,
        pageNo: 1,
        sortType: ''
    },
    methods: {
        /**
         * [toggerClass 切换综合 价格cur 同时切换价格状态]
         * @param  {[e]} [bindtap 事件对象 获取点击 index]
         * @return {[null]}
         */
        toggerClass (e) {
            let pid = this.properties.pid;
            let activeIndex = e.currentTarget.dataset.index,
                activeNum = this.data.activeNum,
                priceClass = this.data.priceClass;
            let status = this.switchIcon(activeIndex, activeNum, priceClass);
            let sortType = status.sortType;
            if (activeIndex) {
                activeNum = status.activeNum;
                priceClass = status.priceClass;
            } else {
                sortType = '';
                priceClass = '';
                activeNum = -1;
            };
            this.setData({ activeIndex, activeNum, sortType, priceClass});
        },
        /**
         * [switchIcon 切换价格状态]
         * @param  {[activeNum]} [状态显示值 默认为-1]
         * @param  {[priceClass]} [更具状态显示值切换class名 默认为 '']
         * @return {[判断好的 activeNum， priceClass]}
         */
        switchIcon(activeIndex, activeNum, priceClass) {
            activeNum = activeNum + 1;
            let pid = this.properties.allData.pid;
            if (activeNum > 1) {
                activeNum = 0;
            };
            switch (activeNum) {
                case 0: priceClass = 'down'; break;
                case 1: priceClass = 'up'; break;
            };
            let sortType = activeNum ? 9 : 8;
            sortType = activeIndex ? sortType : '';
            this.setData({dataList: []});
            this.getallbusin(pid, sortType, 1, true);
            return {
                activeNum,
                priceClass,
                sortType
            };
        },
        async getallbusin(pid, sortType, pageNo, flag) {
            let _this = this;
            try {
                this.setData({isLoading: true});
                let series = this.properties.series;
                let url = series ? classs.seriesproduct : index.getallbusin;
                let businData = await ajax({
                    url: url,
                    data: {
                        pageno: pageNo,
                        pid: pid,
                        sortType: sortType,
                        series: series
                    }
                });
                let dataList = businData.list;
                if (!dataList.length) {
                    Toast('没有更多了...');
                    this.setData({isLoading: false});
                    return false;
                };
                if (flag) { // 用来区分是否是上拉加载
                    let hisData = this.data.dataList;
                    dataList = hisData.concat(dataList);
                    pageNo += 1;
                };
                _this.setData({ isLoading: false, pageNo, dataList});
            } catch(e) {
                console.log(e);
            };
        },
        scrollLoading () {
            let pid = this.properties.allData.pid;
            let {pageNo, sortType} = this.data;
            this.getallbusin(pid, sortType, pageNo, true);
        }
    }
})