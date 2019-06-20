<template>
  <el-container class="home">
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
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
  text-align: center;
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
</style>
