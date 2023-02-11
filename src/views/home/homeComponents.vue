<template>
    <div class="homeCom">
        <china-map></china-map>
        <div ref="pie" class="Pie"></div>
    </div>
</template>

<script setup>
import chinaMap from '@/components/chinaMap/chinaMap.vue'
import { reqCity } from '@/api'
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
        data: cityData
      }
    ],
    radius: ['20%', '60%'],
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
  chart.init(instance.refs.pie).setOption(option)
  window.addEventListener('resize', () => {
    chart.init(instance.refs.pie).resize()
  })
}
onMounted(() => {
  cityReq()
})
</script>

<style lang="scss" scoped>
.homeCom{
    width: 100%;
    height: 100%;
}
.Pie{
  width: 100%;
  height: 300px;
}
</style>
