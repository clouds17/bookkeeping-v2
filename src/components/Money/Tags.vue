<template>
    <div class="tags">
        <ul class="current">
            <li 
                v-for="(tag, index) in dataSource" 
                :key="index"
                :class="selectdTags.includes(tag) && 'selectd'"
                @click="taggle(tag)"
                >{{ tag.name }}</li>
        </ul>
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';
    @Component
    export default class Tags extends Vue {
        dataSource = window.tagList;
        selectdTags: tag[] = [];

        taggle(tag: tag) {
            const index = this.selectdTags.indexOf(tag)
            if (index > -1) {
                this.selectdTags.splice(index, 1)
            } else {
                this.selectdTags.push(tag)
            }
            this.$emit('update:value', this.selectdTags)
        }

        createTag() {
            const name = window.prompt('请输入标签名');
            if (name === null) return
            if (name === '') {
             window.alert('标签名不能为空');
            } else {
                tagListModel.create(name!);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    > .current {
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        > li {
            background: #edebeb;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: ($h / 2);
            padding: 0 15px;
            margin-right: 10px;
            margin-bottom: 10px;

            &.selectd {
                background: $color-highlight;
                color: #fff;
            }
        }
    }

    > .new {
        padding-top: 8px;

        button {
            background-color: transparent;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px 2px;
        }
    }
}
</style>