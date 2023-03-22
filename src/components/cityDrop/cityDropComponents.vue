<template>
    <div class="cityDropContainer">
        <div class="selectContainer" @click="dropSelect"><span>{{ cityValue }}</span><i ref="icon" class="iconfont icon-caret-right"></i></div>
        <div class="drop" v-show="show">
            <van-loading type="spinner" color="#66B1FF" v-show="loadingShow" />
            <template v-if="cityshow">
                <div class="cityContainer" ref="city" @click="selectCity($event)">
                    <p v-for="(item, index) in data" :key="index">{{ item }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
// 城市下拉初次制作
import { getCityList } from '@/api'
import { ref, getCurrentInstance } from 'vue'
import $bus from '@/utils/bus'
const instance = getCurrentInstance()
const cityValue = ref('none')
const show = ref(false)
const loadingShow = ref(true)
const cityshow = ref(false)
let data = []
const dropSelect = () => {
  if (!show.value) {
    instance.refs.icon.classList.remove('icon-caret-right')
    instance.refs.icon.classList.add('icon-caret-down')
  } else {
    instance.refs.icon.classList.remove('icon-caret-down')
    instance.refs.icon.classList.add('icon-caret-right')
  }
  show.value = !show.value
  if (data.length === 0) {
    getCityList().then((res) => {
      loadingShow.value = !loadingShow.value
      cityshow.value = !cityshow.value
      data = res
    })
  }
}
const selectCity = (event) => {
  cityValue.value = event.target.innerText
  show.value = !show.value
  $bus.emit('cityName', cityValue.value)
}
$bus.on('toggleCebianlan', () => {
  cityValue.value = 'none'
})
</script>

<style lang="scss" scoped>
.cityDropContainer{
    width: 30%;
    height: 10%;
    margin-bottom: 5%;
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .selectContainer{
        width: 100%;
        height: 100%;
        border: 1px solid #66B1FF;
        text-align: center;
        position: relative;
        border-radius: 10px;
        i{
            position: absolute;
            right: 10%;
            width: 0;
            height: 0;
        }
    }
    .drop{
        width: 30%;
        height: 25%;
        background-color: #fff;
        color: #fff;
        text-align: center;
        position: absolute;
        z-index: 999;
        overflow-y: scroll;
        top: 21%;
        left: 35%;
        .cityContainer{
            display: flex;
            flex-direction: column;
            p{
                background-color: #66B1FF;
                border-bottom: 1px solid #fff;
                border-top: 1px solid #fff;
                border-radius: 10px;
            }
        }
    }
    .drop::-webkit-scrollbar{
      width: 0px;
    }
}
</style>
