const { consultingPhone} = global;
Component({
    properties: {
        companyInfo: {
            type: Object
        }
    },
    methods: {
        xjAlertBox () {
            this.triggerEvent('xjAlertBox', { paramBtoA: 123 });
        },
        telCallLink () {
            let mp = this.properties.companyInfo.mp;
            consultingPhone(mp);
        }
    }
})
