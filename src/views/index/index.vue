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
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="user">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="cz-box">
          <i class="el-icon-thumb czi"></i>
          <span style="margin-right: 16px;" @click="centerDialogVisible = true" class="cz">操作指引</span>
        </div>
        <div class="exit-box">
          <i class="el-icon-switch-button"></i>
          <span @click="quit" class="exit">退出</span>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <!--操作文档-->
    <el-dialog
        title="Boring Media积分管理系统"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <!--      <h3 style="text-align: center;line-height: 1.5">BoringMedia积分管理系统</h3>-->
      <!--      <br>-->
      <p>一、菜单管理</p>
      <p>1.点击菜单管理进入菜单列表；</p>
      <p>2.点击每一行的修改可以对菜单名称、积分、价格进行修改；</p>
      <p>3.点击每一行的删除可以对该行菜单进行删除；</p>
      <p>4.点击新增按钮，可以新增菜单。</p>
      <br>
      <p>二、用户管理</p>
      <p>1.点击用户管理进入用户列表</p>
      <p>2.点击每一行的修改可以对用户积分进行修改；</p>
      <p>3.点击每一行的删除可以对该用户进行删除；</p>
      <p>4.通过输入用户手机号->点击查询可查到该用户信息。</p>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="centerDialogVisible = false">我已明白</el-button>
  </span>
    </el-dialog>

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
      centerDialogVisible: false,
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
  display: flex;
  justify-content: flex-end;
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
.el-dialog p{
  line-height: 1.5;
  font-size: 1rem;
}
.cz-box:hover{
  color: #66b1ff;
}
.exit-box:hover{
  color: #66b1ff;
}


</style>
