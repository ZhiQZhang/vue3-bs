<template>
  <div class="header_container">
    <span>{{ biaoqianName }}</span>
    <div>
        <router-link class="routerTo" to="/login">登录</router-link>
        <router-link class="routerTo" to="/zc">注册</router-link>
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
  text-align: center;
  display: flex;
  align-items: center;
  span{
    width: 50%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    justify-content: flex-end;
  }
  div{
    width: 50%;
    display: inline-flex;
    .routerTo:first-of-type{
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 20px;
      font-weight: bold;
    }
    .routerTo:last-of-type{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
