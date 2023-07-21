<template>
    <div class="tags">
        <ul class="current">
            <li 
                v-for="(tag, index) in tagList" 
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
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import CommonMixins from "@/mixins/mixin";
    @Component({
        computed: {
            
        }
    })
    export default class Tags extends Mixins(CommonMixins) {
        selectdTags: tag[] = [];
        get tagList() {
            return this.$store.state.tagList.tagList;
        }

        

        taggle(tag: tag) {
            const index = this.selectdTags.indexOf(tag)
            if (index > -1) {
                this.selectdTags.splice(index, 1)
            } else {
                this.selectdTags.push(tag)
            }
            this.$emit('update:value', this.selectdTags)
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
    background-color: #fff;
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