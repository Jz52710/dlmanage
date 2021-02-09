<template>
  <el-container class="index-box">
    <el-aside width="14%">
      <el-row class="title-box">
        <img :src="image" alt="">
        <h1>CM管理系统</h1>
      </el-row>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2f3e4e"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="1" @click="list">
          <i class="el-icon-menu"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="user">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
          <i class="el-icon-switch-button"></i>
          <span @click="quit">退出</span>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
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
  name: 'index',
  components: {
    // HelloWorld
  },
  data(){
    return{
      image:require('@/assets/logo.png')
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 退出
    quit(){
      // this.$router.push({name:'login'})
      AV.User.logOut().then(() => {
        // 登出后跳转到登录页面
        this.$message('已经登出，跳转至登录页面')
        this.$router.push({name:'login'})
      })
    },
    list(){
      this.$router.push({name:'list'})
    },
    user(){
      this.$router.push({name:'user'})
    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: white;
  color: #333;
  text-align: right;
  line-height: 60px;
  font-size: 18px;
  border: 1px solid #ebeef5;
  box-sizing: border-box;
}

.el-aside {
  background-color: #2f3e4e;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}
.index-box{
  width: 100%;
  height: 100%;
  position: absolute;
}
.index-box h1{
  line-height: 60px;
  font-size: 26px;
}

/*侧边*/
.el-menu-item{
  font-size: 18px;
}
.el-aside h1{
  color: white;
}
.el-menu{
  border-right: none;
}
/*导航栏*/
.el-header i{
  cursor: pointer;
}
.el-header span{
  cursor: pointer;
}
/*logo*/
.title-box{
  display: flex;
  justify-content: space-between;
}
.title-box img{
  width: 68px;
  height: 48px;
  margin-top: 2px;
}

</style>
