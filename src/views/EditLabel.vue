<template>
    <layout-wrapper>
        <nav>
            <SvgIcon name="right" @click.native="goBack"></SvgIcon>
            <span>编辑标签</span>
        </nav>
        <main>
            <div class="item">
                <FromItem 
                    :value="tag.name"
                    @update:value="updateTag"
                    field-name="标签名" 
                    placeholder="请输入标签名"
                ></FromItem>
            </div>
        </main>
        <default-btn @click="deleteTag">删除标签</default-btn>
    </layout-wrapper>
</template>

<script lang="ts">
    import { Vue, Component, Mixins } from 'vue-property-decorator';
    import FromItem from '@/components/Money/FromItem.vue';
    import DefaultBtn from '@/components/DefaultBtn.vue';
    import CommonMixins from "@/mixins/mixin";


    @Component({
        components: {
            FromItem,
            DefaultBtn
        },
    })
    export default class EditLabel extends Mixins(CommonMixins) {
        tag: tag = {
            id: '',
            name: ''
        };
        get tagList() {
            return this.$store.state.tagList.tagList;
        }
        created() {

            const id = this.$route.params.id
            const tag = this.tagList.find((item: tag) => item.id === id)
            if (tag) {
                this.tag = tag
            } else {
                this.$router.replace('/404')
            }
            
        }

        updateTag(name: string) {
            if (this.tag) {
                this.$store.dispatch('updateTag_actions', {id: this.tag.id, name})
            }
        }

        deleteTag() {
            if (this.tag) {
                this.$store.dispatch('removeTag_actions', this.tag.id)
                this.goBack()
            }
        }

        goBack() {
            this.$router.back()
        }
    }
    
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav {
    @extend %outerShadow;
    text-align: center;
    position: relative;
    padding: 12px 25px;
    font-size: 15px;
    color: #333;
    background-color: #fff;
    svg {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%) rotate(-180deg);
    }
}
main {
    .item {
        @extend %outerShadow;
        font-size: 15px;
        color: #555;

    }
}
</style>