<template>
    <div class="layout-wrapper">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    import Nav from '@/components/Nav.vue'
    export default {
        components: {
            Nav
        },
        props: ['classPrefix']
    }
</script>

<style lang="scss" scoped>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content {
    // border: 1px solid skyblue;
    overflow: auto;
    flex-grow: 1;
}
</style>