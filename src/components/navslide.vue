<template>
  <div>
    <p class="wraptitle">动感平衡台后台管理系统</p>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#344058" text-color="#D0D0D0" router>
      <div v-for="item,index in mymenu" :key=index>
        <!--存在子菜单-->
        <el-submenu v-if="item.children" :index='item.name'>
          <template slot="title">
            <i :class="item.pathIcon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="subitem,subindex in item.children" :key=subindex :index='subitem.pathUrl'>
            <i :class="subitem.pathIcon"></i>
            <span>{{subitem.name}}</span>
          </el-menu-item>
        </el-submenu>
        <!--不存在子菜单-->
        <el-menu-item v-else :index='item.pathUrl'>
          <i :class="item.pathIcon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        mymenu: [
          // {
          //   "name": "登录",
          //   "pathUrl": "/Login",
          //   "pathIcon": "el-icon-s-custom"
          // },
          {
            "name": "数据统计",
            "pathUrl": "/DataTree",
            "pathIcon": "el-icon-s-data"
          }, {
              "name": "教练管理",
              "pathUrl": "/Coach",
              "pathIcon": "el-icon-s-grid"
          }, {
            "name": "运动员管理",
            "pathUrl": "/Athlete",
            "pathIcon": "el-icon-s-order"
          }, {
            "name": "密码修改",
            "pathUrl": "/Password",
            "pathIcon": "el-icon-setting"
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
  .wraptitle{
    font-size:19px;
    height:64px;
    background-color:#264C6F;
    color: #fff;
    text-align: center;
    line-height: 64px;
    border-right: solid 1px #e6e6e6;
  }
  .el-menu-vertical-demo {
    width: 250px;
    height: 100%;
  }
</style>