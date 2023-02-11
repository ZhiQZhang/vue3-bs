<template>
    <div class="priceContainer">
        <div ref="p1" class="p1"></div>
        <div ref="p2" class="p2"></div>
    </div>
</template>

<script setup>
import { onMounted, inject, getCurrentInstance, computed } from 'vue'
import { getAllAvgPrice, getMaxPrice } from '@/api'
import $bus from '@/utils/bus'
const chart = inject('echarts')
const instance = getCurrentInstance()
let chartData1 = ''
let chartData2 = ''
const makeP1 = () => {
  let charts = chart.init(instance.refs.p1)
  let option = {
    title: {
      text: '各城市平均价格'
    },
    xAxis: {
      data: data.value[0]
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: data.value[1],
        label: {
          position: 'top',
          show: true
        }
      }
    ]
  }
  charts.setOption(option)
  window.addEventListener('resize', () => {
    charts.resize()
  })
}
const makeP2 = () => {
  let charts = chart.init(instance.refs.p2)
  let option = {
    title: {
      text: '各城市最高价格'
    },
    xAxis: {
      data: data2.value[0]
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: data2.value[1],
        label: {
          position: 'top',
          show: true
        }
      }
    ]
  }
  charts.setOption(option)
  window.addEventListener('resize', () => {
    charts.resize()
  })
}
const getAvg = () => {
  getAllAvgPrice().then((res) => {
    chartData1 = res.data
    makeP1()
    getMax()
  })
}
const getMax = () => {
  getMaxPrice().then((res) => {
    chartData2 = res
    makeP2()
  })
}
const data = computed(() => {
  let arr = []
  let cityArr = []
  let avgPrice = []
  for (let i of chartData1) {
    cityArr.push(i.name)
    avgPrice.push(parseInt(i.avg_price))
  }
  arr[0] = cityArr
  arr[1] = avgPrice
  return arr
})
const data2 = computed(() => {
  let arr = []
  let cityArr = []
  let maxprice = []
  for (let i of chartData2) {
    cityArr.push(i.cityname)
    maxprice.push(i.maxPrice)
  }
  arr[0] = cityArr
  arr[1] = maxprice
  return arr
})
$bus.on('city', (city) => {
  // 2.11 23:35
  console.log(city)
})
onMounted(() => {
  getAvg()
})
</script>

<style lang="scss" scoped>
.priceContainer{
    width: 100%;
    height: 100%;
    .p1{
        width: 600px;
        height: 200px;
    }
    .p2{
        width: 600px;
        height: 200px;
    }
}
</style>
