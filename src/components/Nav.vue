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
nav {
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
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
            color: #318FEF;
            svg {
                color: #318FEF;
            }
        }
    }
}
</style>