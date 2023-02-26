<template>
    <div class="loginContainer">
        <div class="form">
            <input v-model="usn" type="text" name="" id="usn">
            <input v-model="pwd" type="text" name="" id="pwd">
            <button @click="login">登录</button>
        </div>
        <router-link to="/detail">详情</router-link>
    </div>
</template>

<script setup>
import { loginReq, checkToken } from '@/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let usn = ref('')
let pwd = ref('')
const login = () => {
  loginReq(usn.value, pwd.value).then((res) => {
    if (res.code === 200) {
      localStorage.setItem('bstoken', res.token)
      router.push('/detail')
    }
  })
}
onMounted(() => {
  if (localStorage.getItem('bstoken')) {
    checkToken(localStorage.getItem('bstoken')).then((res) => {
      res.status ? router.push('/detail') : router.push('/login')
    })
  } else {
    router.push('/login')
  }
})
</script>

<style lang="scss" scoped>
.loginContainer{
    width: 100%;
    height: 100%;
    .form{
        margin: 0 auto;
        width: 60%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        input{
            width: 100%;
            height: 8%;
        }
        button{
            width: 30%;
            height: 10%;
        }
    }
}
</style>
