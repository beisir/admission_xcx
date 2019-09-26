Component({
    properties: {
        dataList: {
            type: Array,
            default: []
        }
    },
    methods: {
        jumpPage (e) {
            let bcid = e.currentTarget.dataset.bcid;
            wx.navigateTo({
                url: `/pages/detail/detail?bcid=${bcid}`
            });
        }
    }
})
