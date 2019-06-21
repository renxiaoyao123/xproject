<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="4">
          <div>
            <img src="../../assets/images/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <h1>电商后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <a href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="mybody">
      <!-- 侧栏 -->
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" :unique-opened="true" :router="true">
          <el-submenu v-for="(role,index) in roles" :key="role.id" :index="index +''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{role.authName}}</span>
            </template>
            <el-menu-item
              v-for="subRole in role.children"
              :key="subRole.id"
              :index="'/' + subRole.path"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subRole.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 页面主体 -->
      <el-main>
        <!-- Main -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      roles: []
    };
  },
  mounted() {
    this.$http({
      method: "get",
      url: "http://localhost:8888/api/private/v1/menus",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjozMCwiaWF0IjoxNTYxMDI1MDAxLCJleHAiOjE1NjExMTE0MDF9.qwmMWUmDtJAZ-AJxKvbTa_Ji0BFvDT2fiMyN6b6W14w"
      }
    }).then(res => {
      console.log(res);
      if (res.data.meta.status === 200) {
        this.roles = res.data.data;
        // console.log(this.roles);
      }
    });
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.home {
  height: 100%;
}
.home h1 {
  color: #fff;
}
.mybody {
  height: 100%;
}
.right a {
  text-decoration: none;
  color: gold;
  float: right;
}
.el-menu {
  width: 200px;
  height: 100%;
}
</style>
