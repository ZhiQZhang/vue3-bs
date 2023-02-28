<template>
    <Transition name="down">
        <div class="messageContainer" :style="style[type]" v-show="isShow">
            <i class="iconfont" :class="[style[type].icon]"></i>
            <span class="text">{{ text }}</span>
        </div>
    </Transition>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'messageCom',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    }
  },
  setup () {
    let isShow = ref(false)
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-error',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-success',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    onMounted(() => {
      isShow.value = true
    })
    return {
      isShow, style
    }
  }
}
</script>

<style lang="scss" scoped>
.messageContainer{
    width: 300px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 25px;
    line-height: 50px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;
    i {
        margin-right: 4px;
        vertical-align: middle;
    }
    .text {
        vertical-align: middle;
    }
}
</style>
