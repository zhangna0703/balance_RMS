<template>
  <div class="Coachwrap">
    <Navslide></Navslide>
    <div class="passbox">
      <div class="navbox">欢迎您，管理员</div>
      <h3>教练管理</h3>
      <div class="btnBox">
      <el-button type="primary" @click="addtr">添加教练</el-button>
      <el-button type="primary">批量删除</el-button>

      </div>
      <div class="box">
        <el-table ref="multipleTable" :data="firstdata" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" min-width="5%" align='center'>
          </el-table-column>
          <el-table-column label="序号" min-width="10%" align='center' type='index'>
            <!-- <template slot-scope='scope'>
              <div>
                <span>{{ scope.row.id }}</span>
              </div>
            </template> -->
          </el-table-column>
          <el-table-column label="教练姓名" min-width="15%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.username' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-model='username' v-if="scope.row.username=='add'" />
                  <span v-else>{{ scope.row.username }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号" min-width="15%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.mobile' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-model='mobile' v-if="scope.row.mobile=='add'" />
                  <span v-else>{{ scope.row.mobile }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="运动员数量" min-width="10%" align='center'>
            <template slot-scope='scope'>
              <div>
                <span v-if="scope.row.childCount=='add'">0</span>
                <span v-else>{{ scope.row.childCount }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="45%" align='center'>
            <template slot-scope='scope'>
              <div>
                <div v-if='scope.row.edit'>
                  <el-button type="primary" @click='editline(scope.row,scope.$index)'>保存</el-button>
                  <el-button type="primary" @click='editcancle(scope.row)'>取消</el-button>
                </div>
                <div v-else>
                  <div v-if="scope.row.username=='add'">
                    <el-button type="primary" @click='addline'>保存</el-button>
                    <el-button type="primary" @click='cancle'>取消</el-button>
                  </div>
                  <div v-else>
                    <el-button type="primary" @click="dialogTableVisible = true">管理运动员</el-button>
                    <el-button type="primary" @click='edit(scope.row)'>编辑</el-button>
                    <el-button type="primary" @click='resetPwd'>重置密码</el-button>
                    <el-button type="primary" @click.native.prevent="deleteRow(scope.$index, firstdata)">删除</el-button>
                  </div>

                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[3,5, 10, 15, 20]" :page-size="5" 
          layout=" sizes, prev, pager, next, jumper,total" :total="firstdata.length">
        </el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span>确认将该教练密码重置为初始密码？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="username" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- <input v-model='question.username' placeholder='edit me'> -->
      <!-- <p> Message is {{message}}</p>
      <button @click='wordIn'>word in</button>
      <button @click='wordOut'>word out</button> -->
    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  import { memberMessage,addMember } from '@/api/index'

  export default {
    username: 'Coach',
    components: {
      Navslide
    },
    mounted() {
      this.getMember()
    },
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          username: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible:false,
        centerDialogVisible: false,
        question: {
          username: 'zhangna'
        },
        words: [],
        currentPage4: 4,
        tableData: [{
          id: '',
          username: "add",
          mobile: "add",
          childCount: 'add'
        }],
        firstdata: [{
          username: '王择欧',
          mobile: '15856655445',
          edit: false,
          childCount: 5
        }, {
          username: '周阿西',
          mobile: '15856655445',
          edit: false,
          childCount: 6
        }, {
          username: '王择欧',
          mobile: '15856655445',
          edit: false,
          childCount: 2
        }],
        username: '',
        mobile: '',
        editData: {}
      }
    },
    created() {
    },
    methods: {
      // addMemberMethod(){  
      //   let data = {
      //     username:
      //     mobile:
      //   }
        
      // },
      getMember(){
        let data = {
          level:1
        }
        memberMessage(data).then((res)=>{
          console.log(res.data.data)
          this.firstdata = res.data.data
        })
      },
      addtr(){
        this.firstdata = this.tableData.concat(this.firstdata);
      },
      resetPwd() {
        this.centerDialogVisible = true
      },
      handleSizeChange(val) {
        this.firstdata.splice(0,this.firstdata.length-val)
        console.log(`每页 ${val} 条`,this.firstdata.length);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addline() {
        if (this.username == '') {
          this.$message({
            message: '请输入教练姓名',
            type: 'warning'
          })
        }
        if (this.mobile == '') {
          this.$message({
            message: '请输入教练手机号',
            type: 'warning'
          })
        }
        if (!this.username == '' && !this.mobile == '') {
          let data ={
            username: this.username,
            edit: false,
            mobile: this.mobile,
            childCount: 0
          }
          addMember(data).then((res)=>{
            if(res.data.code==200){
              this.$message({
            message: '添加成功',
            type: 'success'
          })
            }
            this.getMember()
          })
          // this.firstdata.splice(0, 1, {
          //   username: this.username,
          //   edit: false,
          //   mobile: this.mobile,
          //   childCount: 0
          // })
          this.username = '';
          this.mobile = '';
        }
      },
      cancle() {
        this.username = '';
        this.mobile = ''
      },
      edit(item) {
        // this.firstdata.forEach((v,ind)=>{
        //   v.edit = false
        // })
        item.edit = true
        console.log(this.editData, 'editdata', item, 'data')
      },
      editcancle(item, index) {
        item.edit = false
        this.words.splice(index, 1, item);
        console.log(this.words)

      },
      editline(item, index) {
        console.log(item, index)
        item.edit = false
        this.words.splice(index, 0, item);
        console.log(this.words)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    watch: {
      question: {
        handler: function () {
          alert(1);
        },
        deep: true
      }
    },
  }
</script>
<style scoped>
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff
  }

  .Coachwrap {
    width: 100%;
    display: flex;
  }

  .el-menu-vertical-demo {
    width: 250px;
    height: 100%;
  }

  .passbox {
    background: #f2f2f2;
    width: 100%;
    height: 100%;
  }

  input {
    height: 35px;
    width: 100%;
    border: solid 1px #ccc;
    border-radius: 4px;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
  }
  .btnBox{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }
  .navbox {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .passbox h3 {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #ccc;
  }

  .box {
    padding: 20px;
    box-sizing: border-box;
  }
</style>