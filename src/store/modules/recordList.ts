import clone from "@/lib/clone";

type RootState = {
    recordList: RecordItem[]
}

export default {
    state: {
        recordList: []
    } as RootState,
    mutations: {
        fetchRecord(state: RootState) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state: RootState, record: RecordItem) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
        },
        saveRecord(state: RootState) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        }
    },
    actions: {
        createRecord_actions({commit}: any, record: RecordItem) {
            commit('createRecord', record)
            commit('saveRecord')
        }
    },
}