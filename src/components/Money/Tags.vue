<template>
    <div class="tags">
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
        <div class="new">
            <button>新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style lang="scss" scoped>
.tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    > .current {
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        > li {
            background: #edebeb;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: ($h / 2);
            padding: 0 15px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }

    > .new {
        padding-top: 8px;

        button {
            background-color: transparent;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px 2px;
        }
    }
}
</style>