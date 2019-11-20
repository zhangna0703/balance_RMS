<template>
  <div>
    <div class="navbox">
      <div class="titlebox">
      <span>欢迎您，管理员</span>  
        <el-dropdown>
            <span class="door"><img src="../assets/exit.png" alt=""></span>
          <el-dropdown-menu slot="dropdown" @click='exit'>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      exit(){
        console.log(1)
        // this.$router.push('/login')
      }
    },
  }
</script>
<style>
  .navbox {
    height: 64px;
    background: #fff;
    padding-right: 10px;
    box-sizing: border-box;
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  }
  .titlebox{
    display: flex;
    height: 100%;
    justify-content: flex-end;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(101, 107, 113, 1);
    align-items: center;
  }
  .titlebox>span{
    margin-right: 10px;
  }
  .door{
    margin-top: 5px;
  }
</style>