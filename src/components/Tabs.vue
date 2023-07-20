<template>
    <ul class="tabs">
        <li 
            v-for="item in dataSource"
            :key="item.type"
            :class="{[classPrefix+'-item']: classPrefix,selected: activeTab === item.type}"
            @click="selectType(item.type)"    
        >{{item.text}}</li>
    </ul>
</template>

<script lang="ts">
    /* eslint-disable */ 

    import { Vue, Component, Prop } from 'vue-property-decorator'


    type DataSourceItem = {
        text: string,
        type: string
    }

    @Component
    export default class Tabs extends Vue {
        @Prop({required: true, type: Array})
            dataSource!: DataSourceItem[];

        @Prop(String) 
            readonly activeTab!: string;
            
        @Prop(String) 
            classPrefix?: string;
       
        selectType(type: string) {
            this.$emit('update:active-tab', type)
        }

    }
</script>

<style lang="scss" scoped>
.tabs {
    background-color: #c4c4c4;
    display: flex;
    align-items: center;
    font-size: 18px;
    > li {
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            width: 1px;
            right: 0;
            top: 15px;
            bottom: 15px;
            background: #a09b9b;
            z-index: 9;
        }
        &:last-child::before {
            display: none;
        }

        &.selected::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10px;
            right: 10px;
            height: 2px;
            background-color: #333;
        }
    }
}
</style>