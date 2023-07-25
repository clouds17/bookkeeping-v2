<template>
    <layout-wrapper class-prefix="layout">
        <tags  @update:value="onUpdateTags"></tags>
        <FromItem 
            field-name="备注" 
            placeholder="在这里输入备注"
            :value.sync="record.notes"
        ></FromItem>
        <Tabs 
            :active-tab.sync="record.type" 
            :data-source="tabData"
        ></Tabs>
        <number-pad :value.sync="record.amount" @submit="savaRecord"></number-pad>
        
        
    </layout-wrapper>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import FromItem from '@/components/Money/FromItem.vue';
import Tabs from '@/components/Tabs.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions } from 'vuex';


@Component({
    components: {
        Tags,
        FromItem,
        Tabs,
        NumberPad
    },
    
})
export default class Money extends Vue{
    record: RecordItem = {
        tags: [],
        notes: '',
        type: '-',
        amount: 0,
        createdAt: new Date()
    }
    tabData = [
        { text: '支出', type: '-' },
        { text: '收入', type: '+' }
    ]
    created() {
       
        this.$store.commit('fetchRecord')
    }
    onUpdateTags(value: tag[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    savaRecord() {
        if (!this.record.tags || this.record.tags.length == 0) {
            return window.alert('请至少选择一个标签')
        }
        this.$store.dispatch('createRecord_actions', this.record)
        Vue.prototype.$bus.$emit('clearSlectd')
        window.alert('添加成功')
        this.record = {
            tags: [],
            notes: '',
            type: '-',
            amount: 0,
            createdAt: new Date()
        }
        
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
