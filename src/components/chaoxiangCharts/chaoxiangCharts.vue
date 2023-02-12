<template>
    <div class="chaoxiangChartsContainer">
        <van-button plain hairline type="primary" round size="large" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div ref="orientationP1" class="orientationP1"></div>
        <div ref="orientationP2" class="orientationP2"></div>
    </div>
</template>

<script setup>
import { getOrientationData } from '@/api'
import { getCurrentInstance, inject } from 'vue'
import $bus from '@/utils/bus'
import 'vant/es/toast/style'
import { showLoadingToast, closeToast } from 'vant'
const echart = inject('echarts')
const instance = getCurrentInstance()
let charts2 = null
const makeCXP1 = (data) => {
  let myChart = echart.init(instance.refs.orientationP1)
  let option = {
    title: {
      text: '所有城市房屋朝向占比'
    },
    series: [
      {
        type: 'pie',
        data: data,
        label: {
          show: false
        }
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      showContent: true,
      triggerOn: 'click',
      backgroundColor: 'white',
      position: ['70%', '40%'],
      extraCssText: 'width: 70.6px; height:50.6px;'
    }
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const makeCXP2 = (city, data) => {
  if (charts2 !== null && charts2 !== '' && charts2 !== undefined) {
    charts2.dispose()
  }
  charts2 = echart.init(instance.refs.orientationP2)
  let option = {
    title: {
      text: city + '市朝向数据占比'
    },
    series: [
      {
        type: 'pie',
        data: data,
        label: {
          show: false
        }
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      showContent: true,
      triggerOn: 'click',
      backgroundColor: 'white',
      position: ['70%', '40%'],
      extraCssText: 'width: 70.6px; height:50.6px;'
    }
  }
  charts2.setOption(option)
  window.addEventListener('resize', () => {
    charts2.resize()
  })
}
const loadingData = () => {
  const toast = showLoadingToast({
    forbidClick: true,
    message: '加载中'
  })
  getOrientationData().then((res) => {
    let data = []
    for (let i of res) {
      let obj = {
        name: i.house_orientation,
        value: i.count
      }
      data.push(obj)
    }
    if (res) {
      makeCXP1(data)
      closeToast()
    }
  })
}
$bus.on('cityCX', (city) => {
  getOrientationData(city).then((res) => {
    let data = []
    for (let i of res.data) {
      let obj = {
        name: i.house_orientation,
        value: i.count
      }
      data.push(obj)
    }
    makeCXP2(res.city_name, data)
  })
})
</script>

<style lang="scss" scoped>
.chaoxiangChartsContainer{
    width: 100%;
    height: 100%;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .orientationP1{
        width: 200px;
        height: 250px;
    }
    .orientationP2{
        width: 200px;
        height: 250px;
    }
}
</style>
