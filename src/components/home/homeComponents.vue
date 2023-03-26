<template>
    <div class="homeCom">
        <span>首页</span>
        <china-map></china-map>
        <div ref="pie" class="Pie"></div>
        <div ref="radar" class="radar"></div>
    </div>
</template>

<script setup>
import chinaMap from '@/components/chinaMap/chinaMap.vue'
import { reqCity, radarReq } from '@/api'
import { onMounted, reactive, getCurrentInstance, inject } from 'vue'
const chart = inject('echarts')
const instance = getCurrentInstance()
let cityData = reactive([])
const cityReq = async () => {
  let data = await reqCity()
  cityData = JSON.parse(JSON.stringify(data))
  let option = {
    title: {
      text: '各城市房屋占比',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        data: cityData,
        radius: ['40%', '60%']
      }
    ],
    tooltip: {
      show: true,
      trigger: 'item',
      showContent: true,
      triggerOn: 'click',
      backgroundColor: 'white',
      position: ['50%', '50%'],
      extraCssText: 'width: 71.6px; height:51.6px'
    },
    textStyle: {
      color: 'black',
      fontStyle: 'oblique'
    }
  }
  let myChart = chart.init(instance.refs.pie)
  myChart.setOption(option)
}
const homeMakeRadar = () => {
  let chartsRadar = chart.init(instance.refs.radar)
  radarReq().then(res => {
    let city = res.data.map(item => {
      return item.city_name
    })
    let radarData = res.data.map(item => {
      return [Math.round(item.avg_price), item.max_price, Math.round(item.avg_square), item.max_square, Math.round(item.avg_floor)]
    })
    let chartData = []
    for (let i in city) {
      let obj = {
        name: city[i],
        value: radarData[i]
      }
      chartData.push(obj)
    }
    let option = {
      title: {
        text: '各城市数据雷达图',
        left: 'center'
      },
      legend: {
        data: city,
        orient: 'vertical',
        right: '20%'
      },
      tooltip: {
        renderMode: 'richText',
        trigger: 'item',
        confine: true,
        className: 'radarTooltip',
        position: function (point, params, dom, rect, size) {
          return [point[0], '0%']
        }
      },
      radar: {
        indicator: [
          { name: '平均价格', max: 10000 },
          { name: '最高价格', max: 200000 },
          { name: '平均面积', max: 100 },
          { name: '最大面积', max: 100 },
          { name: '平均楼层', max: 50 }
        ]
      },
      series: [
        {
          name: '多个城市维度对比',
          type: 'radar',
          data: chartData
        }
      ]
    }
    chartsRadar.setOption(option)
    window.addEventListener('resize', () => {
      chartsRadar.resize()
    })
  })
}
onMounted(() => {
  cityReq().then(res => {
    homeMakeRadar()
  })
})
</script>

<style lang="scss" scoped>
.homeCom{
    width: 100%;
    height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
    text-align: center;
    .radar{
      width: 100%;
      height: 500px;
    }
  }
  .Pie{
    width: 100%;
    height: 300px;
  }
</style>
