import createId from '@/lib/createId';

export default {
    state: {
        tagList: [] as tag[]
    },
    mutations: {
        fetchTag(state: any) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') || [];
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
            return name
        },
        updateTag_actions({state, commit}: any, payload: tag) {
            const index = state.tagList.findIndex((item: tag )=> item.id === payload.id);
            if (index >= 0) {
                const names = state.tagList.map((item: tag ) => item.name);
                if (names.indexOf(payload.name) >= 0) {
                    return 'duplicated';
                } else {
                    const tag = state.tagList[index];
                    tag.name = payload.name;
                    commit('saveTag');
                    return 'success'; 
                }
                return 'success';
            } else {
                return 'not found';
            }
        },
        removeTag_actions({state, commit}: any, id: string) {
            const index = state.tagList.findIndex((item: tag ) => item.id === id);
            state.tagList.splice(index, 1);
            commit('saveTag');
            return true;
        }
    },
}