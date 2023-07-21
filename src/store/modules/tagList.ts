import createId from '@/lib/createId';

export default {
    state: {
        tagList: [
            { id: '9999',  name: '餐饮' },
            { id: '9998',  name: '零食' },
            { id: '9997',  name: '爱好' },
            { id: '9996',  name: '交通' },
            { id: '9995',  name: '日用品' },
            { id: '9994',  name: '社交' },
        ] as tag[]
    },
    mutations: {
        fetchTag(state: any) {
            
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || JSON.stringify(state.tagList)) || state.tagList;
            
        },
        saveTag(state: any) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    },
    actions: {
        createTag_actons({state, commit}: any, name: string) {
            const names = state.tagList.map((item: tag ) => item.name)
            if (names.includes(name)) {
                window.alert('当前已有此标签');
            } else {
                const id = createId().toString();
                state.tagList.push({id, name});
                commit('saveTag')
            }
        },
        updateTag_actions({state, commit}: any, payload: tag) {
            const index = state.tagList.findIndex((item: tag )=> item.id === payload.id);
            if (index >= 0) {
                const names = state.tagList.map((item: tag ) => item.name);
                if (names.indexOf(payload.name) >= 0) {
                    window.alert('当前已有此标签');
                } else {
                    const tag = state.tagList[index];
                    tag.name = payload.name;
                    commit('saveTag');
                }
            } else {
                window.alert('找不到标签');
            }
        },
        removeTag_actions({state, commit}: any, id: string) {
            const index = state.tagList.findIndex((item: tag ) => item.id === id);
            state.tagList.splice(index, 1);
            commit('saveTag');
        }
    },
}