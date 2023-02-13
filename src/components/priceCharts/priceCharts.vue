<template>
    <div class="priceContainer">
        <div ref="p1" class="p1"></div>
        <div ref="p2" class="p2"></div>
        <div ref="p3" class="p3"></div>
        <div ref="p4" class="p4"></div>
    </div>
</template>

<script setup>
import { onMounted, inject, getCurrentInstance, computed } from 'vue'
import { getAllAvgPrice, getMaxPrice, getCityPrice } from '@/api'
import $bus from '@/utils/bus'
const chart = inject('echarts')
const instance = getCurrentInstance()
let chartData1 = ''
let chartData2 = ''
let charts = null
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
const makeP3 = (res) => {
  let pieData = []
  for (let i in res.qujian_data) {
    let obj = {
      name: i,
      value: res.qujian_data[i]
    }
    pieData.push(obj)
  }
  if (charts !== null && charts !== '' && charts !== undefined) {
    charts.dispose()
  }
  charts = chart.init(instance.refs.p3)
  let option = {
    title: {
      text: res.cityname + '市价格区间数据'
    },
    series: [
      {
        type: 'pie',
        data: pieData,
        label: {
          position: 'center',
          show: false
        },
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        }
      }
    ]
  }
  charts.setOption(option)
  window.addEventListener('resize', () => {
    charts.resize()
  })
}
const makeP4 = () => {
  // 2.14 0：26准备做实时排序柱状图
  let cityArr = ['上海', '北京', '南京', '南昌', '天津', '广州', '成都', '杭州', '武汉', '深圳', '重庆']
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
const cityPrice = (city) => {
  getCityPrice(city).then((res) => {
    makeP3(res)
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
$bus.on('cityPrice', (city) => {
  cityPrice(city)
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
        margin: 0 auto;
    }
    .p2{
        width: 600px;
        height: 200px;
        margin: 0 auto;
    }
    .p3{
        width: 250px;
        height: 350px;
        margin: 0 auto;
    }
    .p4{
      width: 800px;
      height: 400px;
      margin: 0 auto;
    }
}
</style>
