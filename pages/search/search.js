const { regeneratorRuntime, ajax, Toast} = global;
import { setStore} from '../../utils/util.js';
Page({
    data: {
        titleIndex: 0,
        titleBar: ['搜产品', '搜企业'],
        keyword: '',
        histor_word: []
    },
    onShow() {
        let histor_word = wx.getStorageSync('histor_word');
        if (histor_word) {
            this.setData({
                histor_word: histor_word
            });
        };
    },
    toogerTitle(e) {
        let titleIndex = e.currentTarget.dataset.index;
        this.setData({ titleIndex });
    },
    searchKey (e) {
        let keyword = this.data.keyword,
            titleIndex = this.data.titleIndex;
        if (keyword.trim() !== '') {
            let url = `/pages/s_area/s_area?active=${titleIndex}&w=${keyword}`;
            setStore(keyword, titleIndex, (flag) => {
                wx.navigateTo({ url });
            });
        } else {
            Toast('请输入搜索内容');
        }; 
    },
    pressKey (e) {
        let keyword = e.detail.value;
        this.setData({ keyword});
    },
    removeDel () {
        wx.clearStorageSync('histor_word');
        this.setData({
            histor_word: []
        });
    }
});