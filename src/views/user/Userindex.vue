<template>
  <div class="user-box">
    <el-col class="list-title">
      <el-input v-model="input" placeholder="请输入手机号查询" class="cx-box"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
    </el-col>
    <el-col class="list-con">
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
        <el-table-column
            type="index"
            width="50"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="微信名"
            align="center">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="price"
            label="积分"
            align="center">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="put(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增-->
      <el-dialog title="新增客户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="积分" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add(form)">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改信息" :visible.sync="dialogVisible">
        <el-form :model="showForm">
          <el-form-item label="微信名" :label-width="formLabelWidth">
            <el-input v-model="showForm.name" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="showForm.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="积分" :label-width="formLabelWidth">
            <el-input v-model="showForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="revise(showForm)">确 定</el-button>
        </div>
      </el-dialog>
      <!--分页-->
      <el-pagination
          :page-size="pagesize"
          :pager-count="5"
          layout="prev, pager, next, total"
          :current-page.sync="currentPage"
          :hide-on-single-page="value"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>

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
  name: 'user',
  components: {
    // HelloWorld
  },
  data(){
    return{
      tableData:[],
      //新增
      dialogFormVisible:false,
      formLabelWidth: '120px',
      form: {
        // name: '',
        // integral: '',
        // price:'',
      },
      //修改
      dialogVisible:false,
      showForm:{},
      //查询
      input:'',
      //分页
      total:0,
      pagesize:12,
      currentPage:1,
      value:true,
    }
  },
  methods: {
    //新增
    push(){
      this.dialogFormVisible = true
    },
    add(form){
      // console.log(form)
      const UserObject = AV.Object.extend('Customer')
      const userObject = new UserObject()
      userObject.set('name',form.name)
      userObject.set('phone',form.phone)
      userObject.set('price',form.price)
      // listObject.save({ name: form.name, integral: form.integral, price: form.price})
      userObject.save().then((userObject) => {
        // 成功保存之后，执行其他逻辑
        // console.log(`保存成功。objectId：${userObject.id}`);
        console.log(`保存成功。objectId：${userObject.attributes.name}`);
        this.getInfo()
      }, (error) => {
        // 异常处理
        console.log(error)
      });
      // console.log('LeanCloud Rocks!')
      this.dialogFormVisible = false
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    //修改
    put(data){
      this.dialogVisible = true
      this.showForm = data
      // console.log('xiuiuiuiu',data)
      // console.log(data.price)
    },
    revise(formdata){
      // console.log(formdata.price)
      const User = AV.Object.createWithoutData('Customer',formdata.id)
      User.save({
        name: formdata.name,
        mobile: formdata.phone,
        feng: parseInt(formdata.price),
        car: formdata.car,
        code: formdata.code,
        openid: formdata.openid,
        realname: formdata.realname,
        sex: formdata.sex,
        stus: formdata.stus,
        think: formdata.think,
        time: formdata.time,
        type: formdata.type,
      }).then(res => {
        return res.id
      })
      // this.tableData = formdata
      this.dialogVisible = false
      this.$message({
        message: '修改成功',
        type: 'success'
      });
    },
    //删除
    deleteRow(index, rowdata) {
      // listdata.splice(index, 1);
      const user = AV.Object.createWithoutData('Customer', rowdata.id);
      user.destroy().then(res => {
        this.getInfo()
        return res.id
      })
      this.$message({
        message: '删除成功',
        type: 'warning',
      });

    },
    //查询
    query(){
      this.tableData = []
      const query = new AV.Query('Customer');
      // query.find('15266668888').then((todo) => {
      //   console.log(todo.toJSON());
      // });
      query.equalTo('mobile', this.input);
      query.find().then((data) => {
        // data 是包含满足条件的 data对象
        // data.attributes.id = data.id
        // console.log(data.attributes)
        data.forEach((todo) => {
          todo.attributes.id = todo.id
          console.log(todo.attributes)
          this.tableData.push(todo.attributes)
        })
      });
    },
    handleClick(row) {
      console.log(row);
    },
    // handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    //   },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 获取数据
    getInfo(){
      //拿取数据
      this.tableData = [];

      const query = new AV.Query('Customer');
      // console.log(query)
      query.descending('createdAt');

      query.find().then((todos) => {
        console.log('todos',todos)
        todos.forEach((todo) => {
          // 获取每个todo 的 attachments 数组,将其添加到data
          console.log('全部数据',todo.attributes)
          let list = {}
          list['id'] = todo.id
          list['name'] = todo.attributes.name
          list['phone'] = todo.attributes.mobile
          list['car'] = todo.attributes.car
          list['code'] = todo.attributes.code
          list['openid'] = todo.attributes.openid
          list['realname'] = todo.attributes.realname
          list['sex'] = todo.attributes.sex
          list['stus'] = todo.attributes.stus
          list['think'] = todo.attributes.think
          list['time'] = todo.attributes.time
          list['type'] = todo.attributes.type
          list['price'] = todo.attributes.feng
          console.log('list',list)
          // console.log('todosid',todo.id)
          // console.log('todos12',todo.attributes.id=todo.id)
          todo.attributes.id=todo.id
          // console.log('todos',todo.attributes)
          // data.push(todo.attributes)
          // this.tableData.push(todo.attributes)
          this.tableData.push(list)

        });

        this.total = this.tableData.length
      })

    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
.user-box{
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.list-title{
  width: 100%;
  height: 8%;
  /*background: #B3C0D1;*/
  padding: 16px 0 0 16px;
}
.list-con{
  width: 100%;
  height: calc(100% - 8%);
  /*background: pink;*/
  padding: 16px;
  position: relative;
}
/*按钮*/
.list-title .el-button{
  float: left;
  margin-left: 10px;
}
.list-title .cx-box{
  float: left;
  width: 16%;
}
/*分页*/
.el-pagination{
  position: absolute;
  bottom: 1%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

</style>
