<template>
    <layout-wrapper class-prefix="layout">
        <tags :data-source.sync="dataSource"  @update:value="onUpdateTags"></tags>
        <notes @update:value = "onUpdateNotes"></notes>
        <types :value.sync="record.type"></types>
        <number-pad :value.sync="record.amount" @submit="savaRecord"></number-pad>
        
        
    </layout-wrapper>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';

type Record = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    createdAt: Date
}

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')

@Component({
    components: {
        Tags,
        Notes,
        Types,
        NumberPad
    }
})
export default class Money extends Vue{
    dataSource = ['衣', '食', '住', '行', '彩票'];
    recordList: Record[] = recordList;
    record: Record = {
        tags: [],
        notes: '',
        type: '-',
        amount: 0,
        createdAt: new Date()
    }
    onUpdateTags(value: string[]) {
        this.record.tags = value
    }
    onUpdateNotes(value: string) {
        this.record.notes = value
    }
    savaRecord() {
        const record2: Record = JSON.parse(JSON.stringify(this.record))
        this.recordList.push(record2)
    }

    @Watch('recordList')
    onRecordListChange() {
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }
}
</script>


<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
