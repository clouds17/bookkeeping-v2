<template>
    <layout-wrapper>
        <!--TODO-->
        <div class="tags">
            <section v-for="(item, index) in tagList" :key="index">
                <p>{{ item.classify }}</p>
                <ul >
                    <li 
                        v-for="(tag, index2) in item.tags" 
                        :key="index2"
                        >
                        <router-link class="tag" 
                            :to="`/labels/edit/${tag.id}`"
                        >
                            <p>
                                <img :src="tag.pic" alt="">
                                <span>{{ tag.name }}</span>
                            </p>
                            <SvgIcon name="right"></SvgIcon>
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
        <default-btn @click="createTag">新建标签</default-btn>
        
    </layout-wrapper>
</template>

<script lang="ts">
    import { Vue, Component, Mixins } from 'vue-property-decorator';
    import DefaultBtn from '@/components/DefaultBtn.vue';
    import CommonMixins from "@/mixins/mixin";

    @Component({
        components: { 
            DefaultBtn
        },
    })
   
    export default class Labels extends Mixins(CommonMixins) {

        get tagList() {
            return this.$store.state.tagList.tagList;
        }
        

    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

section {
    padding: 20px 0 10px;
    > p {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
    }
}
.tags {
    font-size: 16px;
    padding-left: 16px;
    max-height: calc(100% - 83px);
    overflow: auto;
    ul {
        .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            > p {
                display: flex;
                align-items: center;
                overflow: hidden;
                > img {
                    max-width: 30px;
                    max-height: 30px;
                    flex-shrink: 0;
                }
                > span {
                    font-size: 14px;
                    padding-left: 10px;
                    flex: 1;
                    display: inline-block;
                }
            }
            svg {
                color: #707070;
                margin-right: 16px;
            }
        }
    }
    
}

</style>