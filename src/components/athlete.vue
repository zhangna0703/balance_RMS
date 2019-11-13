<template>
  <div class="Athletewrap">
    <Navslide></Navslide>
    <div class="passbox">
      <div class="navbox">欢迎您，管理员</div>
      <h3>教练管理</h3>
      <div class="btnBox">
        <el-button type="primary" @click="addtr">添加运动员</el-button>
        <el-button type="primary">批量删除</el-button>

      </div>
      <div class="box">
        <el-table ref="multipleTable" :data="firstdata" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" min-width="5%" align='center'>
          </el-table-column>
          <el-table-column label="序号" min-width="5%" align='center' type='index'>
            <!-- <template slot-scope='scope'>
                  <div>
                    <span>{{ scope.row.id }}</span>
                  </div>
                </template> -->
          </el-table-column>
          <el-table-column label="姓名" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-if="scope.row.name=='add'" v-model='name' />
                <span v-else>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="性别" min-width="9%" align='center'>
            <template slot-scope='scope'>
              <div>
                <el-select v-model="sex" placeholder="请选择" v-if="scope.row.sex=='add'">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.sex }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="年龄" min-width="7%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-if="scope.row.count=='add'" v-model='count' />
                <span v-else>{{ scope.row.count }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="身高(cm)" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-if="scope.row.height=='add'" v-model='height' />
                <span v-else>{{ scope.row.height }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="体重(kg)" min-width="8%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-if="scope.row.weight=='add'" v-model='weight' />
                <span v-else>{{ scope.row.weight }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="手机号" min-width="10%" align='center'>
            <template slot-scope='scope'>
              <div>
                <input type="text" v-if="scope.row.phone=='add'" v-model='phone' />
                <span v-else>{{ scope.row.phone }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="所属教练" min-width="10%" align='center'>
            <template slot-scope='scope'>
              <div>
                <el-select v-model="self" placeholder="请选择" v-if="scope.row.self=='add'">
                  <el-option v-for="item in selfoption" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.self }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="30%" align='center'>
            <template slot-scope='scope'>
              <div>
                <div v-if="scope.row.name=='add'">
                  <el-button type="primary" @click='addline'>保存</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
                <div v-else>
                  <el-button type="primary">编辑</el-button>
                  <el-button type="primary">重置密码</el-button>
                  <el-button type="primary">删除</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
          layout=" sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  export default {
    name: 'Coach',
    components: {
      Navslide
    },
    data() {
      return {
        currentPage4: 4,
        options: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        selfoption: [{
          value: '选项1',
          label: '赵宏伟'
        }, {
          value: '选项2',
          label: '王小虎'
        }],
        tableData: [{
          id: '',
          name: "add",
          sex: "add",
          count: 'add',
          height: 'add',
          weight: 'add',
          phone: 'add',
          self: 'add'
        }],
        firstdata: [{
          id: 1,
          name: '王择欧',
          sex: '男',
          count: 15,
          height: '155',
          weight: '45',
          phone: '15456655885',
          self: '赵宏伟'
        }, {
          id: 2,
          name: '周阿西',
          sex: '女',
          count: 26,
          height: '155',
          weight: '45',
          phone: '15456655885',
          self: '赵宏伟'
        }, {
          id: 3,
          name: '王择欧',
          sex: '女',
          count: 25,
          height: '155',
          weight: '45',
          phone: '15456655885',
          self: '赵宏伟'
        }],
        name: '',
        sex: '',
        count: '',
        height: '',
        weight: '',
        phone: '',
        self: '',
      }
    },

    methods: {
      addtr() {
        this.firstdata = this.tableData.concat(this.firstdata);
      },
      addline() {
          console.log(this.name,this.firstdata)
        if (!this.name == '' && !this.sex == '' && !this.count == '' && !this.height == '' && !this.weight == '' && !this.phone == '' && !this.self == '') {
          this.firstdata.splice(0, 1, {
            name: this.name,
            sex: this.sex,
            count: this.count,
            height: this.height,
            weight: this.weight,
            phone: this.phone,
            self: this.self,
            edit: false
          })
          this.name = '';
            this.sex = '';
            this.count = '';
            this.height = '';
            this.weight = '';
            this.phone = '';
            this.self = '';
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style scoped>
  .Athletewrap {
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

  input.active {
    border: solid 1px red;

  }

  .btnBox {
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