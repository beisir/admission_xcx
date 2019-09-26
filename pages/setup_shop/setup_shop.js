const { regeneratorRuntime, ajax, Toast } = global;
import { setup_shop} from '../../utils/config.js';
Page({
    data: {
        companyData: {
            company: '',
            phone: '',
            valicode: '',
            code: '',
            password: ''
        },
        seedIMG: '',
        time: 60
        
    },
    onShow () {
        this.getCodeIMG();
    },
    blurCompany (e) {
        let companyData = this.data.companyData;
        let comType = e.currentTarget.dataset.type,
            value = e.detail.value;
        companyData[comType] = value.trim();
        this.setData({ companyData});    
    },
    async getCodeIMG () {
        try {
            let codeImg = await ajax({url: setup_shop.LoginTicket});
            codeImg = codeImg.replace(/^null\(|\)$/g, '');
            codeImg = codeImg.replace(/(value|key)/g, val => `"${val}"`);
            codeImg = JSON.parse(codeImg);
            this.setData({ seedIMG: codeImg, 'companyData.valicode': '' });
        } catch (e) {
            console.log(e);
        };
    },
    checkPhone (companyData) {
        let icexp = companyData.valicode.match(/^[0-9]{4}$/),
            exp = companyData.phone.match(/^[1][0-9]{10}$/);     
        !icexp && Toast('验证码格式不正确');
        !exp && Toast('手机号不能为空或手机号格式不正确');
        return icexp !== null && exp !== null;
    },
    async getPhoneCode () {
        try {
            let {companyData, seedIMG} = this.data,
                status = this.checkPhone(companyData);
            if (status){
                let codestatus = await ajax({
                    url: setup_shop.sendMessage,
                    method: 'POST',
                    data: {
                        phone: companyData.phone,
                        ctoken: seedIMG.key,
                        valicode: companyData.valicode
                    }
                });
                this.verification(codestatus);
            }    
            

        } catch (e) {
            console.log(e);
        };
    },
    verification (codestatus) {
        let msg = '';
        switch (codestatus) {
            case '1': msg = '手机号格式不正确 请重新输入!'; break;
            case '2': msg = '请输入正确的图形验证码!'; this.getCodeIMG(); break;
            case '3': msg = '手机号码已被绑定 请重新输入!'; this.getCodeIMG(); break;
            case '4': msg = '短信发送成功。'; this.intervalTime(); break;
            default : msg = codestatus; this.getCodeIMG(); break;
        };
        Toast(msg);
    },
    intervalTime () {
        let time = this.data.time;
        let timer = setInterval(() => {
            time --;
            if (time <= 0) {
                time = 60;
                clearInterval(timer);
            };
            this.setData({time});
        }, 1000);
    },
    submitCompany () {
        try {
            let companyData = this.data.companyData;
            let checkCompany = companyData.company.match(/^(?![0-9]+$)(?![a-zA-Z]+$)/);
            if (!checkCompany){
                Toast('请填写正确的公司名称');return false;
            };
            let exp = companyData.phone.match(/^[1][0-9]{10}$/);
            let cexp = companyData.code.match(/^[0-9]{6}$/);
            let icexp = companyData.valicode.match(/^[0-9]{4}$/);

            if (exp && cexp && icexp) {
                if (this.checkPassword()) {
                    this.sendCompany(companyData);
                }
            } else {
                Toast('请输入正确的手机号和验证码')
            };

        } catch (e) {
            console.log(e);
        };
    },
    checkPassword() {
        let {password, phone} = this.data.companyData;
        if (phone != "") {
            if (phone == password) {
                Toast("密码不能和手机号相同");
                return false;
            }
            if ("1q2w3e" == password.toLowerCase()) {
                Toast("密码过于简单");
                return false;
            };
        }

        var A = password.replace(/[0-9]/g, "");
        var B = password.replace(/[a-zA-Z]/g, "");
        var C = password.replace(/[0-9a-zA-Z]/g, "");
        if (password == "" || password.replace(/^\s+|\s+$/g, "") == "") {
            if (password.indexOf(" ") >= 0) {
                Toast("密码不能包含空格。");
            } else {
                Toast("请输入密码。");
            }
            return false;
        } else if (password.length < 6 || password.length > 20) {
            Toast("密码长度为6-20位。");
            return false;
        } else if (password.length >= 6) {
            /* 9位以下纯数字 */
            if (A.length == 0 && password.length < 9) {
                Toast("密码不能是纯数字。");
                return false;
            }
            if (B.length == 0) {
                Toast("不能是纯字母。");
                return false;
            }
            if (password.indexOf(" ") >= 0) {
                Toast("密码不能包含空格。");
                return false;
            };
        } else if (A.length == 0 || B.length == 0 || password.length == C.length) {
            Toast("密码长度为6-20位。");
            return false;
        };
        return true;
    },
    async sendCompany (params) {
        try {
            let options = await ajax({
                url: setup_shop.regLodingmobile,
                method: 'POST',
                data: params
            });
            Toast(options.message);
            if (options.code === '200'){
                wx.navigateTo({
                    url: '/pages/setup_shop_succ/setup_shop_succ'
                });
            };
        } catch (e){
            console.log(e);
        };
    }
});