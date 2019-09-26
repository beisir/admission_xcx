const { regeneratorRuntime, ajax } = global;
import { classs } from '../../utils/config.js';

Page({
    data: {
        activeIndex: 0,
        lstSeriesVO: [],
        classOption: {} ,
        twoSeriesData: [],
        dataList: []
    },
    onLoad (options) {
        this.getseries(options);
    },
    async getseries (classOption) {
        try {
            let seriesData = await ajax({
                url: classs.getseries,
                data: classOption
            });
            let twoSeriesData = await ajax({
                url: classs.Groupproduct + classOption.pid,
            }, true);
            this.setData({ classOption, lstSeriesVO: seriesData.lstSeriesVO, twoSeriesData});
            this.getRnderTwoSeries(0);
        } catch (e) {
            console.log(e);
        };
    },
    activeSeries (e) {
        let activeIndex = e.currentTarget.dataset.index;
        this.getRnderTwoSeries(activeIndex);
        this.setData({activeIndex});
    },
    getRnderTwoSeries (active) {
        let { lstSeriesVO, twoSeriesData} = this.data;
        let dataList = [];
        let series = lstSeriesVO[active];
        if (series.children.length && series.children[0].seriesName) {
            series.children.map((item, index) => {
                dataList.push(twoSeriesData[item.seriesid])
            });
        } else {
            if (twoSeriesData[series.seriesid]) {
                dataList[0] = twoSeriesData[series.seriesid];
                series.children[0] = {seriesName: ''}
            };
        };
        lstSeriesVO[active] = series;
        this.setData({ dataList, lstSeriesVO});
        // console.log(dataList);
    }
    
});