<template>
    <div id="chinaMap" ref="China">

    </div>
</template>

<script setup>
import { inject, onMounted, getCurrentInstance, computed } from 'vue'
import { china } from '@/js/china'
let chart = inject('echarts')
let instance = getCurrentInstance()
const makeMap = () => {
  let chinaDom = instance.refs.China
  let options = {
    title: {
      text: '简易中国地图',
      show: false
    },
    backgroundColor: '#fff',
    geo: {
      aspectScale: 0.9,
      show: true,
      map: 'china',
      itemStyle: {
        areaColor: '#aaaaff',
        borderColor: '#aaaaff',
        color: '#cfcfcf',
        borderType: 'solid',
        borderCap: 'round',
        shadowColor: '#aaaaff',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10
      }
    }
  }
  let charts = chart.init(chinaDom)
  chart.registerMap('china', china)
  charts.setOption(options)
  window.addEventListener('resize', () => {
    charts.resize()
  })
}
onMounted(() => {
  makeMap()
})
</script>

<style lang="scss" scoped>
#chinaMap{
    width: 100%;
    height: 400px;
}
</style>
