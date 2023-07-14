<template>
    <div class="tags">
        <ul class="current">
            <li 
                v-for="(tag, index) in dataSource" 
                :key="index"
                :class="selectdTags.includes(tag) && 'selectd'"
                @click="taggle(tag)"
                >{{ tag }}</li>
        </ul>
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    @Component
    export default class Tags extends Vue {
        // readonly: 只读
        @Prop(Array) readonly dataSource: string[] | undefined;
        selectdTags: string[] = [];

        taggle(tag: string) {
            const index = this.selectdTags.indexOf(tag)
            if (index > -1) {
                this.selectdTags.splice(index, 1)
            } else {
                this.selectdTags.push(tag)
            }
        }

        createTag() {
           const name =  window.prompt('请输入标签名');
           if (name === '') {
             window.alert('标签名不能为空');
           } else if (this.dataSource) {
                if (this.dataSource.includes(name as string)) {
                    window.alert('当前已有此标签');
                } else {
                    this.$emit('update:dataSource', [...this.dataSource, name])
                }
           }
        }
    }
</script>

<style lang="scss" scoped>
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
                background: #318FEF;
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