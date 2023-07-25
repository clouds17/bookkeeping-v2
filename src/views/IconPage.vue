<template>
    <div class="icon-page">
        <nav>
            <SvgIcon name="right" @click.native="goBack"></SvgIcon>
            <span>编辑标签</span>
        </nav>
        <ul class="icon-box">
            <li 
                v-for="(item, index) in iconList" 
                :key="index"
                @click="selectIcon(item.src)"
            >
                <img :src="item.src" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
    import { Vue, Component } from 'vue-property-decorator';
    @Component
    export default class IconPage extends Vue {

        get iconList () {
            return this.$store.state.tagList.iconList
        }
        selectIcon(src) {
            const id = this.$route.query.id ? this.$route.query.id : 0
            this.$router.replace({
                path: '/labels/edit/'+ id,
                query: {
                    pic: src
                }
            })
            // Vue.prototype.$bus.$emit('selectIcon', src)
            // this.goBack()
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
.icon-page {
    display: flex;
    flex-direction: column;
    .icon-box {
        overflow: auto;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 16px;

        li {
            width: 20%;
            text-align: center;
            margin-bottom: 15px;

            img {
                max-width: 35px;
                max-height: 35px;
            }
        }
    }
}
</style>