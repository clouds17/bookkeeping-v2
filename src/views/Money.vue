<template>
    <layout-wrapper class-prefix="layout">
        <tags  @update:value="onUpdateTags"></tags>
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
import { mapState, mapMutations, mapActions } from 'vuex';


@Component({
    components: {
        Tags,
        FromItem,
        Types,
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
    created() {
        this.$store.commit('fetchRecord')
    }
    onUpdateTags(value: string[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
    savaRecord() {
        this.$store.dispatch('createRecord_actions', this.record)
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
