<template>
    <layout-wrapper class-prefix="layout">
        <tags :data-source.sync="dataSource"  @update:value="onUpdateTags"></tags>
        <FromItem 
            field-name="备注" 
            placeholder="在这里输入备注"
            :value.sync="record.notes"
        ></FromItem>
        <types :value.sync="record.type"></types>
        <number-pad :value.sync="record.amount" @submit="savaRecord"></number-pad>
        
        
    </layout-wrapper>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import FromItem from '@/components/Money/FromItem.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
    components: {
        Tags,
        FromItem,
        Types,
        NumberPad
    }
})
export default class Money extends Vue{
    dataSource = tagList;
    recordList = recordList;
    record: RecordItem = {
        tags: [],
        notes: '',
        type: '-',
        amount: 0,
        createdAt: new Date()
    }
    onUpdateTags(value: string[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    savaRecord() {
        this.recordList.push(recordListModel.clone(this.record));
        this.record = {
            tags: [],
            notes: '',
            type: '-',
            amount: 0,
            createdAt: new Date()
        }
    }

    @Watch('recordList')
    onRecordListChange() {
        recordListModel.save(this.recordList)
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
