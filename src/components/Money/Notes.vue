<template>
    <div>
        <label class="notes">
            <span class="name">备注：</span>
            <input type="text" 
                v-model="value" 
                placeholder="在这里添加备注">
        </label>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue {
        value = ''
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