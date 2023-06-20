<template>
<body>
  <!-- header -->
  <el-row>
    <el-col :span="24">
      <div id="header" class="grid-content bg-purple-dark">
        <el-row type="flex" justify="space-between">
          <!-- header logo -->
          <el-col :span="4">
            <div id="headerLogo">
              <span>logo</span>
            </div>
          </el-col>

          <el-col :span="6">
            <span>header</span>
          </el-col>

          <!-- user zone -->
          <el-col :span="2">
            <div id="userZone">
              <el-row>
                <el-col :span="8">
                  <span>注册</span>
                </el-col>
                <el-col :span="8">
                  <span>登录</span>
                </el-col>
                <el-col :span="8">
                  <span>头像</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!-- search zone -->
  <el-row>
    <el-col :span="24">
      <div id="searchZone" class="grid-content bg-purple">
        <span>search zone</span>
        <el-row type="flex" justify="center">
          <el-col :span="10">
              <el-input v-model="input" placeholder="搜索文章" clearable></el-input>
          </el-col>
          <el-col :span="2">
              <el-button icon="el-icon-search" circle></el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!-- display zone -->
  <el-row>
    <el-col :span="24">
      <div id="displayZone" class="grid-content bg-purple-light">
        <span>display zone</span>
        <el-row>
          <!-- 侧边栏 -->
          <el-col :span="6">
            <span>侧边栏</span>
          </el-col>
          <!-- 文章列表 -->
          <el-col :span="18">
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140" />
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="address" label="地址" />
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!-- footer -->
  <el-row>
    <el-col :span="24">
      <div id="footer" class="grid-content bg-purple-dark">
        <span>footer</span>
      </div>
    </el-col>
  </el-row>
</body>

</template>

<script>
export default {
  name: 'App',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      input: '',
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#header {
  height: 32px
}
#searchZone {
  height: 164px
}

.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 0px;
  /* min-height: 128px; */
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
