<template>
    <div class="loginContainer">
        <p>欢迎使用租房数据可视化平台</p>
        <div class="form">
          <p style="height: 5%;">请登录</p>
          <input v-model="usn" :class="[usn !== '' ? 'act' : '' ]" type="text" name="usn" id="usn">
          <label for="usn" :class="[ usn !== '' ? 'active' : '' ]">用户名</label>
          <input v-model="pwd" :class="[pwd !== '' ? 'act' : '' ]" type="text" name="pwd" id="pwd">
          <label for="pwd" :class="[ pwd !== '' ? 'active' : '' ]">密码</label>
          <button @click="login">登录</button>
        </div>
    </div>
</template>

<script setup>
import { loginReq, checkToken } from '@/api'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let usn = ref('')
let pwd = ref('')
const instance = getCurrentInstance()
const login = () => {
  loginReq(usn.value, pwd.value).then((res) => {
    if (res.code === 200) {
      instance.proxy.$message({ text: '登陆成功', type: 'success' })
      localStorage.setItem('bstoken', res.token)
      router.push('/detail')
    }
  })
}
onMounted(() => {
  if (localStorage.getItem('bstoken')) {
    checkToken(localStorage.getItem('bstoken')).then((res) => {
      if (res.status) {
        instance.proxy.$message({ text: 'token校验成功', type: 'success' })
        router.push('/detail')
      } else {
        router.push('/login')
      }
    })
  } else {
    instance.proxy.$message({ text: 'token已失效,请重新登录', type: 'error' })
    router.push('/login')
  }
})
</script>

<style lang="scss" scoped>
.loginContainer{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    p{
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 22px;
      text-align: center;
      top: 3%;
    }
    .form{
        margin: 0 auto;
        width: 60%;
        height: 50%;
        position: relative;
        text-align: center;
        border-radius: 2%;
        border: 1px solid #808080;
        background-color: #66B1FF;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
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
            border: 1px solid transparent;
            font-size: 20px;
            color: #808080;
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
        }
        label:first-of-type{
          left: 12%;
          top: 25%;
        }
        label:last-of-type{
          left: 12%;
          top: 54%;
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
    }
    // span.usn{
    //   position: absolute;
    //   transform: translate(300px, 115px);
    //   color: #808080;
    //   height: 0;
    // }
    // span.pwd{
    //   position: absolute;
    //   transform: translate(300px, 160px);
    //   color: #808080;
    //   height: 0;
    // }
}
</style>
