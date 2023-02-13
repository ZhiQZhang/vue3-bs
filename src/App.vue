<template>
    <div class="firstContainer">
        <header-components></header-components>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { provide } from 'vue'
import * as echarts from 'echarts'
import headerComponents from './components/header/headerComponents.vue'
provide('echarts', echarts)
</script>

<style lang="scss">
.firstContainer{
    width: 90%;
    margin: 0 auto;
    .container{
    width: 100%;
    height: 92%;
    background-color: #fff;
    color: #000;
}
}
.van-popup.van-popup--center.van-toast.van-toast--middle.van-toast--loading{
    height: 15% !important;
}
.vbtn{
    width: 30%;
}
</style>
