<template>
  <div class="Athletewrap">
    <Navslide></Navslide>
    <div class="passbox">
      <Exitnav></Exitnav>
      <div class="marginBox">
        <div class="bigbox">
          <h3>运动员管理</h3>
          <div class="btnBox">
            <div>
              <el-button type="primary" @click="addtr">添加运动员</el-button>
              <el-button type="primary" class="kong" @click='batchDel'>批量删除</el-button>
            </div>
            <div class="btn">
              <el-button type="primary" class="kong" @click="outExe">EXCEL导出</el-button>
              <el-upload class="upload-demo" action="/api/import/runners" :on-preview="handlePreview"
                :on-remove="handleRemove" multiple >
                <el-button type="primary" class="kong">EXCEL导入</el-button>
              </el-upload>
              <!-- <el-button type="primary" class="kong">EXCEL导入
            <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
          </el-button> -->

            </div>
          </div>
          <div class="box">
            <el-table
              :header-cell-style="{background:'rgba(248,248,248,1)',color:'#3C4044',fontWeight:500,borderTop:'#F2F2F2 1px solid'}"
              ref="multipleTable" :data="firstdata" tooltip-effect="dark" style="width: 100%"
              @selection-change='selsChange'>
              <el-table-column type="selection" min-width="5%" align='center'>
              </el-table-column>
              <el-table-column label="序号" min-width="5%" align='center' type='index'>
              </el-table-column>

              <!-- <el-table-column label="教练id" min-width="15%" align='center'>
                <template slot-scope='scope'>
                  <span type="text" v-if="scope.row.username=='add'"></span>
                  <span v-else>{{ scope.row.id }}</span>
                </template>
              </el-table-column> -->
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
              <el-table-column label="年龄" min-width="17%" align='center'>
                <template slot-scope='scope'>
                  <div>
                    <el-date-picker v-if="scope.row.edit" v-model="scope.row.birth" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                    <div v-else>
                      <el-date-picker v-if="scope.row.birth=='add'" v-model="birth" type="date" placeholder="选择日期时间">
                      </el-date-picker>
                      <span v-else>{{ scope.row.birth }}</span>
                    </div>
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
              <el-table-column label="所属教练" min-width="10%" align='center'>
                <template slot-scope='scope'>
                  <div>
                    <el-select v-model="scope.row.parentName" placeholder="请选择" v-if="scope.row.edit">
                      <el-option v-for="item in selfoption" :key="item.code" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                    <div v-else>
                      <el-select v-model="self" placeholder="请选择" v-if="scope.row.self=='add'">
                        <el-option v-for="item in selfoption" :key="item.code" :label="item.name" :value="item.code">
                        </el-option>
                      </el-select>
                      <span v-else>{{ scope.row.parentName }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="30%" align='center'>
                <template slot-scope='scope'>
                  <div>
                    <div v-if='scope.row.edit'>
                      <el-button type="primary" @click='editline(scope.row,scope.$index)'>保存</el-button>
                      <el-button type="primary" @click='editcancle(scope.row)'>取消</el-button>
                    </div>
                    <div v-else>
                      <div v-if="scope.row.username=='add'">
                        <el-button type="primary" @click='addline'>保存</el-button>
                        <el-button type="primary">取消</el-button>
                      </div>
                      <div v-else>
                        <el-button type="primary" @click='edit(scope.row)'>编辑</el-button>
                        <el-button type="primary" @click='resetPwd(scope.row.userCode)'>重置密码</el-button>
                        <el-button type="primary" @click='deleteRow(scope.row)'>删除</el-button>
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
        fileList: [],
        centerDialogVisible: false,
        excelData: [],
        currentPage4: 1,
        options: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        selfoption: [],
        tableData: [{
          id: '',
          username: "add",
          sex: "add",
          birth: 'add',
          height: 'add',
          weight: 'add',
          mobile: 'add',
          self: 'add'
        }],
        firstdata: [],
        username: '',
        sex: '',
        birth: '',
        height: '',
        weight: '',
        mobile: '',
        self: '',
        selfCode: '',
        selsArr: [],
        pageNum: 1,
        pageSize: 5,
        firstdataLEN: 0
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
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        this.getMember();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
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
          // this.getMember()
        })
      },
      edit(item) {
        item.edit = true
      },
      getMember() {
        let data = {
          level: 2,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        memberMessage(data).then((res) => {
          // console.log(res)
          res.data.rows.forEach((item, i) => {
            item.edit = false;
            if (item.sex == 0) {
              item.sex = '女'
            } else {
              item.sex = '男'
            }
          })
          this.firstdata = res.data.rows
        })
      },
      getMemberLEN() {
        let data = {
          level: 2
        }
        memberMessage(data).then((res) => {
          this.firstdataLEN = res.data.data.length
        })
      },
      // 导出
      outExe() {
        this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelData = this.firstdata //你要导出的数据list。
          this.export2Excel()
        }).catch(() => {

        });
      },
      export2Excel() {
        var that = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('../excel/Export2Excel'); //这里必须使用绝对路径
          const tHeader = ['姓名', '性别', '年龄', '身高（c m）', '体重（k g）', '手机号', '所属教练']; // 导出的表头名
          const filterVal = ['username', 'sex', 'birth', 'height', 'weight', 'mobile', 'parentName']; // 导出的表头字段名
          const list = that.excelData;
          const data = that.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, `运动员信息`);// 导出的表格名称，根据需要自己命名
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      addtr() {
        this.firstdata = this.tableData.concat(this.firstdata);
      },



      selsChange(sels) {
        this.selsArr = [];
        sels.forEach((item, i) => {
          this.selsArr.push(item.userCode)
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
      editline(item, index) {
        function formateDate(datetime) {
          function addDateZero(num) {
            return (num < 10 ? "0" + num : num);
          }
          let d = new Date(datetime);
          let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
          return formatdatetime;
        }
        console.log(item,'编辑保存',this.selfCode)
        item.edit = false
        let data = {
          targetUserCode: item.userCode,
          username: item.username,
          sex: item.sex,
          birth: formateDate(item.birth),
          height: item.height * 1,
          weight: item.weight * 1,
          mobile: item.mobile,
          parentUserCode:this.selfCode,
        }
        // editMember(data).then((res) => {
        //   if (res.data.code == 200) {
        //     this.$message({
        //       message: '修改成功',
        //       type: 'success'
        //     })
        //   }
        //   this.getMember()
        // })
      },
      editcancle(item, index) {
        item.edit = false
      },
      addline() {
        function formateDate(datetime) {
          function addDateZero(num) {
            return (num < 10 ? "0" + num : num);
          }
          let d = new Date(datetime);
          let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
          return formatdatetime;
        }
        console.log(this.self,'addline',this.selfCode)
        if (!this.username == '' && !this.sex == '' && !this.birth == '' && !this.height == '' && !this.weight == '' && !this.mobile == '' && !this.self == '') {
          if (this.sex == '男') {
            this.sex = 1
          } else {
            this.sex = 0
          }
          let data = {
            username: this.username,
            sex: this.sex,
            birth: formateDate(this.birth),
            height: this.height * 1,
            weight: this.weight * 1,
            mobile: this.mobile,
            parentUserCode: this.self,
            // edit: false,
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
          this.username = '';
          this.sex = '';
          this.birth = '';
          this.height = '';
          this.weight = '';
          this.mobile = '';
          this.self = '';
        }
      },
      resetPwd(code) {
        this.centerDialogVisible = true
        this.passuserCode = code
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
      handleSizeChange(val) {
        this.pageSize = val
        this.getMember();
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getMember();
      }
    }
  }
</script>
<style scoped>
  .box button {
    /* width: 0; */
    margin: 0 7px;
    background: transparent;
    color: #338FE5;
    border: 0
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin: 15px 30px 0 0;
  }

  .Athletewrap {
    width: 100%;
    display: flex;
  }

  .kong {
    border: solid 1px #409EFF;
    background: #fff;
    color: #409EFF;
  }

  .el-menu-vertical-demo {
    width: 250px;
    height: 100%;
  }

  .marginBox {
    padding: 19px 24px;
  }

  .bigbox {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 2px 0px rgba(0, 21, 41, 0.12);
    border-radius: 2px;
    border: 1px solid rgba(230, 235, 239, 1);
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

  input.active {
    border: solid 1px red;

  }

  .btnBox {
    padding: 20px 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between
  }

  .btn {
    display: flex;
    width: 250px;
    justify-content: space-between;
    align-items: center;
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
    font-size: 16px;

    font-weight: 500;
    color: rgba(101, 107, 113, 1);
    box-sizing: border-box;
    border-bottom: solid 1px #E7E8EF
  }

  .box {
    padding: 20px 0;
    box-sizing: border-box;
  }
</style>