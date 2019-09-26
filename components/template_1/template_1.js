Component({
    /**
     * 组件的属性列表
     */
    properties: {
		dataArray: {
			type: Array,
			observer:function(n,o,c){
				// console.log(n)
			}
		},
		templateId: {
			type: String
		},
        /* templateData: {
            type: Object
        }, */
        pid: {
            type: String
        }
    },
    data: {
        templateConfig: {
            10:{
                color: '#ffffff',
                activeColor: '#fd5555',
			},
            11:{
                color: '#e5e5e5',
                activeColor: '#af5999',
                serveisClass: 't-proClass',
                proList: 't-proList',
                proRank: 't-proRank',
                proRank2: 't-proRank2',
                proList2: 't-proList2'
            },
        	12:{
                color: '#baac9c',
                activeColor: '#faca96'                
            }
		}
    },
    methods: {
        goDetailPage (e) {
            let bcid = e.currentTarget.dataset.bcid;
            if (bcid && bcid !== 'undefined') {
                let url = `/pages/detail/detail?bcid=${bcid}`;
                wx.navigateTo({url});
            } else {
                return false;
            };
        }
    }
});
