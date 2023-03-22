<template>
    <div class="dropContainer">
        <select v-model="selectedCity" @change="changeCity($event)" name="cityDrop" id="cityDrop">
            <option value="">--请选择城市--</option>
            <option v-for="(item, index) in cityData" :value="item" :key="index">{{ item }}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.dropContainer{
    width: 30%;
    height: 10%;
    select{
        width: 100%;
        background-color: #66B1FF;
        color: #fff;
        border-radius: 15px;
    }
}
</style>

<script setup>
import $bus from '@/utils/bus'
import { onBeforeMount, reactive, ref } from 'vue'
import { getCityList } from '@/api'
let cityData = reactive([])
const selectedCity = ref('')
const changeCity = (e) => {
  $bus.emit('cityName', e.target.value)
  selectedCity.value = e.target.value
}
onBeforeMount(() => {
  getCityList().then(res => {
    if (res) {
      cityData = res
    }
  })
})
$bus.on('toggleCebianlan', () => {
  selectedCity.value = ''
})
</script>
