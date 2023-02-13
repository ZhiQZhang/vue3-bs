<template>
    <div class="trafficChartsContainer">
        <van-button class="vbtn" plain hairline type="primary" round size="normal" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div ref="trafficP1" class="trafficP1"></div>
        <div ref="trafficP2" class="trafficP2"></div>
    </div>
</template>

<script setup>
import $bus from '@/utils/bus'
import { getCurrentInstance, inject } from 'vue'
import { getTrafficData } from '@/api'
const chart = inject('echarts')
const instance = getCurrentInstance()
let charts2 = null
const maketrafficP1 = (data) => {
  let myChart = chart.init(instance.refs.trafficP1)
  let option = {
    title: {
      text: '房屋距离地铁距离占比',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        data: data
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      showContent: true,
      triggerOn: 'click',
      backgroundColor: 'white',
      position: ['70%', '40%'],
      extraCssText: 'width: 100.6px; height:50.6px;'
    },
    legend: {
      type: 'scroll',
      show: true,
      orient: 'vertical',
      right: '1%'
    }
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const maketrafficP2 = (cityName, data) => {
  if (charts2 !== null && charts2 !== '' && charts2 !== undefined) {
    charts2.dispose()
  }
  charts2 = chart.init(instance.refs.trafficP2)
  let option = {
    title: {
      text: cityName + '市房屋距离地铁距离占比',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        data: data
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      showContent: true,
      triggerOn: 'click',
      backgroundColor: 'white',
      position: ['70%', '40%'],
      extraCssText: 'width: 100.6px; height:50.6px;'
    },
    legend: {
      type: 'scroll',
      show: true,
      orient: 'vertical',
      right: '1%'
    }
  }
  charts2.setOption(option)
  window.addEventListener('resize', () => {
    charts2.resize()
  })
}
const loadingData = () => {
  getTrafficData().then((res) => {
    let data = []
    for (let i in res) {
      let obj = {
        name: i,
        value: res[i]
      }
      data.push(obj)
    }
    maketrafficP1(data)
  })
}
$bus.on('cityTraffic', (city) => {
  getTrafficData(city).then((res) => {
    let data = []
    for (let i in res.data) {
      let obj = {
        name: i,
        value: res.data[i]
      }
      data.push(obj)
    }
    maketrafficP2(res.city_name, data)
  })
})
</script>

<style lang="scss" scoped>
.trafficChartsContainer{
    width: 100%;
    height: 100%;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .trafficP1{
        width: 600px;
        height: 400px;
        margin: 0 auto;
    }
    .trafficP2{
        width: 600px;
        height: 400px;
        margin: 0 auto;
    }
}
</style>
