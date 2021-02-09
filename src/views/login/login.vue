<template>
  <div class="login-box">

    <el-col class="con-box">
      <el-row class="login-title">
        <img :src="image" alt="">
        <h1>CM管理系统</h1>
      </el-row>


      <el-col class="bottom-box">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit()" class="button-box">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-col>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
var APP_ID = 'WdqrjDG8FSVqnVlk4O7nEF5o-gzGzoHsz'
var APP_KEY = 'H4pPpFbRyd0IesSAovtOIRYF'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL:'https://wdqrjdg8.lc-cn-n1-shared.com',
})

export default {
  name: 'login',
  components: {
    // HelloWorld
  },
  data(){
    return{
      form:{
        username:'admin',
        password:'',
      },
      image:require('@/assets/logo.png')
    }
  },
  methods: {
    onSubmit() {
      // 验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('验证通过')
          console.log(this.form.username)
          console.log(this.form.password)
          // 调用SDK登录方法，执行登录过程
          AV.User.logIn(this.form.username, this.form.password).then(loginedUser => {
            console.log(loginedUser.attributes.username)
            this.$message('成功登录')
            // 登录成功跳转到首页
            this.$router.push({name:'index'})
          }, error => {
            console.log(error)
            this.$message('登录失败，请重试')
            // 登录失败清空表单
            this.handleReset()
          })
        } else {
          console.log('验证不通过')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  },
  mounted() {
    // 创建实例
//     const user = new AV.User();
//
// // 等同于 user.set('username', 'Tom')
//     user.setUsername('admin');
//     user.setPassword('123456');
//
// // 可选
// //     user.setEmail('tom@leancloud.rocks');
// //     user.setMobilePhoneNumber('+8618200008888');
//
// // 设置其他属性的方法跟 AV.Object 一样
// //     user.set('gender', 'secret');
//
//     user.signUp().then((user) => {
//       // 注册成功
//       console.log(`注册成功。objectId：${user.id}`);
//     }, (error) => {
//       // 注册失败（通常是因为用户名已被使用）
//       console.log(error)
//     });
  }
}
</script>

<style scoped>
.login-box{
  background: lightblue;
  width: 100%;
  height: 100vh;
  position: absolute;
}
.con-box{
  width: 34rem;
  height: 18rem;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 10px;
}
.con-box h1{
  height: 20%;
  line-height: 2;
  text-align: center;
  /*background: rebeccapurple;*/
}
.bottom-box{
  height: 80%;
  padding: 20px 0px;
  /*background: pink;*/
}
.el-form{
  width: 60%;
  margin: 0 auto;
}
.button-box{
  width: 100%;
}
/*例子*/
.login-title{
  display: flex;
  justify-content: center;
}
.login-title img{
  width: 58px;
  height: 42px;
  margin-top: 8px;
  margin-right: 4px;
}
</style>
