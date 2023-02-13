<template>
    <div class="squareChartsContainer">
        <van-button class="vbtn" plain hairline type="primary" round size="normal" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div class="squareP1" ref="squareP1"></div>
        <div class="squareP2" ref="squareP2"></div>
    </div>
</template>

<script setup>
import { getSquareData } from '@/api'
import { getCurrentInstance, inject } from 'vue'
import $bus from '@/utils/bus'
const chart = inject('echarts')
const instance = getCurrentInstance()
let charts2 = null
const makeSquareP1 = (data) => {
  let myChart = chart.init(instance.refs.squareP1)
  let option = {
    title: {
      text: '房屋面积占比',
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
const makeSquareP2 = (cityName, data) => {
  if (charts2 !== null && charts2 !== '' && charts2 !== undefined) {
    charts2.dispose()
  }
  charts2 = chart.init(instance.refs.squareP2)
  let option = {
    title: {
      text: cityName + '市房屋面积占比',
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
  getSquareData().then((res) => {
    let data = []
    for (let i in res) {
      let obj = {
        name: i,
        value: res[i]
      }
      data.push(obj)
    }
    makeSquareP1(data)
  })
}
$bus.on('citySquare', (city) => {
  getSquareData(city).then((res) => {
    let data = []
    for (let i in res.data) {
      let obj = {
        name: i,
        value: res.data[i]
      }
      data.push(obj)
    }
    makeSquareP2(res.city_name, data)
  })
})
</script>

<style lang="scss" scoped>
.squareChartsContainer{
    width: 100%;
    height: 100%;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .squareP1{
        width: 600px;
        height: 400px;
        margin: 0 auto;
    }
    .squareP2{
        width: 600px;
        height: 400px;
        margin: 0 auto;
    }
}
</style>
