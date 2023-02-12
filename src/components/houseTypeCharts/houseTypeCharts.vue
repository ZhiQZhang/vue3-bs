<template>
    <div class="houseTypeChartsContainer">
        <van-button plain hairline type="primary" round size="large" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div class="houseTypeP1" ref="houseTypeP1"></div>
        <div class="houseTypeP2" ref="houseTypeP2"></div>
    </div>
</template>

<script setup>
import { getTypeData } from '@/api'
import { inject, getCurrentInstance } from 'vue'
import $bus from '@/utils/bus'
import 'vant/es/toast/style'
import { closeToast, showLoadingToast } from 'vant'
const instance = getCurrentInstance()
const chart = inject('echarts')
let charts2 = null
const makeHTP1 = (tagArr, dataArr) => {
  let myChart = chart.init(instance.refs.houseTypeP1)
  let option = {
    title: {
      text: '各租房类型数量占比'
    },
    xAxis: {},
    yAxis: {
      data: tagArr,
      axisLabel: {
        interval: 0,
        rotate: -25
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
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const makeHTP2 = (city, data) => {
  if (charts2 !== null && charts2 !== '' && charts2 !== undefined) {
    charts2.dispose()
  }
  charts2 = chart.init(instance.refs.houseTypeP2)
  let option = {
    title: {
      text: city + '市住房类型占比'
    },
    series: [
      {
        roseType: 'area',
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
      position: ['70%', '20%'],
      extraCssText: 'width: 111.6px; height:51.6px;'
    }
  }
  charts2.setOption(option)
  window.addEventListener('resize', () => {
    charts2.resize()
  })
}
const loadingData = () => {
  showLoadingToast({
    message: '加载中',
    forbidClick: true
  })
  getTypeData().then((res) => {
    let tagArr = []
    let dataArr = []
    for (let i of res) {
      tagArr.push(i.houseType)
      dataArr.push(i.count)
    }
    if (res) {
      makeHTP1(tagArr, dataArr)
      closeToast()
    }
  })
}
$bus.on('cityHouseType', (cityName) => {
  getTypeData(cityName).then((res) => {
    let dataArr = []
    for (let i of res.data) {
      let obj = {
        name: i.houseType,
        value: i.count
      }
      dataArr.push(obj)
    }
    makeHTP2(res.city_name, dataArr)
  })
})
</script>

<style lang="scss" scoped>
.houseTypeChartsContainer{
    width: 100%;
    height: 100%;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .houseTypeP1{
        width: 300px;
        height: 250px;
    }
    .houseTypeP2{
        width: 200px;
        height: 200px;
    }
}
</style>
