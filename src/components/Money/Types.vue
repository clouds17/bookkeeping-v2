<template>
    <div>
        <ul class="types">
            <li class="selected">支出</li>
            <li>收入</li>
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.types {
    background-color: #c4c4c4;
    display: flex;
    align-items: center;
    font-size: 18px;
    > li {
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &:nth-of-type(1)::before {
            content: "";
            position: absolute;
            width: 1px;
            right: 0;
            top: 15px;
            bottom: 15px;
            background: #a09b9b;
            z-index: 9;
        }

        &.selected::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 10px;
            right: 10px;
            height: 2px;
            background-color: #333;
        }
    }
}
</style>