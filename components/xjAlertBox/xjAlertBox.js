const { regeneratorRuntime, ajax, Toast } = global;
import { detail} from '../../utils/config.js';
Component({
    properties: {
        aniStyle: {
            type: Boolean,
            value: false
        },
        referrer: {
            type: String
        },
        businId: {
            type: String,
            observer(businId) {
                if (businId !== '') {
                    this.setData({
                        'inquiryParamVO.businId': businId
                    });
                }
            }
        },
        businTitle: {
            type: String,
            observer(businTitle) {
                if (businTitle !== '') {
                    this.setData({
                        'inquiryParamVO.businTitle': businTitle
                    });
                }
            }
        },
        pid: {
            type: String,
            observer(pid) {
                if (pid !== '0') {
                    this.setData({
                        'inquiryParamVO.sellerProviderId': pid
                    });
                }
            }
        }
    },
    data: {
        defaultData: {
            index: {
                input: '联系电话',
                inputHolder: '请输入联系电话',
                tarea: '留言内容',
                tareaHolder: '请输入留言内容'
            },
            detail: {
                input: '联系电话',
                inputHolder: '请输入联系电话',
                tarea: '留言内容',
                tareaHolder: '请输入留言内容'
            },
        },
        inputKey: '',
        areaKey: '',
        inquiryParamVO: {
            businTitle: '',
            inquiryNum: 1,
            telPhone: '',
            type: '101',
            businId: '',
            sellerProviderId: '',
            buyerSourceId: 'u_xcx_purchase_list'
        }
    },
    methods: {
        closeFn () {
            this.setData({ aniStyle: false});
        },
        closeBoxCon() {
            this.setData({ 
                aniStyle: false,
                'inquiryParamVO.telPhone': '',
                'inquiryParamVO.businTitle': ''
            });
        },
        submitAlert (options) {
            let inquiryParamVO = this.data.inquiryParamVO;
            if (inquiryParamVO.telPhone.trim() !== '' && inquiryParamVO.businTitle !== '') {
                this.sendLeavingMsg(inquiryParamVO);
            } else {
                Toast('请填写信息');
            };
        },
        blurKey (e) {
            let reffer = e.currentTarget.dataset.reffer,
                val = e.detail.value;
            let inquiryParamVO = this.data.inquiryParamVO;
            inquiryParamVO[reffer] = val;
            this.setData({ inquiryParamVO});
        },
        async sendLeavingMsg (inquiryParamVO) {
            try {
                let options = await ajax({
                    url: detail.doperform,
                    method: 'POST',
                    data: inquiryParamVO
                });
                if (options.code.includes('yes')){
                    Toast('留言成功');
                } else {
                    Toast('留言失败');
                };
                this.closeBoxCon();
            } catch (e) {
                console.log(e);
            };
        }
    }
});
