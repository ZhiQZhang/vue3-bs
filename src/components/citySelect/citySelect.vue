<template>
    <div class="citySelect">
        <van-field v-model="fieldValue" is-link readonly label="选择城市" placeholder="选择城市" @click="show" />
        <van-popup v-model:show="showPicker" round position="bottom" :style="{ height: '50%' }">
            <van-picker :loading="loading" :columns="cityList" @cancel="showPicker = false" @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>

<script setup>
import { getCityList } from '@/api'
import { onMounted, ref, watch } from 'vue'
import $bus from '@/utils/bus'
let cityList = []
let fieldValue = ref('')
let showPicker = ref(false)
let loading = ref(true)
const getCity = () => {
  getCityList().then((res) => {
    for (let i of res) {
      let obj = {
        text: i,
        value: i
      }
      cityList.push(obj)
    }
    loading.value = false
  })
}
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].text
  $bus.emit('cityName', fieldValue.value)
}
const show = () => {
  showPicker.value = true
  getCity()
}
$bus.on('toggleCebianlan', () => {
  fieldValue.value = ''
})
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.citySelect{
  width: 100%;
    height: 8%;
    text-align: center;
}
</style>
