<template>
    <div class="floorChartsContainer">
        <van-button class="vbtn" plain hairline type="primary" round size="normal" @click="loadingData"><div class="btnContent">获取数据</div></van-button>
        <div class="floorP1" ref="floorP1"></div>
        <div class="floorP2" ref="floorP2"></div>
    </div>
</template>

<script setup>
import { getFloorData } from '@/api'
import { getCurrentInstance, inject } from 'vue'
import 'vant/es/toast/style'
import { showLoadingToast, closeToast } from 'vant'
import $bus from '@/utils/bus'
const instance = getCurrentInstance()
const chart = inject('echarts')
const makeFloorP1 = (tagArr, dataArr) => {
  let myChart = chart.init(instance.refs.floorP1)
  let option = {
    title: {
      text: '各楼层数量对比'
    },
    xAxis: {
      data: tagArr
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: dataArr,
        label: {
          position: 'top',
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        fillerColor: '#66B1FF'
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('reset', () => {
    myChart.resize()
  })
}
const makeFloorP2 = (city, tagArr, dataArr) => {
  let myChart = chart.init(instance.refs.floorP2)
  let option = {
    title: {
      text: city + '市各楼层数量对比'
    },
    xAxis: {
      data: tagArr
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: dataArr,
        label: {
          position: 'top',
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        fillerColor: '#66B1FF'
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('reset', () => {
    myChart.resize()
  })
}
const loadingData = () => {
  getFloorData().then((res) => {
    let tagArr = []
    let dataArr = []
    for (let i of res) {
      tagArr.push(i.house_floor)
      dataArr.push(i.count)
    }
    makeFloorP1(tagArr, dataArr)
  })
}
$bus.on('cityFloor', (cityName) => {
  getFloorData(cityName).then((res) => {
    let tagArr = []
    let dataArr = []
    for (let i of res.data) {
      tagArr.push(i.house_floor)
      dataArr.push(i.count)
    }
    makeFloorP2(res.city_name, tagArr, dataArr)
  })
})
</script>

<style lang="scss" scoped>
.floorChartsContainer{
    width: 100%;
    height: 100%;
    text-align: center;
    .btnContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .floorP1{
        width: 600px;
        height: 300px;
        margin: 0 auto;
    }
    .floorP2{
        width: 600px;
        height: 300px;
        margin: 0 auto;
    }
}
</style>
