<template>
    <div class="dataDetailContainer">
        <div class="form">
            <select ref="selectCity" name="citydata" id="citydata" @change="getDataCity($event)">
                <option value="">--请选择城市--</option>
                <option v-for="(item, index) in city" :key="index" :value="item">{{ item }}</option>
            </select>
            <button class="getData" @click="getData">获取数据</button>
        </div>
        <div class="dataTable">
            <table>
            <tr>
                <th v-show="detaildata.length">行号</th>
                <th v-for="(item, index) in cols" :key="index">{{ colChinese[item] }}</th>
            </tr>
            <tr v-for="(item, index) in detaildata" :key="item.id">
                <th v-show="detaildata.length">{{ index + 1 }}</th>
                <th>{{ item.id }}</th>
                <th>{{ item.type }}</th>
                <th>{{ item.title }}</th>
                <th>{{ item.rooms }}</th>
                <th>{{ item.square }}m<sup>2</sup></th>
                <th>{{ item.orientation }}</th>
                <th>{{ item.floor }}</th>
                <th>{{ item.traffic }}</th>
                <th>{{ item.price }}元/月</th>
                <th>{{ item.get_time }}</th>
                <th>{{ item.city }}</th>
            </tr>
        </table>
        </div>
        <div class="pagination"><button :class="{ 'disabled': pageIndex === 1 }" @click="getPrevData" :disabled="pageIndex === 1">上一页</button><div>共{{ totalNum }}条,每页{{ pageSize }}条,共{{ Math.ceil(totalNum / pageSize) }}页,当前第{{ pageIndex }}页</div><button :class="{ 'disabled': pageIndex === Math.ceil(totalNum / pageSize) }" @click="getNextData" :disabled="pageIndex === Math.ceil(totalNum / pageSize)">下一页</button></div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, getCurrentInstance, computed, watch } from 'vue'
import { getPageData, getCityList } from '@/api'
const instance = getCurrentInstance()
let cityname = ref('')
let city = ref([])
let cols = ref([])
let detaildata = ref([])
let pageIndex = ref(1)
let pageSize = ref(50)
const pageData = computed(() => {
  return {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value
  }
})
const colChinese = {
  id: '房屋id',
  type: '租赁类型',
  title: '标题',
  rooms: '户型',
  square: '面积',
  orientation: '朝向',
  floor: '楼层',
  traffic: '交通',
  price: '价格',
  get_time: '获取时间',
  city: '所在城市'
}
let totalNum = ref(0)
const getData = () => {
  getPageData('', pageData.value).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
    totalNum.value = res.totalNum
    cols.value = Object.keys(detaildata.value[0])
  })
}
const getDataCity = (event) => {
  pageIndex.value = 1
  getPageData(event.target.value, pageData.value).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
    totalNum.value = res.totalNum
    cols.value = Object.keys(detaildata.value[0])
    cityname.value = event.target.value
  })
}
// 获取上一页数据
const getPrevData = () => {
  pageIndex.value -= 1
  getPageData(cityname.value, pageData.value).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
  })
}
// 获取下一页数据
const getNextData = () => {
  pageIndex.value += 1
  getPageData(cityname.value, pageData.value).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
  })
}
onMounted(() => {
  getCityList().then(res => {
    city.value = res
  })
})
</script>

<style lang="scss" scoped>
.dataDetailContainer{
    width: 100%;
    height: 100%;
    .form{
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        select,button{
            margin-left: 50px;
            width: 30%;
            height: 50%;
            border-radius: 10px;
            background-color: #66B1FF;
            color: #fff;
            border: 1px solid transparent;
            font-size: 16px;
            font-weight: bold;
        }
        button:hover, select:hover{
            background-color: #1e4f84;
        }
    }
    .dataTable{
        border-radius: 10px;
        width: 100%;
        height: 65%;
        overflow-y: scroll;
        tr:first-of-type{
            position: sticky;
            top: 0;
            background-color: #66B1FF;
            color: #fff;
        }
        tr{
            width: 100%;
            height: 50px;
            th{
                width: 7%;
                height: 50px;
                border-bottom: 1px solid grey;
                border-right: 1px solid grey;
                font-size: 13px;
                font-weight: 100;
            }
        }
        tr:nth-child(odd){
            background-color: #66B1FF;
            color: #fff;
        }
    }
    .pagination{
        height: 11%;
        width: 70%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
            width: 10%;
            height: 50%;
            color: #fff;
            background-color: #66B1FF;
            border: 1px solid transparent;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
        }
        div{
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .disabled{
            cursor: not-allowed;
            background-color: #1e4f84;
        }
    }
}
</style>
