<template>
  <div class="Coachwrap">
    <Navslide></Navslide>
    <div class="passbox">
      <Exitnav></Exitnav>
      <div class="marginBox">
        <div class="bigbox">
          <h3>教练管理</h3>
          <div class="btnBox">
            <el-button type="primary" @click="addtr">添加教练</el-button>
            <el-button type="primary" @click='batchDel' class="kong">批量删除</el-button>
          </div>
          <div class="box">
            <el-table
              :header-cell-style="{background:'rgba(248,248,248,1)',color:'#3C4044',fontWeight:500,borderTop:'#F2F2F2 1px solid'}"
              ref="multipleTable" :data="firstdata" tooltip-effect="dark" style="width: 100%"
              @selection-change='selsChange'>
              <el-table-column type="selection" min-width="5%" align='center'>
              </el-table-column>
              <el-table-column label="序号" min-width="10%" align='center' type='index'>
              </el-table-column>
              <el-table-column label="教练姓名" min-width="15%" align='center'>
                <template slot-scope='scope'>
                  <div>
                    <input type="text" v-model='scope.row.username' v-if='scope.row.edit'>
                    <div v-else>
                      <input type="text" v-model='usernames' v-if="scope.row.usernames=='add'" />
                      <span v-else>{{ scope.row.username }}</span></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="手机号" min-width="15%" align='center'>
                <template slot-scope='scope'>
                  <div>
                    <input type="text" v-model='scope.row.mobile' v-if='scope.row.edit'>
                    <div v-else>
                      <input type="text" v-model='mobiles' v-if="scope.row.mobiles=='add'" />
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
                      <div v-if="scope.row.usernames=='add'">
                        <el-button type="primary" @click='addline'>保存</el-button>
                        <el-button type="primary" @click='cancle'>取消</el-button>
                      </div>
                      <div v-else>
                        <el-button type="primary" @click='showMark(scope.row)'>管理运动员</el-button>
                        <el-button type="primary" @click='edit(scope.row)'>编辑</el-button>
                        <el-button type="primary" @click='resetPwd(scope.row.userCode)'>重置密码</el-button>
                        <el-button type="primary" @click.native.prevent="deleteRow( scope.row)">删除</el-button>
                      </div>

                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage4" :page-sizes="[3,5, 10, 15, 20]" :page-size="5"
              layout=" sizes, prev, pager, next, jumper,total" :total="firstdataLEN">
            </el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span>确认将该教练密码重置为初始密码？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="passtrue">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="运动员管理" :visible.sync="dialogTableVisible" class="mark" width='70%'>
        <div class="btnBoxs">
          <el-button type="primary" @click="addsportTr">添加运动员</el-button>
          <el-button type="primary" class="kong" @click='batchDelS'>批量删除</el-button>
        </div>
        <el-table
          :header-cell-style="{background:'rgba(248,248,248,1)',color:'#3C4044',fontWeight:500,borderTop:'#F2F2F2 1px solid'}"
          ref="multipleTable" :data="sportData" tooltip-effect="dark" style="width: 100%"
          @selection-change='selsChangeS'>
          <el-table-column type="selection" min-width="5%" align='center'>
          </el-table-column>
          <el-table-column label="序号" min-width="5%" align='center' type='index'>
          </el-table-column>
          <el-table-column label="姓名" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.username' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-if="scope.row.username=='add'" v-model='username' />
                  <span v-else>{{ scope.row.username }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="性别" min-width="9%" align='center'>
            <template slot-scope='scope'>
              <div>
                <el-select v-model="scope.row.sex" placeholder="请选择" v-if="scope.row.edit">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
                <div v-else>
                  <el-select v-model="sex" placeholder="请选择" v-if="scope.row.sex=='add'">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <span v-else>{{ scope.row.sex }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="年龄" min-width="7%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.birth' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-if="scope.row.birth=='add'" v-model='birth' />
                  <span v-else>{{ scope.row.birth }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="身高(cm)" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.height' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-if="scope.row.height=='add'" v-model='height' />
                  <span v-else>{{ scope.row.height }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="体重(kg)" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.weight' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-if="scope.row.weight=='add'" v-model='weight' />
                  <span v-else>{{ scope.row.weight }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号" min-width="10%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-model='scope.row.mobile' v-if='scope.row.edit'>
                <div v-else>
                  <input type="text" v-if="scope.row.mobile=='add'" v-model='mobile' />
                  <span v-else>{{ scope.row.mobile }}</span></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="30%" align='center'>
            <template slot-scope='scope'>
              <div>
                <div v-if='scope.row.edit'>
                  <el-button type="primary" @click='editlineS(scope.row,scope.$index)'>保存</el-button>
                  <el-button type="primary" @click='editcancleS(scope.row)'>取消</el-button>
                </div>
                <div v-else>
                  <div v-if="scope.row.username=='add'">
                    <el-button type="primary" @click='addlineS'>保存</el-button>
                    <el-button type="primary">取消</el-button>
                  </div>
                  <div v-else>
                    <el-button type="primary" @click='editS(scope.row)'>编辑</el-button>
                    <el-button type="primary" @click='resetPwdS(scope.row.userCode)'>重置密码</el-button>
                    <el-button type="primary" @click='deleteRowS(scope.row)'>删除</el-button>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChangeS" @current-change="handleCurrentChangeS"
          :current-page="currentPage4" :page-sizes="[3,5, 10, 15, 20]" :page-size="5"
          layout=" sizes, prev, pager, next, jumper,total" :total="firstdataLENS">
        </el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  import Exitnav from '@/components/exitnav.vue'

  import { trainersName, memberMessage, addMember, delMember, resetPass, editMember } from '@/api/index'

  export default {
    username: 'Coach',
    components: {
      Exitnav,
      Navslide
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        selsArr: [],//复选框选中的值
        tablesport: [{
          id: '',
          username: "add",
          sex: "add",
          birth: 'add',
          height: 'add',
          weight: 'add',
          mobile: 'add',
          parentName: 'add'
        }],
        sportData: [],
        dialogTableVisible: false,
        centerDialogVisible: false,
        question: {
          username: 'zhangna'
        },
        words: [],
        currentPage4: 1,
        currentPage1: 1,
        tableData: [{
          id: '',
          usernames: "add",
          mobiles: "add",
          childCount: 'add'
        }],
        firstdata: [],
        usernames: '',
        mobiles: '',
        editData: {},
        passuserCode: '',
        username: '',
        sex: '',
        birth: '',
        height: '',
        weight: '',
        mobile: '',
        self: '',
        selfCode: '',
        selsArrS: [],
        selfoption: [],
        currentuserCode: '',
        pageNum: 1,
        pageSize: 5,
        pageNumS: 1,
        pageSizeS: 5,
        firstdataLEN: 0,
        firstdataLENS: 0
      }
    },
    mounted() {
      this.getMember();
      this.getMemberLEN();
      trainersName().then((res) => {
        this.selfoption = res.data.data
      })
    },
    methods: {
      async showMark(item) {
        this.dialogTableVisible = true
        let data1 = {
          level: 2,
          userCode: item.userCode,
        }
        let data = {
          level: 2,
          userCode: item.userCode,
          pageNum: this.pageNumS,
          pageSize: this.pageSizeS
        }
        await memberMessage(data).then((res) => {
          res.data.rows.forEach((item, i) => {
            if (item.sex == 0) {
              item.sex = '女'
          } else {
            item.sex = '男'
          }
            item.edit = false
          })
          this.sportData = res.data.rows
        })
        await memberMessage(data1).then((res) => {
          this.firstdataLENS = res.data.data.length
        })
        this.currentuserCode = item.userCode
      },
      selsChange(sels) {
        this.selsArr = [];
        sels.forEach((item, i) => {
          this.selsArr.push(item.userCode)
        })
      },
      getMember() {
        let data = {
          level: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        memberMessage(data).then((res) => {
          res.data.rows.forEach((item, i) => {
            if (item.sex == 0) {
              item.sex = '女'
          } else {
            item.sex = '男'
          }
            item.edit = false
          })
          this.firstdata = res.data.rows
        })
      },
      getMemberLEN() {
        let data = {
          level: 1,
        }
        memberMessage(data).then((res) => {
          this.firstdataLEN = res.data.data.length
        })
      },
      batchDel() {
        let data = {
          deleteCodes: this.selsArr
        }
        delMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.getMember()
        })
      },
      addtr() {
        this.firstdata = this.tableData.concat(this.firstdata);
      },
      addsportTr() {
        this.sportData = this.tablesport.concat(this.sportData);
      },
      selsChangeS(sels) {
        this.selsArrS = [];
        sels.forEach((item, i) => {
          this.selsArrS.push(item.userCode)
        })
      },
      batchDelS() {
        let data = {
          deleteCodes: this.selsArrS
        }
        delMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      },
      resetPwd(code) {
        this.centerDialogVisible = true
        this.passuserCode = code
      },
      passtrue() {
        this.centerDialogVisible = false
        let data = {
          userCode: this.passuserCode
        }
        resetPass(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '重置密码成功',
              type: 'success'
            })
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getMember();
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getMember();
      },
      handleSizeChangeS(val) {
        this.pageSizeS = val
        // this.getMember();
      },
      handleCurrentChangeS(val) {
        this.pageNumS = val
        this.getMember();
      },
      addline() {
        if (this.usernames == '') {
          this.$message({
            message: '请输入教练姓名',
            type: 'warning'
          })
        }
        if (this.mobiles == '') {
          this.$message({
            message: '请输入教练手机号',
            type: 'warning'
          })
        }
        if (!this.usernames == '' && !this.mobiles == '') {
          let data = {
            username: this.usernames,
            mobile: this.mobiles
          }
          addMember(data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
            this.getMember()
          })
          this.usernames = '';
          this.mobiles = '';
        }
      },
      cancle() {
        this.getMember()
        this.usernames = '';
        this.mobiles = '';
      },
      edit(item) {
        item.edit = true
        console.log(item, 'data')
      },
      editcancle(item, index) {
        item.edit = false
        this.words.splice(index, 1, item);
        console.log(this.words)

      },
      editline(item, index) {
        item.edit = false
        let data = {
          targetUserCode: item.userCode,
          username: item.username,
          mobile: item.mobile
        }
        editMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
          this.getMember()
        })
      },
      deleteRow(rows) {
        let data = {
          deleteCodes: [rows.userCode]
        }
        delMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.getMember()
        })

      },
      editlineS(item, index) {
        console.log(item)
        item.edit = false
        let data = {
          targetUserCode: item.userCode,
          username: item.username,
          sex: item.sex,
          birth: item.birth,
          height: item.height * 1,
          weight: item.weight * 1,
          mobile: item.mobile,
          parentUserCode: item.parentName,
        }
        editMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
          this.getMember()
        })
      },
      editcancleS(item, index) {
        item.edit = false
      },
      addlineS() {
        if (!this.username == '' && !this.sex == '' && !this.birth == '' && !this.height == '' && !this.weight == '' && !this.mobile == '') {
          if (this.sex == '男') {
            this.sex = 1
          } else {
            this.sex = 0
          }
          let data = {
            username: this.username,
            sex: this.sex,
            birth: this.birth,
            height: this.height * 1,
            weight: this.weight * 1,
            mobile: this.mobile,
            parentUserCode: this.currentuserCode,
            // edit: false,
          }
          addMember(data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
            let data = {
              level: 2,
              userCode: this.currentuserCode,
              pageNum: this.pageNumS,
              pageSize: this.pageSizeS
            }
            memberMessage(data).then((res) => {
              res.data.rows.forEach((item, i) => {
                if (item.sex == 0) {
              item.sex = '女'
          } else {
            item.sex = '男'
          }
                item.edit = false
              })
              this.sportData = res.data.rows
            })
          })
          this.username = '';
          this.sex = '';
          this.birth = '';
          this.height = '';
          this.weight = '';
          this.mobile = '';
          this.selfCode = '';
        }
      },
      editS(item) {
        item.edit = true
      },
      resetPwdS(code) {
        this.centerDialogVisible = true
        this.passuserCode = code
      },
      deleteRowS(rows) {
        let data = {
          deleteCodes: [rows.userCode]
        }
        delMember(data).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          let data = {
            level: 2,
            userCode: this.currentuserCode,
            pageNum: this.pageNumS,
            pageSize: this.pageSizeS
          }
          memberMessage(data).then((res) => {
            res.data.rows.forEach((item, i) => {
              if (item.sex == 0) {
              item.sex = '女'
          } else {
            item.sex = '男'
          }
              item.edit = false
            })
            this.sportData = res.data.rows
          })
        })

      },
    }
  }
</script>
<style scoped>
  /deep/.mark {
    border-bottom: solid 1px #E7E8EF
  }

  .table {
    float: right;
  }

  .kong {
    border: solid 1px #409EFF;
    background: #fff;
    color: #409EFF;
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin: 15px 30px 0 0;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff
  }

  .marginBox {
    padding: 19px 24px;
  }

  .bigbox {
    /* width: 100%; */
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 2px 0px rgba(0, 21, 41, 0.12);
    border-radius: 2px;
    border: 1px solid rgba(230, 235, 239, 1);
  }

  .bigbox h3 {
    border-bottom: solid 1px #E7E8EF;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    padding-left: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(101, 107, 113, 1);
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

  .btnBox {
    padding: 20px 20px 0;
    box-sizing: border-box;
  }

  .btnBoxs {
    padding: 0 0 20px;
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

  /* .el-dialog__body {
    padding: 50px 20px;
  } */

  /* .passbox h3 {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #ccc;
  } */

  .el-table__body button,
  .el-button {
    padding: 12px;
    box-sizing: border-box;
  }

  .box {
    padding: 20px 0;
    box-sizing: border-box;
  }

  .el-table__body button,
  .box button {
    /* width: 0; */
    margin: 0 7px;
    background: transparent;
    color: #338FE5;
    border: 0
  }
</style>