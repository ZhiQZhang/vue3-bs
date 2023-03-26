<template>
    <div class="priceContainer">
        <div ref="p1" class="p1"></div>
        <div ref="p2" class="p2"></div>
        <div @click="makeP4" ref="p4" class="p4"></div>
        <div ref="p3" class="p3"></div>
    </div>
</template>

<script setup>
import { onMounted, inject, getCurrentInstance, computed } from 'vue'
import { getAllAvgPrice, getMaxPrice, getCityPrice, getCityList } from '@/api'
import $bus from '@/utils/bus'
const chart = inject('echarts')
const instance = getCurrentInstance()
let chartData1 = ''
let chartData2 = ''
let charts = null
let charts4 = null
// 更新数据
const updateData = (city, tmpArr, d) => {
  let newData = []
  for (let i = 0; i < city.length; i++) {
    newData.push({
      name: city[i],
      value: Math.floor(Math.random() * tmpArr[i])
    })
  }
  newData.sort((a, b) => b.value - a.value)
  return newData
}
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
const makeP4 = (city) => {
  if (charts4 !== null && charts4 !== '' && charts4 !== undefined) {
    charts4.dispose()
  }
  charts4 = chart.init(instance.refs.p4)
  const tmpArr = [7000, 8000, 4000, 1500, 4000, 6000, 3000, 7000, 4000, 6000, 3000]
  // 动态排序初始数据
  let cityObjArr = chartData1.map(item => {
    return JSON.parse(JSON.stringify(item).replace(/avg_price/, 'value'))
  })
  let option = {
    title: {
      text: '平均价格实时动态排序图'
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: city,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 6,
      inverse: true
    },
    series: [{
      type: 'bar',
      data: cityObjArr,
      label: {
        valueAnimation: true,
        position: 'right',
        show: true
      },
      realtimeSort: true,
      silent: true
    }],
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }
  charts4.setOption(option)
  setInterval(function () {
    let dArr = updateData(city, tmpArr)
    charts4.setOption({
      series: [{
        data: dArr
      }]
    })
  }, 3000)
  window.addEventListener('resize', () => {
    charts4.resize()
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
    getCity()
  })
}
// 获取城市并实时排序
const getCity = () => {
  getCityList().then(res => {
    makeP4(res)
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
      pointer-events: none;
    }
}
</style>
