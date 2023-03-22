<template>
    <div class="detailContainer">
        <div class="cebianlan" @click="choose($event)">
            <div class="flexItem" :class="{ 'active': shownObj.price }">价格分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.huxing }">户型分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.orientation }">朝向分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.type }">类型分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.floor }">楼层分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.traffic }">交通分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.square }">面积分析</div>
            <div class="flexItem" :class="{ 'active': shownObj.dataDetail }">详细数据</div>
          </div>
          <div class="content">
            <span class="returnHome" v-if="!homeShow" @click="returnHome">返回首页</span>
            <home-components v-show="homeShow"></home-components>
            <!-- <city-drop-components v-show="cityDropShow"></city-drop-components> -->
            <city-drop-components v-show="cityDropShow"></city-drop-components>
            <div class="item" v-show="shownObj.price">
                <price-charts></price-charts>
            </div>
            <div class="item" v-show="shownObj.huxing">
                <huxing-charts></huxing-charts>
            </div>
            <div class="item" v-show="shownObj.orientation">
                <chaoxiang-charts></chaoxiang-charts>
            </div>
            <div class="item" v-show="shownObj.type">
                <house-type-charts></house-type-charts>
            </div>
            <div class="item" v-show="shownObj.floor">
                <floor-charts></floor-charts>
            </div>
            <div class="item" v-show="shownObj.traffic">
                <traffic-charts></traffic-charts>
            </div>
            <div class="item" v-show="shownObj.square">
                <square-charts></square-charts>
            </div>
            <div class="item" v-show="shownObj.dataDetail">
              <data-detail></data-detail>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, provide, ref, computed } from 'vue'
import priceCharts from '@/components/priceCharts/priceCharts.vue'
import huxingCharts from '@/components/huxingCharts/huxingCharts'
import chaoxiangCharts from '@/components/chaoxiangCharts/chaoxiangCharts.vue'
import houseTypeCharts from '@/components/houseTypeCharts/houseTypeCharts.vue'
import floorCharts from '@/components/floorCharts/floorCharts.vue'
import homeComponents from '@/components/home/homeComponents.vue'
// import cityDropComponents from '@/components/cityDrop/cityDropComponents.vue'
import trafficCharts from '@/components/trafficCharts/trafficCharts'
import squareCharts from '@/components/squareCharts/squareCharts.vue'
import dataDetail from '@/components/dataDetail/dataDetail.vue'
import cityDropComponents from '@/components/cityDropCom/CityDropCom.vue'
import $bus from '@/utils/bus'
const _keys_ = {
  price: false,
  huxing: false,
  orientation: false,
  type: false,
  floor: false,
  traffic: false,
  square: false,
  dataDetail: false
}
const homeShow = ref(true)
const shownObj = reactive(_keys_)
provide('cebianShow', shownObj)
const choose = (event) => {
  homeShow.value = false
  let obj = {
    价格分析: 'price',
    户型分析: 'huxing',
    朝向分析: 'orientation',
    类型分析: 'type',
    楼层分析: 'floor',
    交通分析: 'traffic',
    面积分析: 'square',
    详细数据: 'dataDetail'
  }
  for (let i in _keys_) {
    if (shownObj[i]) {
      shownObj[i] = !shownObj[i]
    }
  }
  shownObj[obj[event.target.innerText]] = !shownObj[obj[event.target.innerText]]
  $bus.emit('toggleCebianlan')
}
$bus.on('cityName', (cityName) => {
  if (shownObj.price) {
    $bus.emit('cityPrice', cityName)
  }
  if (shownObj.huxing) {
    $bus.emit('cityHuxing', cityName)
  }
  if (shownObj.orientation) {
    $bus.emit('cityCX', cityName)
  }
  if (shownObj.type) {
    $bus.emit('cityHouseType', cityName)
  }
  if (shownObj.floor) {
    $bus.emit('cityFloor', cityName)
  }
  if (shownObj.traffic) {
    $bus.emit('cityTraffic', cityName)
  }
  if (shownObj.square) {
    $bus.emit('citySquare', cityName)
  }
})
const returnHome = () => {
  homeShow.value = true
  for (let i in shownObj) {
    if (shownObj[i]) {
      shownObj[i] = false
    }
  }
}
// 城市下拉显示
const cityDropShow = computed(() => {
  if (homeShow.value) {
    return false
  } else {
    if (shownObj.dataDetail) {
      return false
    } else {
      return true
    }
  }
})
</script>

<style lang="scss" scoped>
.detailContainer{
    width: 100%;
    height: 100%;
    display: flex;
    .cebianlan{
        background-color: #66B1FF;
        width: 15%;
        height: 100%;
        color: #fff;
        display: flex;
        flex-direction: column;
        .flexItem{
            text-align: center;
            border-bottom: 1px solid #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 10%;
            font-size: large;
            font-weight: bold;
        }
        .active{
          background-color: #518bca;
        }
    }
    .content{
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #F7F8FA;
        align-items: center;
        position: relative;
        text-align: center;
        .item{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            margin: 0 auto;
          }
          .returnHome{
            height: 5%;
            font-size: 20px;
            font-weight: bold;
          }
    }
}
</style>
