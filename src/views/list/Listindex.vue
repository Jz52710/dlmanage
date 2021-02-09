<template>
  <div class="list-box">
    <el-col class="list-title">
      <el-button type="primary" icon="el-icon-plus" @click="push">新增</el-button>
    </el-col>
    <el-col class="list-con">
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            type="index"
            width="50"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="商品名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="integral"
            label="积分"
            align="center">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
            align="center">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="put(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增-->
      <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="积分" :label-width="formLabelWidth">
            <el-input v-model="form.integral"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add(form)">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改商品" :visible.sync="dialogVisible">
        <el-form :model="showForm">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="showForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="积分" :label-width="formLabelWidth">
            <el-input v-model="showForm.integral"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="showForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="revise(showForm)">确 定</el-button>
        </div>
      </el-dialog>

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
  name: 'list',
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
    }
  },
  methods: {
    //新增
    push(){
      this.dialogFormVisible = true
    },
    add(form){
      // console.log(form)
      const ListObject = AV.Object.extend('ListObject')
      const listObject = new ListObject()
      listObject.set('name',form.name)
      listObject.set('integral',form.integral)
      listObject.set('price',form.price)
      // listObject.save({ name: form.name, integral: form.integral, price: form.price})
      listObject.save().then((listObject) => {
        // 成功保存之后，执行其他逻辑
        // console.log(`保存成功。objectId：${listObject.id}`);
        console.log(`保存成功。objectId：${listObject.attributes.name}`);
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
      // console.log(data)
    },
    revise(formdata){
      // console.log(formdata.name)
      const List = AV.Object.createWithoutData('ListObject',formdata.id)
      List.save({
        name: formdata.name,
        integral: formdata.integral,
        price: formdata.price,
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
      const list = AV.Object.createWithoutData('ListObject', rowdata.id);
      list.destroy().then(res => {
        this.getInfo()
        return res.id
      })
      this.$message({
          message: '删除成功',
          type: 'warning',
        });
      // console.log(listdata)
      // console.log('1',rowdata.id)
    },
    //
    handleClick(row) {
      console.log(row);
    },
    // 获取数据
    getInfo(){
      //拿取数据
      this.tableData = [];
      const query = new AV.Query('ListObject');
      // console.log(query)
      query.find().then((todos) => {
        // console.log('todos',todos)
        todos.forEach((todo) => {
          // 获取每个todo 的 attachments 数组,将其添加到data
          // console.log('全部数据',todo.attributes)
          // console.log('todosid',todo.id)
          // console.log('todos',todo.attributes.id=todo.id)
          todo.attributes.id=todo.id
          // console.log('todos',todo.attributes)
          this.tableData.push(todo.attributes)
        });
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
.list-box{
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
  background: white;
  padding: 16px 0 0 16px;
}
.list-con{
  width: 100%;
  height: calc(100% - 8%);
  background: white;
  padding: 16px;
}
/*按钮*/
.list-title .el-button{
  float: left;
}
</style>
