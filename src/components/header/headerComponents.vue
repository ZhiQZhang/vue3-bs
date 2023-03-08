<template>
  <div class="header_container">
    <div class="biaoqian">
      <span :style="{ visibility: (headerBtnShown ? 'visible' : 'hidden')}" class="iconfont icon-xiangzuo"></span>
      <span>{{ biaoqianName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const headerBtnShown = ref(false)
let biaoqianName = ref('')
watch(() => router.currentRoute.value.path, (toPath) => {
  if (toPath === '/detail') {
    biaoqianName.value = '详情'
  }
  if (toPath === '/login') {
    biaoqianName.value = '登录'
  }
  if (toPath === '/zc') {
    biaoqianName.value = '注册'
  }
}, { immediate: true, deep: true })
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
  border-bottom: 1px solid #fff;
  .biaoqian{
    width: 100%;
    height: 50%;
    display: flex;
    span{
      color: #fff;
      font-size: large;
      font-weight: bold;
    }
  }
}
</style>
