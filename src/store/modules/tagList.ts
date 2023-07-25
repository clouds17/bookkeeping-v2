import createId from '@/lib/createId';
import Vue from 'vue';
import clone from '@/lib/clone';

type TagListType = {
    classify: string,
    tags?: tag[],
}

export default {
    state: {
        curTag: {
            id: '',
            name: '',
            pic: ''
        } as tag,
        tagList: [
            {
                classify: '饮食',
                tags: [
                    { id: '999',  name: '餐饮', pic: process.env.VUE_APP_IMG_URL + '餐饮美食.png' },
                    { id: '1000',  name: '零食', pic: process.env.VUE_APP_IMG_URL + '零食_肉食.png' },
                    { id: '1001',  name: '水果', pic: process.env.VUE_APP_IMG_URL + '苹果.png' },
                    { id: '1002',  name: '饮料', pic: process.env.VUE_APP_IMG_URL + '饮料.png' },
                ]
            },
            {
                classify: '出行',
                tags: [
                    { id: '1003',  name: '交通', pic: process.env.VUE_APP_IMG_URL + '汽车.png' },
                    { id: '1004',  name: '娱乐', pic: process.env.VUE_APP_IMG_URL + '娱乐.png' },
                    { id: '1005',  name: '社交', pic: process.env.VUE_APP_IMG_URL + '啤酒.png' },
                    { id: '1006',  name: '旅行', pic: process.env.VUE_APP_IMG_URL + '飞机.png' },
                ]
            },
            {
                classify: '日用',
                tags: [
                    { id: '1007',  name: '日用品', pic: process.env.VUE_APP_IMG_URL + '日用品.png' },
                    { id: '1008',  name: '衣服', pic: process.env.VUE_APP_IMG_URL + '衣服5.png' },
                    { id: '1009',  name: '鞋子', pic: process.env.VUE_APP_IMG_URL + '鞋子.png' },
                    { id: '1010',  name: '包包', pic: process.env.VUE_APP_IMG_URL + '包包.png' },
                    { id: '1011',  name: '配饰', pic: process.env.VUE_APP_IMG_URL + '配饰.png' },
                    { id: '1012',  name: '家居用品', pic: process.env.VUE_APP_IMG_URL + '沙发.png' },
                    { id: '1013',  name: '电器', pic: process.env.VUE_APP_IMG_URL + '电饭煲.png' },
                ]
            },
            {
                classify: '住房',
                tags: [
                    { id: '1014',  name: '房租', pic: process.env.VUE_APP_IMG_URL + '房子.png' },
                    { id: '1015',  name: '水电', pic: process.env.VUE_APP_IMG_URL + '水电缴费.png' },
                    { id: '1016',  name: '煤气', pic: process.env.VUE_APP_IMG_URL + '水电煤.png' },
                    { id: '1017',  name: '网络', pic: process.env.VUE_APP_IMG_URL + 'WIFI.png' },
                    { id: '1018',  name: '通讯', pic: process.env.VUE_APP_IMG_URL + '话费充值.png' },
                ]
            },
            {
                classify: '其他',
                tags: [
                    { id: '1019',  name: '理财', pic: process.env.VUE_APP_IMG_URL + '理财.png' },
                    { id: '1020',  name: '人情', pic: process.env.VUE_APP_IMG_URL + '红包.png' },
                    { id: '1021',  name: '爱好', pic: process.env.VUE_APP_IMG_URL + '健身.png' },
                    { id: '1022',  name: '学习', pic: process.env.VUE_APP_IMG_URL + '学习.png' },
                    { id: '1023',  name: '医疗', pic: process.env.VUE_APP_IMG_URL + '医疗箱.png' },
                ]
            },
        ] as TagListType[],
        img_url: process.env.VUE_APP_IMG_URL,
        iconList: [
            { src: process.env.VUE_APP_IMG_URL + '餐饮美食.png' },
            { src: process.env.VUE_APP_IMG_URL + '智慧生活.png' },
            { src: process.env.VUE_APP_IMG_URL + '生活 椅子 躺椅.png' },
            { src: process.env.VUE_APP_IMG_URL + '淘宝.png' },
            { src: process.env.VUE_APP_IMG_URL + '电饭煲.png' },
            { src: process.env.VUE_APP_IMG_URL + '飞机.png' },
            { src: process.env.VUE_APP_IMG_URL + '日用品.png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐.png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (1).png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (2).png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (3).png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (4).png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (5).png' },
            { src: process.env.VUE_APP_IMG_URL + '娱乐 (6).png' },
            { src: process.env.VUE_APP_IMG_URL + '生活.png' },
            { src: process.env.VUE_APP_IMG_URL + '生活 (1).png' },
            { src: process.env.VUE_APP_IMG_URL + '生活 (2).png' },
            { src: process.env.VUE_APP_IMG_URL + '生活 (3).png' },
            { src: process.env.VUE_APP_IMG_URL + '汽车.png' },
            { src: process.env.VUE_APP_IMG_URL + '健身.png' },
            { src: process.env.VUE_APP_IMG_URL + '医疗箱.png' },
            { src: process.env.VUE_APP_IMG_URL + '鞋子.png' },
            { src: process.env.VUE_APP_IMG_URL + '包包.png' },
            { src: process.env.VUE_APP_IMG_URL + '零食_肉食.png' },
            { src: process.env.VUE_APP_IMG_URL + '生活服务.png' },
            { src: process.env.VUE_APP_IMG_URL + '生活服务 (1).png' },
            { src: process.env.VUE_APP_IMG_URL + '衣服5.png' },
            { src: process.env.VUE_APP_IMG_URL + 'WIFI.png' },
            { src: process.env.VUE_APP_IMG_URL + '水电缴费.png' },
            { src: process.env.VUE_APP_IMG_URL + '啤酒.png' },
            { src: process.env.VUE_APP_IMG_URL + '房子.png' },
            { src: process.env.VUE_APP_IMG_URL + '苹果.png' },
            { src: process.env.VUE_APP_IMG_URL + '羽毛球.png' },
            { src: process.env.VUE_APP_IMG_URL + '排球.png' },
            { src: process.env.VUE_APP_IMG_URL + '饮料.png' },
            { src: process.env.VUE_APP_IMG_URL + '沙发.png' },
            { src: process.env.VUE_APP_IMG_URL + '学习.png' },
            { src: process.env.VUE_APP_IMG_URL + '手机.png' },
            { src: process.env.VUE_APP_IMG_URL + '红包.png' },
            { src: process.env.VUE_APP_IMG_URL + '配饰.png' },
            { src: process.env.VUE_APP_IMG_URL + '足球.png' },
            { src: process.env.VUE_APP_IMG_URL + '燃气费.png' },
            { src: process.env.VUE_APP_IMG_URL + '理财.png' },
            { src: process.env.VUE_APP_IMG_URL + '生活.png' },
            { src: process.env.VUE_APP_IMG_URL + '篮球.png' },
            { src: process.env.VUE_APP_IMG_URL + '转账.png' },
            { src: process.env.VUE_APP_IMG_URL + '水电煤.png' },
            { src: process.env.VUE_APP_IMG_URL + '话费充值.png' },
            { src: process.env.VUE_APP_IMG_URL + '店面兑换.png' },
            { src: process.env.VUE_APP_IMG_URL + '电影票.png' },
            { src: process.env.VUE_APP_IMG_URL + '大众点评.png' },
            { src: process.env.VUE_APP_IMG_URL + '充油卡.png' },
            { src: process.env.VUE_APP_IMG_URL + '彩票.png' },
            { src: process.env.VUE_APP_IMG_URL + '爱心.png' }
        ]
    },
    mutations: {
        fetchTag(state: any) {
            
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || JSON.stringify(state.tagList)) || state.tagList;
            
        },
        saveTag(state: any) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList)); 
        },
        getCurTag(state:any, id: string) {
            if (id) {
                if (id == state.curTag.id) return;
                const arrs = [] as tag[]
                state.tagList.map((element:any) => {
                    if (element.tags.length > 0) {
                        arrs.push(...element.tags)
                    }
                });
                const index = arrs.findIndex((item: tag )=> item.id === id);
                if (index !== -1) {
                    state.curTag = clone(arrs[index])
                   
                }
            }
        },
        setCurTag(state: any, {name, pic}: any) {
            if (name) {
                state.curTag.name = name
            }
            if (pic) {
                state.curTag.pic = pic
            }
        },
        clearCurTag(state: any) {
            state.curTag = {
                id: '',
                name: '',
                pic: ''
            }
        }
    },
    actions: {
        createTag_actons({state, commit}: any, {classify, name, pic}: any) {
            return new Promise((resolve, reject) => {
                if (!name) {
                    return reject('请输入标签名')
                }
                if (!pic) {
                    pic = state.iconList[0].src
                }
                const indexs = state.tagList.findIndex((item: TagListType) => item.classify === classify)
                const names = state.tagList[indexs].tags.map((item: tag ) => item.name)
                if (names.includes(name)) {
                    return reject('当前已有此标签')
                } else {
                    const id = createId().toString();
                    state.tagList[indexs].tags.push({id, name, pic});
                    commit('saveTag');
                    return resolve('标签创建成功')
                }
            })
            
        },
        updateTag_actions({state, commit}: any ) {
            return new Promise((resolve, reject) => {
                const arrs = [] as tag[]
                const {id, name, pic} = state.curTag
                state.tagList.map((element:any) => {
                    if (element.tags.length > 0) {
                        arrs.push(...element.tags)
                    }
                });
                const index = arrs.findIndex((item: tag )=> item.id === id);

                if (index >= 0) {
                    if (arrs[index].name == name) {
                        window.alert('当前已有此标签');
                        reject(false)
                    } else {
                        arrs[index].name = name;
                        arrs[index].pic = pic;
                        commit('saveTag');
                        resolve(true)
                    }
                } else {
                    window.alert('找不到标签');
                    reject(false)
                }
            })
            
        },
        removeTag_actions({state, commit}: any, id: string) {
            state.tagList.forEach((element:any) => {
                const index = element.tags.findIndex((item:tag) => item.id === id)
                if (index !== -1) {
                    element.tags.splice(index, 1);
                    commit('saveTag');
                    window.alert('标签删除成功');
                    return false;
                }
            });
            
        }
    },
}