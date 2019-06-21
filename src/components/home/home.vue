<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header>
      <TopHead></TopHead>
    </el-header>

    <el-container class="mybody">
      <!-- 侧栏 -->
      <el-aside width="200px">
        <SideBar></SideBar>
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
import TopHead from "../tophead/topHead";
import SideBar from "../sidebar/sideBar";
export default {
  components: {
    TopHead,
    SideBar
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

  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
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
