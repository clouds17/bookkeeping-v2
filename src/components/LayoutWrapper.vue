<template>
    <div class="nav-wrapper">
        <div class="content">
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
        }
    }
</script>

<style lang="scss" scoped>
.nav-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content {
    border: 1px solid skyblue;
    overflow: auto;
    flex-grow: 1;
}
</style>