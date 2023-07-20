import clone from "@/lib/clone";

export default {
    state: {
        recordList: [] as RecordItem[]
    },
    mutations: {
        fetchRecord(state: any) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state: any, record: RecordItem) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
        },
        saveRecord(state: any) {
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