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
                  <el-button type="text" @click="registerDialogVisible = true">注册</el-button>
                  <!-- 注册 dialog -->
                  <el-dialog title="注册" :visible.sync="registerDialogVisible" close-on-press-escape width="500px">
                    <el-form :model="registerForm">
                      <el-form-item label="用户名:" :label-width="registerFormLabelWidth">
                        <el-input v-model="registerForm.username" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码:" :label-width="registerFormLabelWidth">
                        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="registerDialogVisible = false">取 消</el-button>
                      <el-button type="primary" v-on:click="register">注 册</el-button>
                    </div>
                  </el-dialog>
                </el-col>
                <el-col :span="8">
                  <el-button type="text" @click="loginDialogVisible = true">登录</el-button>
                  <!-- 登录 dialog -->
                  <el-dialog title="登录" :visible.sync="loginDialogVisible" close-on-press-escape width="500px">
                    <el-form :model="loginForm">
                      <el-form-item label="用户名:" :label-width="loginFormLabelWidth">
                        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码:" :label-width="loginFormLabelWidth">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="loginDialogVisible = false">取 消</el-button>
                      <el-button type="primary" v-on:click="login">登 录</el-button>
                    </div>
                  </el-dialog>
                </el-col>
                <el-col :span="8">
                  <!-- 头像 -->
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <img :src="profileUrl" :v-show="showProfile" width="32" height="32" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><span v-text="username" /></el-dropdown-item>
                      <el-dropdown-item>个人主页</el-dropdown-item>
                      <el-dropdown-item>我的收藏</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
            <el-menu
              default-active="search_paper"
              class="el-menu-vertical-demo">
              <el-menu-item index="upload_paper" @click="handleMenuClick">
                <i class="el-icon-document"></i>
                <span slot="title">上传文章</span>
              </el-menu-item>
              <el-menu-item index="search_paper" @click="handleMenuClick">
                <i class="el-icon-reading"></i>
                <span slot="title">文章搜索</span>
              </el-menu-item>
              <el-menu-item index="my_precious" @click="handleMenuClick">
                <i class="el-icon-star-on"></i>
                <span slot="title">我的收藏</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <!-- 主要显示区域 -->
          <el-col :span="18">
            <div v-if="active === 'upload_paper'">
              <span>上传文章</span>
              <el-form ref="form" :rules="uploadRules" :model="uploadForm" label-width="100px" label-position="left">
                <el-form-item label="文章标题" prop="titles">
                  <el-input v-model="uploadForm.title"></el-input>
                </el-form-item>
                <el-form-item label="作者名单" prop="authors">
                  <el-input v-model="uploadForm.authors" placeholder="多个作者请以逗号（，）分隔"></el-input>
                </el-form-item>
                <el-form-item label="文章发表时间" prop="year">
                  <el-col :span="11">
                    <el-date-picker type="year" placeholder="选择日期" v-model="uploadForm.year" value-format="yyyy" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="发表期刊/会议" prop="publishedIn">
                  <el-input v-model="uploadForm.publishedIn"></el-input>
                </el-form-item>
                <el-form-item label="是否公开" prop="public">
                  <el-radio-group v-model="uploadForm.public">
                    <el-radio label="私有"></el-radio>
                    <el-radio label="公开"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="文章描述" prop="description">
                  <el-input type="textarea" v-model="uploadForm.description" placeholder="文章描述" maxlength="500" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="上传pdf" prop="url">
                  <!-- <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过100Mb</div>
                  </el-upload> -->
                  <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:20000/oss/upload_paper"
                    accept=".pdf"
                    :limit="1"
                    :auto-upload="true"
                    :on-exceed="uploadExceed"
                    :on-success="uploadSuccess">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传pdf文件，且不超过50Mb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="uploadPaper">上传</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="active === 'search_paper'">
                <el-table
                  :data="paperList"
                  style="width: 100%">
                  <el-table-column prop="item">
                    <template slot-scope="scope">
                      <div>
                         <el-link :underline="false" type="primary">
                            <h3>{{scope.row.title}}</h3>
                         </el-link>
                        <h4>作者：{{scope.row.authors}}</h4>
                        <h4>发表于 {{scope.row.year}} 年 {{scope.row.publishedIn}} </h4>
                        <h5>{{scope.row.description}}</h5>
                        <div>用户 {{scope.row.uploadUser}} 于 {{scope.row.uploadDate}} 上传</div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            <div v-if="active === 'my_precious'">
              <span>我的收藏</span>
            </div>
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
    return {
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }],
      active: 'search_paper',
      input: '',
      loginDialogVisible: false,
      registerDialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      },
      uploadForm: {
        title: '',
        authors: '',
        year: '',
        publishedIn: '',
        public: '',
        url: '',
        description: ''
      },
      loginFormLabelWidth: '60px',
      registerFormLabelWidth: '60px',
      logined: false,
      uid: '',
      username: '',
      showProfile: false,
      profileUrl: '',
      tabPosition: 'left',
      paperList: [],
      uploadRules: {
        // title: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // authors: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // year: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // publishedIn: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // public: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // url: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // description: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  created: function () {
    console.log('created')
    this.login_with_token()
    this.getAllPaperList()
  },
  watch: {
    // 当前激活菜单
    'active': {
      handler (newVal, oldVal) {
        console.log(`activate changed: ${oldVal} -> ${newVal}`)
        if (newVal === 'search_paper') {
          this.getAllPaperList()
        }
      }
    }
  },
  methods: {
    load: function () {
      this.count += 2
    },
    // 菜单切换
    handleMenuClick: function (item) {
      console.log(item.index)
      // this.$message.success(item.index)
      this.active = item.index
    },
    // 登录
    login: function () {
      this.$http.post('/user/user/login',
        { username: this.loginForm.username,
          password: this.$md5(this.loginForm.password)}, {
          headers: {
            'content-type': 'application/json;charset=utf-8',
            'accept': 'application/json;charset=utf-8'
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.login_success) {
            // save token in cookie
            this.$cookies.set('paperhub_login_token', res.data.token)
            this.$message.success('登录成功！')
            var token = this.$cookies.get('paperhub_login_token')
            console.log('token saved in cookie:' + token)
            // invisible login dialog
            this.loginDialogVisible = false
            this.logined = true
            this.uid = res.data.uid
            this.username = res.data.username
            // show profile
            this.profileUrl = res.data.profile
            this.showProfile = true
          } else {
            this.$message.error('登录失败，用户名或密码错误')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('error!')
        })
    },
    // token 登录
    login_with_token: function () {
      // get token from cookie
      var token = this.$cookies.get('paperhub_login_token')
      console.log('get token from cookie: ' + token)
      if (token == null) return
      // try login with token
      this.$http.post('/user/user/login_with_token',
        { token: token },
        {
          headers: {
            'content-type': 'application/json;charset=utf-8',
            'accept': 'application/json;charset=utf-8'
          }
        }
      ).then(res => {
        console.log(res)
        if (res.data.login_success) {
          console.log('login success.')
          this.loginDialogVisible = false
          this.logined = true
          this.uid = res.data.uid
          this.username = res.data.username
          // show profile
          this.profileUrl = res.data.profile
          this.showProfile = true
        } else {
          console.log('token check failed.')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 注册
    register: function () {
      this.$http.post('/user/user/register',
        { username: this.registerForm.username,
          password: this.$md5(this.registerForm.password)}, {
          headers: {
            'content-type': 'application/json;charset=utf-8',
            'accept': 'application/json;charset=utf-8'
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.register_success) {
            this.$message.success('注册成功！')
            // invisible register dialog
            this.registerDialogVisible = false
          } else {
            this.$message.error('注册失败，' + res.data.fail_reason)
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('error!')
        })
    },
    // 上传 paper
    uploadPaper () {
      console.log('is logined: ' + this.logined)
      if (!this.logined) {
        this.$message.warning('尚未登录，请先注册或登录后上传。')
        return
      }
      this.$http.post('/paper/paper/upload',
        { title: this.uploadForm.title,
          authors: this.uploadForm.authors,
          year: this.uploadForm.year,
          publishedIn: this.uploadForm.publishedIn,
          public: this.uploadForm.public,
          description: this.uploadForm.description,
          url: this.uploadForm.url,
          uploadUid: this.uid,
          uploadUname: this.username },
        {
          headers: {
            'content-type': 'application/json;charset=utf-8',
            'accept': 'application/json;charset=utf-8'
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.success) this.$message.success('上传成功！')
          else this.$message.error(res.data.error_msg)
        })
        .catch(err => {
          console.log(err)
          this.$message.error(err.message)
        })
    },
    uploadExceed: function () {
      this.$message.warning('您已添加了一个文件，如需替换，请先删除已添加的文件！')
    },
    uploadSuccess (res) {
      console.log(res)
      if (res.code === 200) {
        if (res.data.success) {
          this.$message.success('文件上传成功，url: ' + res.data.url)
          this.uploadForm.url = res.data.url
        } else {
          this.$message.error('upload failed: ' + res.data.error_msg)
        }
      } else {
        this.$message.error('error!')
      }
    },
    // 获取 paper 列表
    getAllPaperList: function () {
      console.log('get all paper list')
      this.$http.get('/paper/paper/list_all', {
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'accept': 'application/json;charset=utf-8'
        }
      })
        .then(res => {
          console.log(res)
          this.paperList = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
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
