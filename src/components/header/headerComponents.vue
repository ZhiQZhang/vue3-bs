<template>
  <div class="header_container">
    <div class="biaoqian">
      <span :style="{ visibility: (headerBtnShown ? 'visible' : 'hidden')}" class="iconfont icon-xiangzuo"></span>
      <span>{{ biaoqianName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const first = ref('首页')
const detail = ref('详情')
const my = ref('我的')
const headerBtnShown = ref(false)
const biaoqianName = first
</script>

<style lang="scss">
.header_container{
  width: 100%;
  height: 8%;
  background-color: #66B1FF;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .biaoqian{
    width: 100%;
    height: 50%;
    display: flex;
  }
}
</style>
