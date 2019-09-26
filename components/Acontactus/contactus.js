const { consultingPhone } = global;
Component({
    properties: {
        companyInfo: {
            type: Object,
            observer (opt) {
                // console.log(opt);
                // this.address(opt);
            }
        },
        activeIndex: {
            type: Number
        }
    },
    methods: {
        callLink (e) {
            let tel = e.currentTarget.dataset.tel;
            consultingPhone(tel);
        }
    }

});