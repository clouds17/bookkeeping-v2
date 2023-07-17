<template>
    <div>
        <label class="notes">
            <span class="name">{{ fieldName }}：</span>
            <input type="text" 
                v-model="value" 
                :placeholder="placeholder">
        </label>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

    @Component
    export default class FromItem extends Vue {

        @Prop({ required: true }) fieldName!: string;
        @Prop() placeholder?: string;

        value = ''

        @Watch('value')
        onValueChange(value: string) {
            this.$emit('update:value', value)
        }
    }
</script>

<style lang="scss" scoped>
.notes {
    font-size: 14px;
    background-color: #f5f5f5;
    padding: 0 16px;
    display: flex;
    align-items: center;

    .name {
        padding-right: 5px;
    }
    input {
        padding: 16px 0 ;
        flex-grow: 1;
        background-color: transparent;
    }
}
</style>