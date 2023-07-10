<template>
    <div >
        <p class="not-found">当前页面不存在，请检查网址是否正确</p>
        <router-link to="/" class="backHome">返回首页</router-link>
    </div>
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style lang="scss" scoped>
.not-found {
    margin-top: 150px;
    font-size: 38px;
    text-align: center;
    color: #cdcdcd;
}
.backHome {
    font-size: 20px;
    text-align: center;
    margin-top: 30px;
    color: #568fde;
    text-decoration: none;
}
</style>