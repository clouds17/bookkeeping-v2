<template>
    <layout-wrapper>
        <Tabs 
            :active-tab.sync="navTab" 
            classPrefix="nav"
            :data-source="navData"
        ></Tabs>
        <!-- <Tabs 
            :active-tab.sync="timeTab" 
            classPrefix="time"
            :data-source="timeData"
        ></Tabs> -->
        <div>
            <ol v-if="resultList.length !== 0">
                <li v-for="(group, index) in resultList" :key="index">
                    <h3 class="title"><p>{{ formatDate(group.title) }}</p><span>￥{{ group.total }}</span></h3>
                    <ol>
                        <li class="record" 
                            v-for="(item, index2) in group.items" 
                            :key="index2"
                        >
                            <p><span class="tags">{{ tagString(item.tags) }}</span> <span class="notes">{{ item.notes }}</span></p>
                            <p><span class="amount">{{ navTab }}{{ item.amount }}</span></p>
                            
                        </li>
                    </ol>
                </li>
            </ol>
            <div v-else>
                <p class="not-found">{{ noRecordedText }}</p>
            </div>
        </div>
    </layout-wrapper>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Tabs from '../components/Tabs.vue';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import isToday from 'dayjs/plugin/isToday';
    import isoWeek from 'dayjs/plugin/isoWeek';
    import zhCn from 'dayjs/locale/zh-cn';
    import clone from '@/lib/clone';
    dayjs.extend(relativeTime)
    dayjs.extend(isToday)
    dayjs.extend(isoWeek)
    dayjs.locale(zhCn)
    window.dayjs = dayjs


    @Component({
        components: {
            Tabs
        }
    })
    export default class Statistics extends Vue {
        navTab = "-";
        navData = [
            { text: '支出', type: '-' },
            { text: '收入', type: '+' }
        ]
        timeTab = "day";
        timeData = [
            { text: '按天', type: 'day' },
            { text: '按周', type: 'week' },
            { text: '按月', type: 'month' }
        ]
        get noRecordedText() {
            return this.navTab === '-' ? '当前还没有支出记录' : '当前还没有收入记录'
        }

        get recordList() {
            return this.$store.state.recordList.recordList;
        }

        get resultList() {
            const { recordList } = this
            if (recordList.length === 0) { return []; }

            type HashValue = {
                title: string,
                items: RecordItem[],
                total?: number
            }
            const newList = clone(recordList)
                .filter((v:RecordItem) => v.type === this.navTab)
                .sort((a:any, b:any) => { return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1;})

            if (newList.length === 0) { return []; }

            const hashTable: HashValue[] = []
            for ( let i = 0; i < newList.length; i++ ) {
                const [date, time] = newList[i].createdAt.split('T')
                const index  = hashTable.findIndex((table:HashValue) => table.title === date)
                if (index !== -1) {
                    hashTable[index].items.push(newList[i])
                } else {
                    hashTable.push({
                        title: date,
                        items: [newList[i]]
                    })
                }
                
            }
            console.log('hashTable', hashTable)
            hashTable.forEach(group => {
                group.total = group.items.reduce((sum, item) => sum + (item.amount - 0), 0)
            })
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

        formatDate(date: string) {
            let type = this.timeTab
            console.log(date, type)

            if (type === 'day') {
                if (dayjs(date).isToday()) {
                    return '今天'
                } else if (dayjs(date).add(1, 'day').isToday()) {
                    return '昨天'
                } else if (dayjs(date).add(2, 'day').isToday()) {
                    return '前天'
                } else {
                    return dayjs().to(dayjs(date));
                }
            } else if (type === 'week') {
                let diffNum = dayjs().isoWeek() - dayjs(date).isoWeek()
                console.log(date, type, diffNum)

                if ( diffNum > 0) {
                    return diffNum + '周前'
                } else {
                    return '这周'
                }
            } else if (type === 'month') {
                let diffYear = new Date().getFullYear() - new Date(date).getFullYear()
                let diffMonth = new Date().getMonth() - new Date(date).getMonth()
                if (diffYear > 0) {
                    if (diffMonth > 0) {
                        return diffYear * 12 + diffMonth + '个月前'
                    } else {
                        return diffYear * 12 + diffMonth + '个月前'
                    }
                } else {
                    if (diffMonth > 0) {
                        return diffMonth + '个月前'
                    } else {
                        return '这个月'
                    }
                }
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
    > span {
        font-size: 18px;
        font-weight: bold;
        color: #0758abad;
    }
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

.not-found {
    margin-top: 150px;
    font-size: 30px;
    text-align: center;
    color: #cdcdcd;
}
</style>