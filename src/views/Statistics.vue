<template>
    <layout-wrapper>
        <Tabs 
            :active-tab.sync="navTab" 
            classPrefix="nav"
            :data-source="navData"
        ></Tabs>
        <Tabs 
            :active-tab.sync="timeTab" 
            classPrefix="time"
            :data-source="timeData"
        ></Tabs>
    </layout-wrapper>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Tabs from '../components/Tabs.vue';
    @Component({
        components: {
            Tabs
        }
    })
    export default class Statistics extends Vue {
        navTab = "-";
        navData = [
            { text: '支出', type: '-' },
            { text: '手入', type: '+' }
        ]
        timeTab = "day";
        timeData = [
            { text: '按天', type: 'day' },
            { text: '按周', type: 'week' },
            { text: '按月', type: 'month' }
        ]
    }
</script>

<style lang="scss" scoped>
::v-deep .nav-item {
    background-color: #fff;
    height: 45px !important;
    &.selected {
        background-color: #2579cfba;
        color: #fff;
        &::after {
            display: none;
        }
    }
}
::v-deep .time-item {
    background-color: #eee;
    height: 38px !important;
    font-size: 16px;
    &.selected {
        background-color: #98c2ed9e;
        color: #fff;
        &::after {
            display: none;
        }
    }
}
</style>