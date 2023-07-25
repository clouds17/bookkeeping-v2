<template>
    <div class="tags">
        <div class="current">
            <section v-for="(item, index) in tagList" :key="index">
                <p>{{ item.classify }}</p>
                <ul >
                    <li 
                        v-for="(tag, index2) in item.tags" 
                        :key="index2"
                        :class="selectdTags.includes(tag) && 'selectd'"
                        @click="taggle(tag)"
                        >
                        <img :src="tag.pic" alt="">
                        <p>{{ tag.name }}</p>
                    </li>
                </ul>
            </section>
        </div>
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Mixins, Vue, Emit} from 'vue-property-decorator';
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
        get img_url() {
            return this.$store.state.tagList.img_url;
        }
        created() {
            console.log('img_url', Vue.prototype.$base_img)
            Vue.prototype.$bus.$on('clearSlectd', () => {
                console.log('执行了这里')
                this.selectdTags = []
            })
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
        overflow: auto;
        flex-direction: column;
        > section {
            margin-bottom: 15px;
            > ul {
                display: flex;
                flex-wrap: wrap;
                > li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    padding: 8px 15px;
                    border-radius: 15px;
                    
                    > img {
                        max-height: 35px;
                        max-width: 35px;
                    }
                    > p {
                        font-size: 13px;
                        margin-top: 2px;
                    }

                    &.selectd {
                        background: $color-highlight;
                        color: #fff;
                    }
                }
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