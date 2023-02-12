<template>
    <header-components></header-components>
    <div class="container">
        <router-view></router-view>
    </div>
    <bottom-nav></bottom-nav>
</template>

<script setup>
import { provide } from 'vue'
import * as echarts from 'echarts'
import headerComponents from './components/header/headerComponents.vue'
import bottomNav from './components/bottom/bottomNav.vue'
provide('echarts', echarts)
</script>

<style lang="scss">
.container{
    width: 100%;
    height: 84%;
    background-color: #fff;
    color: #000;
}
.van-popup.van-popup--center.van-toast.van-toast--middle.van-toast--loading{
    height: 15% !important;
}
</style>
