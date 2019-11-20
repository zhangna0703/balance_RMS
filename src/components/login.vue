<template>
  <div class="wrap">
    <img class="wrapbg" src="../assets/login.png" alt="">
    <div class="loginBox">
      <h2>动感平衡台后台管理系统</h2>
      <p class="users">
        <el-input v-model="loginform.user" placeholder="请输入用户名"></el-input>
      </p>
      <p class="pass">
        <el-input v-model="loginform.pwd" placeholder="请输入密码" show-password></el-input>
      </p>
      <p>
        <el-button type="primary" @click='login'>登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';
  export default {
    name: 'Login',
    data() {
      return {
        loginform: {
          user: '',
          pwd: ''
        },
        usertoken: ''

      }
    },
    methods: {
      ...mapActions({
        changeLogin:'login/changeLogin'
      }),
      login() {
        // let _this = this;
        if (this.loginform.user === '' || this.loginform.pwd === '') {
          this.$message({
            message: '账号或密码不能为空',
            type: 'warning'
          })
        }else{
          this.userToken = 'Bearer ' + 5164984616516516156
          // console.log(this)
          this.changeLogin({ Authorization: this.userToken });
          this.$router.push('/dataTree');
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
        }
        // else {
        //   this.axios({
        //     method: 'post',
        //     url: '/user/login',
        //     data: _this.loginForm
        //   }).then(res => {
        //     console.log(res.data);
        //     _this.userToken = 'Bearer ' + res.data.data.body.token;
        //     // 将用户token保存到vuex中
        //     _this.changeLogin({ Authorization: _this.userToken });
        //     _this.$router.push('/home');
        //     alert('登陆成功');
        //   }).catch(error => {
        //     alert('账号或密码错误');
        //     console.log(error);
        //   });
        // }
      }
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .wrapbg{
    
    width: 100%;
    height: 100%;
    position: relative;
  }
  .loginBox .el-button--primary {
    width: 100%;
  }

  .loginBox {
    background:rgba(53,56,60,1);
    border-radius:10px;
    border:1px solid rgba(70,67,72,1);
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -215px;
    margin-top: -151px;
    height: 290px;
    /* position: relative; */
    width: 430px;
    max-width: 100%;
    /* padding: 160px 35px 0; */
    /* margin: 0 auto; */
    overflow: hidden;
    box-sizing: border-box;
  }

  /* .loginBox .users {
    margin: 20px 30px;
  } */
  .loginBox p {
    display: flex;
    align-items: center;
    color: #fff;
    margin: 0 30px;
  }
  .loginBox .pass{
    margin: 24px 30px 36px;
  }
  .loginBox p span {
    width: 60px;
    display: block;
  }

  /* .el-input{
    height: 52px;
  }
  .el-input .el-input__inner{
    height: 100%;
  } */
  .loginBox h2 {
    margin: 19px auto 26px;
    text-align: center;
    font-size:21px;
font-family:PingFang-SC-Medium,PingFang-SC;
font-weight:500;
color:rgba(255,255,255,1);
  }


</style>