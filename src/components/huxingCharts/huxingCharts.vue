<template>
    <div class="huxingChartsContainer">
        <van-button plain hairline type="primary" round size="large" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div class="huxingp1" ref="huxingp1"></div>
        <div class="huxingp2" ref="huxingp2"></div>
    </div>
</template>

<script setup>
import { getCurrentInstance, inject } from 'vue'
import { getHuxingData } from '@/api'
import $bus from '@/utils/bus'
import 'vant/es/toast/style'
import { showLoadingToast, closeToast } from 'vant'
const cebianShow = inject('cebianShow')
const instance = getCurrentInstance()
const chart = inject('echarts')
let charts2 = null
const makeHuxingP1 = (data) => {
  let myChart = chart.init(instance.refs.huxingp1)
  let option = {
    title: {
      text: '各户型数量占比'
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
      position: ['90%', '40%'],
      extraCssText: 'width: 111.6px; height:51.6px;'
    }
  }
  myChart.setOption(option)
}
const makeHuxingP2 = (city, tagArr, dataArr) => {
  if (charts2 !== null && charts2 !== '' && charts2 !== undefined) {
    charts2.dispose()
  }
  charts2 = chart.init(instance.refs.huxingp2)
  let option = {
    title: {
      text: city + '市各户型数量'
    },
    xAxis: {},
    yAxis: {
      data: tagArr,
      axisLabel: {
        inteval: 0,
        rotate: -60
      }
    },
    series: [
      {
        type: 'bar',
        data: dataArr,
        label: {
          position: 'right',
          show: true
        }
      }
    ]
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
  getHuxingData().then((res) => {
    let data = []
    for (let i of res) {
      let obj = {
        name: i.huxing,
        value: i.count
      }
      data.push(obj)
    }
    if (res) {
      makeHuxingP1(data)
      closeToast()
    }
  })
}
$bus.on('cityHuxing', (cityName) => {
  getHuxingData(cityName).then((res) => {
    let tagArr = []
    let dataArr = []
    for (let i of res.data) {
      tagArr.push(i.huxing)
      dataArr.push(i.count)
    }
    makeHuxingP2(res.city_name, tagArr, dataArr)
  })
})
</script>

<style lang="scss" scoped>
.huxingChartsContainer{
    width: 100%;
    height: 100%;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .huxingp1{
        width: 200px;
        height: 250px;
    }
    .huxingp2{
        width: 600px;
        height: 100%;
    }
}
</style>
