<template>
    <div class="zcContainer">
        <div class="form">
          <p style="height: 5%;">请注册</p>
          <input v-model="usn" :class="[usn !== '' ? 'act' : '' ]" type="text" name="usn" id="usn">
          <label for="usn" :class="[ usn !== '' ? 'active' : '' ]">用户名</label>
          <input type="password" v-model="pwd" :class="[pwd !== '' ? 'act' : '' ]" name="pwd" id="pwd">
          <label for="pwd" :class="[ pwd !== '' ? 'active' : '' ]">密码</label>
          <button @click="zc">注册</button>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { zcReq } from '@/api'
const usn = ref('')
const pwd = ref('')
const router = useRouter()
const instance = getCurrentInstance()
const zc = () => {
  zcReq(usn.value, pwd.value).then(res => {
    if (res.code === 200) {
      instance.proxy.$message({ text: res.Msg, type: 'success' })
      router.push('/login')
    } else {
      instance.proxy.$message({ text: res.Msg, type: 'error' })
    }
  })
}
</script>

<style lang="scss" scoped>
.zcContainer{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/infinity-26911168.jpg') no-repeat center;
    background-size: cover;
    .form{
        margin: 0 auto;
        width: 60%;
        height: 50%;
        position: relative;
        text-align: center;
        border-radius: 30px;
        border: 1px solid #808080;
        background-color: #66B1FF;
        opacity: 0.7;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        backdrop-filter: blur(2px);
        input{
            width: 80%;
            height: 12%;
            margin-bottom: 2%;
            border-radius: 10px;
            border: 1px solid transparent;
            font-size: 18px;
            transition: 0.2s all ease;
        }
        button{
            width: 40%;
            height: 13%;
            border-radius: 10px;
            border: 1px solid #1a7617;
            font-size: 20px;
            color: #fff;
            background-color: #66B1FF;
        }
        button:hover, button:focus{
          background-color: #29598e;
        }
        label{
          text-align: left;
          position: absolute;
          height: 0;
          width: 60px;
          // transform: translate(-675px, 8px);
          color: #808080;
          font-size: 18px;
          height: 10px;
          transition: all 0.2s ease;
        }
        label:first-of-type{
          left: 12%;
          top: 25%;
        }
        label:last-of-type{
          left: 12%;
          top: 55%;
        }
        input:focus{
          border: 3px solid red;
        }
        input:focus + label:first-of-type{
          text-align: center;
          font-size: 14px;
          color: red;
          // transform: translate(-675px, -7px);
          background-color: #66B1FF;
          top: 20%;
        }
        input:focus + label:last-of-type{
          text-align: center;
          font-size: 14px;
          color: red;
          // transform: translate(-675px, -7px);
          background-color: #66B1FF;
          top: 49.5%;
        }
        label.active{
          text-align: center;
          font-size: 14px;
          color: red;
          transform: translate(-675px, -7px);
          background-color: #66B1FF;
        }
        input.act{
          border: 3px solid red;
        }
        p{
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
    }
}
</style>
