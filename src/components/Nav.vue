<template>
    <nav>
        <router-link to="/labels" class="item" active-class="selected">
            <svg-icon name="labels" />
            <p>标签</p>
        </router-link>
        <router-link to="/money" class="item" active-class="selected">
            <svg-icon name="money" />
            <p>记一笔</p>
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <svg-icon name="statistics" />
            <p>统计</p>
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    > .item {
        padding: 8px 0 4px;
        width: 33.3333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 12px;
        svg {
            width: 20px;
            height: 20px;
            color: #707070;
        }
        p { margin: 4px 0; }
        &.selected {
            color: $color-highlight;
            svg {
                color: $color-highlight;
            }
        }
    }
}
</style>