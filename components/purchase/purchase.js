const { regeneratorRuntime, ajax } = global;
import { xcx_querys } from '../../utils/config.js';
Component({
    properties: {
        inquiryData: {
            type: Object,
            observer (options){
                let inquiry = this.data.inquiry;
                inquiry = Object.assign(inquiry, options);
                this.setData({inquiry});
            }
        }
    },
    data: {
        inquiry: {
            type: 408,
            comeUrl: 'xcx',
            buyerSourceId: 'u_mip_short_inquiry',
            inquiryNum: 1,
            businTitle: '',
            telPhone: ''
        }
    },
    methods: {
        titleKey(e) {
            let businTitle = e.detail.value;
            this.setData({ 'inquiry.businTitle': businTitle });
        },
        phoneKey(e) {
            let telPhone = e.detail.value;
            this.setData({ 'inquiry.telPhone': telPhone });
        },
        addAndsub(e) {
            let sub = e.currentTarget.dataset.sub,
                inquiryNum = this.data.inquiry.inquiryNum;
            inquiryNum = sub === 'add' ? inquiryNum + 1 : inquiryNum - 1;
            inquiryNum = inquiryNum <= 1 ? 1 : inquiryNum;
            this.setData({ 'inquiry.inquiryNum': inquiryNum });
        },
        async submitComfrim() {
            let { inquiryNum, businTitle, telPhone } = this.data.inquiry;
            let ckStatus = await this.checkTitle(businTitle) && await this.checkMobile(telPhone);

            ckStatus && this.sendInquiry();
        },

        async checkTitle(title) {
            let status = title.trim() === '' ? false : true;
            !status && wx.showToast({
                title: '采购产品名称不能为空',
                icon: 'none'
            });
            return status;
        },
        async checkMobile(phone) {
            if (!(/^1[2-9][0-9]\d{8}$/.test(phone.trim()))) {
                wx.showToast({
                    title: '手机号码不正确',
                    icon: 'none'
                });
                return false;
            } else {
                return true;
            };
        },
        async sendInquiry() {
            try {
                let inquiry = this.data.inquiry;
                let result = await ajax({
                    url: xcx_querys.inquery,
                    data: inquiry
                });
                if (result.code.length > 0) {
                    let yemsg = '您的采购信息已经受理，我们的工作人员会尽快与您取得联系。请保持电话通畅。',
                        nomsg = '系统异常，请重试';
                    let message = result.code.includes('yes') ? yemsg : nomsg;
                    wx.showModal({
                        showCancel: false,
                        title: '友情提示',
                        content: message
                    });
                };
            } catch (e) {
                console.log(e);
            }
        }
    }
});