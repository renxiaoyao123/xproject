<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 -->
    <el-row>
      <div class="search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" clearable v-model="query">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="2">
          <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </div>
    </el-row>

    <!-- 用户信息表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="40"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="280" align="center"></el-table-column>
      <el-table-column label="用户状态" width="80" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch
            @change="(val)=>{switchChange(val,scope.row.id)}"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="用户操作" align="center">
        <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
        <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currChange"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagenums"
    ></el-pagination>

    <!-- 新增用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="adduser.moblie"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduserFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      query: "",
      tableData: [],
      pagenum: 1,
      pagenums: 400, //总条数
      pagesize: 3, //每页的条数
      pagesizes: [3, 6, 9],
      adduser: {
        //添加的用户数据
        username: "",
        password: "",
        email: "",
        moblie: ""
      }
    };
  },

  methods: {
    //获取用户信息
    gettabledata() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users?pagenum=${
          this.pagenum
        }&pagesize=${this.pagesize}&query=${this.query}`,

        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.users;
        this.pagenums = res.data.data.total;
      });
    },
    //页容量发生改变时执行
    sizeChange(pagesize) {
      //   console.log(pagesize);
      this.pagesize = pagesize;
      this.gettabledata();
    },
    //当前页改变时触发
    currChange(currentPage) {
      //   console.log(currentPage);
      this.pagenum = currentPage;
      this.gettabledata();
    },
    //根据关键字查询用户
    search() {
      this.gettabledata();
    },
    //添加用户
    adduserFn() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.adduser,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        if (res.data.meta.status === 201) {
          (this.dialogFormVisible = false), this.gettabledata();
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      });
    },
    //用户状态
    switchChange(val, id) {
      //   console.log(val, id);
      this.$http({
        method: "put",
        url: `http://localhost:8888/api/private/v1/users/${id}/state/${val}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        if (res.data.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      });
    }
  },
  mounted() {
    this.gettabledata();
  }
};
</script>

<style>
.search {
  height: 100%;
  margin-top: 20px;
}
</style>
