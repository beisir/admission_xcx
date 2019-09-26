const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
Page({
    data: {
        lat: 0,
        lng: 0,
        markers: [{
            iconPath: "/utils/location.png",
            id: 0,
            latitude: 0,
            longitude: 0,
            width: 20,
            height: 20,
            callout: {
                content: '',
                color: '#ffffff',
                fontSize: 10,
                borderRadius: 3,
                bgColor: "#fd5555", //	背景色	String	1.2.0
                padding: 10,  // 	文本边缘留白	Number	1.2.0
                display: "ALWAYS",	  //'BYCLICK':点击显示; 'ALWAYS': 常显	String	1.2.0
                textAlign: 'left'
            }
        }]
    },
    onLoad (opt) {
        // console.log(opt);
        this.address(opt);
        wx.setNavigationBarTitle({
            title: opt.address
        });
    },
    address(opt) {
        const _this = this;
        var demo = new QQMapWX({
            key: 'SCNBZ-A4WCU-XPFVM-B4HPL-DTSCO-3ZB5F' // 必填
        });
        demo.geocoder({
            address: opt.address,
            success(options) {
                let res = options.result.location;
                let markers = _this.data.markers;
                markers[0].latitude = res.lat;
                markers[0].longitude = res.lng;
                markers[0].callout.content = `${opt.accbank ? opt.accbank + '\n' : '' }${opt.address}`;
                _this.setData({ markers, lat: res.lat, lng: res.lng });
            },
            fail: function (res) {
                console.log(res);
            }
        });
    },
    navigateStore() {
        let { lat, lng } = this.data;
        wx.openLocation({
            latitude: lat,
            longitude: lng,
            scale: 16
        })
    }
});