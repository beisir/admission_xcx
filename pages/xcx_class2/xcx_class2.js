const { regeneratorRuntime, ajax } = global;
import { xcx_querys } from '../../utils/config.js';
Page({
    data: {
        active: 0,
        childs: [],
        finals: [],
        name: ''
    },
    onLoad (code) {
        this.gethcseries(code);
    },
    async gethcseries (data) {
        try {
            let cseriesData = await ajax({url: xcx_querys.gethcseries, data});
            this.setData({ ...cseriesData});
        } catch (e) {
            console.log(e);
        };
    },
    toogerActive (e) {
        let active = e.currentTarget.dataset.index;
        this.setData({ active});
    }
});