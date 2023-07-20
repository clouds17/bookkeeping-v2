<template>
    <layout-wrapper>
        <div class="tags">
            <router-link class="tag" 
                v-for="(tag, index) in tagList" 
                :key="index"
                :to="`/labels/edit/${tag.id}`"
            >
                <span>{{ tag.name }}</span>
                <SvgIcon name="right"></SvgIcon>
            </router-link>
        </div>
        <default-btn @click="createTag">新建标签</default-btn>
        
    </layout-wrapper>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import DefaultBtn from '@/components/DefaultBtn.vue';
    import tagListModel from '@/models/tagListModel';
  

    @Component({
        components: { 
            DefaultBtn
        }
    })
   
    export default class Labels extends Vue {
        tagList = window.tagList;
        

        createTag() {
            const name = window.prompt('请输入标签名');
            if (name === null) return
            if (name === '') {
             window.alert('标签名不能为空');
            } else {
                window.createTag(name)
            }
        }

    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tags {
    background-color: #fff;
    font-size: 16px;
    padding-left: 16px;
    max-height: calc(100% - 83px);
    overflow: auto;
    > .tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;

        svg {
            color: #707070;
            margin-right: 16px;
        }
    }
}

</style>