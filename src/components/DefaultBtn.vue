<template>
    <div class="createTag-wrapper">
        <button class="createTag" >
            <slot></slot>
        </button>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    @Component
    export default class DefaultBtn extends Vue {

    }


</script>
<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.createTag {
    background-color: $color-highlight;
    color: #fff;
    border-radius: 4px;
    padding: 8px 18px;

    &-wrapper {
        text-align: center;
        padding: 20px;
        margin-top: 10px;
    }
}
</style>