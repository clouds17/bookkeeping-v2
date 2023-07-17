<template>
    <layout-wrapper>
        <nav>
            <SvgIcon name="right"></SvgIcon>
            <span>编辑标签</span>
        </nav>
        <main>
            <div class="item">
                <notes 
                    field-name="标签名" 
                    placeholder="请输入标签名"
                    @update:value = "onUpdateNotes"
                ></notes>
            </div>
        </main>
    </layout-wrapper>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import Notes from '@/components/Money/Notes.vue';
    import tagListModel from '@/models/tagListModel';
    @Component({
        components: {
            Notes
        }
    })
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id
            tagListModel.fetch()
            const tags = tagListModel.data;
            const tag = tags.find(item => item.id === id)
            if (tag) {
                console.log(tag);
            } else {
                this.$router.replace('/404')
            }
            
        }

        onUpdateNotes(value: string) {
            console.log(value)
        }
    }
    
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav {
    @extend %outerShadow;
    text-align: center;
    position: relative;
    padding: 10px 25px;
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