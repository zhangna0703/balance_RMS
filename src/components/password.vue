<template>
  <div class="passwrap">
    <Navslide></Navslide>
    <div class="passbox">
      <div class="navbox">欢迎您，管理员</div>
      <h3>密码修改</h3>
      <!-- 
        <el-input v-model="oldpwd" placeholder="请输入旧密码" show-password></el-input>
        <el-input v-model="newpwd" placeholder="请输入6—12位数字字母组合新密码" show-password></el-input>
        <el-input v-model="surepwd" placeholder="请确认6—12位数字字母组合新密码" show-password></el-input>
        <el-button type="primary">保存</el-button>
      </div> -->
      <div class="box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
          <el-form-item label="原密码" prop="pass">
            <el-col :span="8">
              <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-col :span="8">
              <el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="重复新密码" prop="checknewpass">
            <el-col :span="8">
              <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="submitForm('ruleFormRef')">保存</el-button>
        </div>
        </el-tab-pane>
      </div>
     

    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  export default {
    name: 'password',
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        
        rules: {
          pass: [{ required: true, message: "请输入密码" }],
          newpass: [{ required: true, message: "请输入新密码" }],
          checknewpass: [{ required: true, validator: validatePass2, trigger: "blur" }]
        },
        ruleForm: {
          pass: '',
          newpass: '',
          checknewpass: ''
        }
      }
    },
    components: {
      Navslide
    },
    methods: {
      submitForm(item) {
        if (this.ruleForm.newpass == this.ruleForm.checknewpass) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }
      
    },
  }
  // export default {
  //   data() {
  //     return {
  //       oldpwd: '',
  //       newpwd: '',
  //       surepwd: ''
  //     }
  //   },
  //  
  components: {
    Navslide
  }
  // }

</script>
<style scoped>
  .passwrap {
    display: flex;
    width: 100%;
  }

  .passbox {
    background: #f2f2f2;
    width: 100%;
    height: 100%;
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

  .el-menu-vertical-demo {
    width: 250px;
    height: 100%;
  }

  .passbox .box {
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
    box-sizing: border-box;
  }

  .el-input {
    width: 500px;
    margin: 10px 0;
    height: 50px;
  }

  .box .el-button--primary {
    width: 100px;
  }
</style>