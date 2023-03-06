<template>
    <div class="dataDetailContainer">
        <div class="form">
            <select name="citydata" id="citydata" @change="getDataCity($event)">
                <option value="">--请选择城市--</option>
                <option v-for="(item, index) in city" :key="index" :value="item">{{ item }}</option>
            </select>
            <button class="getData" @click="getData">获取数据</button>
        </div>
        <table class="dataTable">
            <tr>
                <th v-for="(item, index) in cols" :key="index">{{ item }}</th>
            </tr>
            <tr v-for="item in detaildata" :key="item.id">
                <th>{{ item.id }}</th>
                <th>{{ item.type }}</th>
                <th>{{ item.title }}</th>
                <th>{{ item.rooms }}</th>
                <th>{{ item.square }}m<sup>2</sup></th>
                <th>{{ item.orientation }}</th>
                <th>{{ item.floor }}</th>
                <th>{{ item.traffic }}</th>
                <th>{{ item.price }}</th>
                <th>{{ item.get_time }}</th>
                <th>{{ item.city }}</th>
            </tr>
        </table>
        <div class="pagination"><span>共{{ totalNum }}条,每页{{ pageData.pageSize }}条,共{{ Math.floor(totalNum / pageData.pageSize) + 1 }}页</span></div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { getPageData, getCityList } from '@/api'
const instance = getCurrentInstance()
let city = ref([])
let cols = ref([])
let detaildata = ref([])
let pageData = reactive({
  pageIndex: 1,
  pageSize: 50
})
let totalNum = ref(0)
const getData = () => {
  getPageData('', pageData).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
    totalNum.value = res.totalNum
    cols.value = Object.keys(detaildata.value[0])
  })
}
const getDataCity = (event) => {
  getPageData(event.target.value, pageData).then(res => {
    instance.proxy.$message({ text: '数据获取成功', type: 'success' })
    detaildata.value = res.data
    totalNum.value = res.totalNum
    cols.value = Object.keys(detaildata.value[0])
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
        width: 95%;
        height: 100%;
        background-color: #66B1FF;
        margin: 10px auto;
        overflow-y: scroll;
        overflow-x: scroll;
        tr{
            width: 100%;
            height: 50px;
            th{
                width: 7%;
                height: 50px;
                border: 1px solid grey;
            }
        }
    }
    .pagination{
        height: 10%;
        width: 70%;
        margin: 0 auto;
    }
}
</style>
