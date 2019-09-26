const { regeneratorRuntime, ajax } = global;
import {index} from '../../utils/config.js';
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pid: {
            type: String
        },
        imid: {
            type: String,
            observer(imid) {
                if (imid !== '') {
                    let pid = this.properties.pid;
                    this.getDiyTemplateByImid(imid, pid);
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isTemplate: false,
        latestPro: [],
        recVo: [],
		// templateData: {}
		templateId: 0,//模板Id
		dataArray:[],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async getTemplate_1 (){
            try {
                
            } catch (e) {
                console.log(e);
            }
        },
        async gethotandlate (opt) { 
            try {
                let data = await ajax({
                    url: index.gethotandlate + opt
                }, true);
                // console.log('列表信息', data);
                this.setData({...data});
            } catch (e) {
                console.log(e);
            };
        },
        async getDiyTemplateByImid(imid, pid) {
            try {
                let moduleData = await ajax({
                    url: index.getUseDiyTemplate + imid
				});
                if (moduleData.errcode === 0) {
                    let templateData = moduleData.data;
                    // let templateData = mData;
                    if (templateData) {
                        let dataArray = JSON.parse(templateData.module);
                        if (templateData && templateData.template_id !== '0') {
                            this.setData({
                                templateId: templateData.template_id,
                                isTemplate: false,
                                dataArray: dataArray
                            });
                        } else {
                            this.setData({ isTemplate: true });
                            this.gethotandlate(pid);
                        };
                    } else {
                        this.setData({ isTemplate: true });
                        this.gethotandlate(pid);
                    };
                }
                
            
				
            } catch (e) {
                console.log(e);
            };
        }
    }
})
