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

        <div>
            <ol>
                <li v-for="(group, index) in resultList" :key="index">
                    <h3 class="title">{{ group.title }}</h3>
                    <ol>
                        <li class="record" v-for="(item, index2) in group.items" :key="index2">
                            <p><span class="tags">{{ tagString(item.tags) }}</span> <span class="notes">{{ item.notes }}</span></p>
                            <p><span>￥</span><span class="amount">{{ item.amount }}</span></p>
                            
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
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

        get recordList() {
            return this.$store.state.recordList.recordList;
        }

        get resultList() {
            const { recordList } = this
            type HashValue = {
                title: string,
                items: RecordItem[]
            }

            const hashTable: {[key: string]: HashValue} = {}
            for (let i = 0; i < recordList.length; i++) {
                const [data, time] = recordList[i].createdAt.split('T');
                hashTable[data] = hashTable[data] || {title: data, items: []}
                hashTable[data].items.push(recordList[i])
            }
            return hashTable;
        }

        created() {
            this.$store.commit('fetchRecord')
        }

        tagString(tag: {id: string, name: string}[]) {
            if (tag.length === 0) {
                return '未知'
            } else {
                return tag.map(item => item.name).join()
            }
        }

    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper';
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
%item {
    font-size: 15px;
    color: #333;
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: monospace;
}

.title {
    @extend %item;
}
.record {
    background-color: #fff;
    @extend %outerShadow;
    @extend %item;
    overflow: hidden;

    > p {
        &:first-child {
            overflow: hidden;
            display: flex;
        }
        &:last-child {
            flex-shrink: 0;
        }
        .tags {
            max-width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-shrink: 0;
        }
        .notes {
            font-size: 13px;
            color: #707070;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 15px;
            padding-right: 25px;
        }
        .amount {
            font-size: 16px;
        }
    }

    
}
</style>