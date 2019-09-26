const { regeneratorRuntime, ajax } = global;
import { xcx_index } from '../../utils/config.js';
Page({
    data: {
        industry: [
            { text: '建材装饰大全', "title": "家装建材", "url": "type1" },
            { text: '电子电工品类', "title": "电子元件", "url": "type2" },
            { text: '机械设备采购', "title": "工程机械", "url": "type3" },
            { text: '安防消防设备', "title": "安防消防", "url": "type4" },
            { text: '化工塑料', "title": "化工涂料", "url": "type6" },
            { text: '印刷包装', "title": "印刷包装", "url": "type7" },
            { text: '热车用品热卖', "title": "汽车配件", "url": "type7" },
            { text: '服装批发', "title": "服装流行", "url": "type7" },
            { text: '鞋服采购', "title": "皮革制鞋", "url": "type7" },
            { text: '家电城', "title": "家居家电", "url": "type7" },
            { text: '饮水设备', "title": "饮水配件", "url": "type7" },
            { text: '电子元器件', "title": "电子LED", "url": "type7" }
        ],
        supplier: []
    },
    onLoad () {
        this.getSupplierData();
    },
    async getSupplierData () {
        try {
            let supplier = await ajax({ url: xcx_index.fromconfigure});
            supplier.constructor === Array && this.setData({ supplier});
        } catch (e){
            console.log(e);
        };
    }
});