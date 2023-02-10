<template>
    <div class="navContainer" @click="toggleActive($event)" ref="items">
        <div @click="toggleRouter($event)" class="item active"><i class="iconfont icon-home-fill"></i><span>首页</span></div>
        <div @click="toggleRouter($event)" class="item"><i class="iconfont icon-detail"></i><span>详情</span></div>
        <div @click="toggleRouter($event)" class="item"><i class="iconfont icon-my"></i><span>我的</span></div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const instance = getCurrentInstance()
const router = useRouter()
const qiehuanRouter = function (path) {
  router.push({ path: path })
}
const toggleActive = function (event) {
  const text = event.target.innerText
  const doms = instance.refs.items.children
  for (const item of doms) {
    item.classList.remove('active')
    for (let j of item.children) {
      if (j.classList.value !== '') {
        if (j.classList[1].indexOf('-fill') !== -1) {
          let classStr = j.classList[1].slice(0, -5)
          j.classList.remove(j.classList[1])
          j.classList.add(classStr)
        }
      }
    }
    if (item.innerText === text) {
      item.classList.add('active')
      const clStr = item.children[0].classList[1]
      item.children[0].classList.remove(clStr)
      item.children[0].classList.add(`${clStr}-fill`)
    }
  }
}
const toggleRouter = function (event) {
  let text = event.target.innerText
  let map = {
    我的: '/my',
    详情: '/detail',
    首页: '/home'
  }
  qiehuanRouter(map[text])
}
</script>

<style lang="scss" scoped>
.navContainer{
    width: 100%;
    height: 8%;
    background-color: #66B1FF;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    .item{
        height: 50%;
        text-align: center;
    }
    .active{
        color: #0009;
    }
}
</style>
