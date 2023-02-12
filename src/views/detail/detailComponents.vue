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
        </div>
        <div class="content">
            <city-select></city-select>
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
            <div class="item" v-show="shownObj.traffic">交通分析</div>
            <div class="item" v-show="shownObj.square">面积分析</div>
        </div>
    </div>
</template>

<script setup>
import citySelect from '@/components/citySelect/citySelect.vue'
import { reactive, onMounted, provide } from 'vue'
import priceCharts from '@/components/priceCharts/priceCharts.vue'
import huxingCharts from '@/components/huxingCharts/huxingCharts'
import chaoxiangCharts from '@/components/chaoxiangCharts/chaoxiangCharts.vue'
import houseTypeCharts from '@/components/houseTypeCharts/houseTypeCharts.vue'
import floorCharts from '@/components/floorCharts/floorCharts.vue'
import $bus from '@/utils/bus'
const _keys_ = {
  price: true,
  huxing: false,
  orientation: false,
  type: false,
  floor: false,
  traffic: false,
  square: false
}
const shownObj = reactive(_keys_)
provide('cebianShow', shownObj)
const choose = (event) => {
  let obj = {
    价格分析: 'price',
    户型分析: 'huxing',
    朝向分析: 'orientation',
    类型分析: 'type',
    楼层分析: 'floor',
    交通分析: 'traffic',
    面积分析: 'square'
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
})
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.detailContainer{
    width: 100%;
    height: 100%;
    display: flex;
    .cebianlan{
        background-color: #66B1FF;
        width: 22%;
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
        }
        .active{
          background-color: #518bca;
        }
    }
    .content{
        width: 78%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #F7F8FA;
        .item{
            width: 100%;
            height: 92%;
            overflow-x: scroll;
            overflow-y: scroll;
            .p1{
                width: 100%;
                height: 80px;
            }
        }
    }
}
</style>
