<template>
<body>
  <!-- header -->
  <el-row>
    <el-col :span="24">
      <div id="header">
        <el-row type="flex" justify="end">
          <!-- header logo -->
          <!-- <el-col :span="4">
            <div id="headerLogo">
              <span>logo</span>
            </div>
          </el-col> -->

          <!-- user zone -->
          <el-col :span="2">
            <div id="userZone">
              <el-row>
                <el-col :span="8">
                  <el-button type="text" @click="registerDialogVisible = true"  v-if="!logined">注册</el-button>
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
                  <el-button type="text" @click="loginDialogVisible = true" v-if="!logined">登录</el-button>
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
                  <el-dropdown v-if="logined">
                    <span class="el-dropdown-link">
                      <img :src="profileUrl" width="32" height="32" />
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
      <div id="searchZone">
        <span>search zone</span>
        <el-row type="flex" justify="center">
          <!-- 搜索选项 -->
          <el-col :span="2">
            <el-select v-model="search_value" placeholder="请选择">
              <el-option
                v-for="item in search_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <!-- 搜索内容 -->
          <el-col :span="10">
              <el-input v-model="search_content" placeholder="搜索文章" clearable></el-input>
          </el-col>
          <!-- 搜索按钮 -->
          <el-col :span="2">
              <el-button @click="searchPaper" icon="el-icon-search" circle></el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!-- display zone -->
  <div id="displayZone">
    <el-row type="flex" justify="center">
      <!-- 侧边栏 -->
      <el-col :span="4" v-if="showSide">
        <el-menu
          default-active="search_paper"
          class="el-menu-vertical-demo1">
          <el-menu-item index="upload_paper" @click="handleMainMenuClick">
            <i class="el-icon-document"></i>
            <span slot="title">上传文章</span>
          </el-menu-item>
          <el-menu-item index="search_paper" @click="handleMainMenuClick">
            <i class="el-icon-reading"></i>
            <span slot="title">文章搜索</span>
          </el-menu-item>
          <el-menu-item index="my_precious" @click="handleMainMenuClick">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- 主要显示区域 -->
      <el-col :span="20">

        <!-- 上传文章 -->
        <el-row v-if="active === 'upload_paper'" type="flex" justify="center">
          <el-col :span="20">
            <div class="wrapper">
              <el-form id="uploadForm" ref="form" :rules="uploadRules" :model="uploadForm" label-width="150px" label-position="left" align="left">
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
                  <el-col :span="3">
                    <el-button type="primary" @click="uploadPaper">上传</el-button>
                  </el-col>
                  <el-col :span="3">
                    <el-button @click="reset">重置</el-button>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>

        <!-- paper列表展示 -->
        <el-row v-if="active === 'search_paper'" type="flex" justify="center">
          <el-col :span="20">
            <div class="paperDisplay wrapper">
              <el-table id="paperListTable"
                :data="paperList" :show-header="showHeader">
                <el-table-column  prop="item">
                  <template slot-scope="scope">
                    <div>
                      <el-link :underline="false" type="primary"  @click="showPaper(scope.row)">
                        <div v-html="scope.row.title"></div>
                      </el-link>
                      <br />
                      <span>作者：</span><span v-html="scope.row.authors"></span>
                      <br />
                      <span>发表于 </span> <span v-html="scope.row.year" /> 年 <span v-html="scope.row.publishedIn" />
                      <div v-html="scope.row.description" />
                      <span>用户 </span><span v-html="scope.row.uploadUname" /> <span> 于 </span> <span v-html="scope.row.uploadDate"/> <span> 上传</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <!-- paper阅读区 -->
        <el-row v-if="active === 'read_paper'" type="flex" justify="center">
          <el-col :span="22">
            <!-- 文章信息 -->
            <el-page-header id="pageHeader" @back="back" content="Reading"></el-page-header>
            <el-descriptions id="paperInfo" class="margin-top" :title="paper.title" :column="1" border>
              <template slot="extra">
                <el-row type="flex" justify="left">
                  <el-badge :value="200" :max="99" class="item">
                    <el-button size="small">评论</el-button>
                  </el-badge>
                </el-row>
              </template>
              <el-descriptions-item label="作者">{{paper.authors}}</el-descriptions-item>
              <el-descriptions-item label="发表时间">{{paper.year}}</el-descriptions-item>
              <el-descriptions-item label="发表期刊 & 会议">{{paper.publishedIn}}</el-descriptions-item>
              <el-descriptions-item label="文章描述">{{paper.description}}</el-descriptions-item>
              <el-descriptions-item label="评分">
                <el-rate
                  v-model="paper.stars"
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </el-descriptions-item>
            </el-descriptions>
            <el-row>
              <el-col :span="4">
                <!-- 阅读区侧边栏 -->
                <el-menu
                  default-active="reading"
                  class="el-menu-vertical-demo2">
                  <el-menu-item index="reading" @click="handleReadingMenuClick">
                    <span slot="title">文章阅读</span>
                  </el-menu-item>
                  <el-menu-item index="note" @click="handleReadingMenuClick">
                    <span slot="title">记录笔记</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="20">
                <el-row type="flex" justify="end" v-if="readingActive === 'reading'">
                  <el-col :span="24">
                    <!-- 文章阅读 -->
                    <div>
                      <iframe
                        class='wrapper'
                        :src='blob'
                        width="100%"
                        height="1000px"
                        />
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="end" v-if="readingActive === 'note'">
                  <el-col :span="24">
                    <!-- 笔记列表 -->
                    <div id="noteListDiv">
                      <h3>
                        我的笔记&nbsp;&nbsp;
                        <el-tooltip content="编辑"><el-button icon="el-icon-edit" @click="writeNote" circle></el-button></el-tooltip>
                        <el-tooltip content="阅读"><el-button icon="el-icon-reading" @click="readNote(myNotes[0].html)" circle></el-button></el-tooltip>
                      </h3>
                      <!-- 我的笔记 -->
                      <div class="wrapper">
                        <el-table id="myNotesListTable"
                          :data="myNotes" :show-header="showHeader">
                          <el-table-column  prop="item">
                            <template slot-scope="scope">
                              <div class="notePreviewWrapper">
                                <div class="notePreview" v-html="scope.row.html"></div>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <el-divider></el-divider>
                      <!-- 其他笔记 -->
                      <h3>其他用户的笔记</h3>
                      <div class="wrapper">
                        <el-table id="othersNotesListTable"
                          :data="othersNotes" :show-header="showHeader">
                          <el-table-column  prop="item">
                            <template slot-scope="scope">
                              <h3>
                                <span class="username">{{scope.row.uname}}</span> 的笔记&nbsp;&nbsp;
                                <el-tooltip content="阅读"><el-button icon="el-icon-reading" @click="readNote(scope.row.html)" circle></el-button></el-tooltip>
                              </h3>
                              <div class="notePreviewWrapper">
                                <div class="notePreview" v-html="scope.row.html"></div>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-col>

                </el-row>
              </el-col>
            </el-row>

          </el-col>
        </el-row>

        <!-- 收藏列表 -->
        <el-row v-if="active === 'my_precious'" type="flex" justify="center">
          <el-col :span="22">
            <div>
              <span>我的收藏</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>

  <!-- footer -->
  <!-- <el-row>
    <el-col :span="24">
      <div id="footer" class="grid-content bg-purple-dark">
        <span>footer</span>
      </div>
    </el-col>
  </el-row> -->
</body>

</template>

<script src="../node_modules/pdfjs-dist/build/pdf.js"></script>
<script>
import PDFViewer from '@/components/PDFViewer.vue'

export default {
  name: 'Main',
  components: {
    PDFViewer
  },
  data () {
    return {
      active: 'search_paper',
      readingActive: 'reading',
      preActive: '',
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
      urlMap: {},
      blob: '',
      loginFormLabelWidth: '60px',
      registerFormLabelWidth: '60px',
      logined: false,
      uid: '',
      username: '',
      profileUrl: '',
      tabPosition: 'left',
      paperList: [],
      noteList: [],
      myNotes: [],
      othersNotes: [],
      pageSize: 10,
      showHeader: false,
      showSide: true,
      paper: {
        pid: '',
        title: '',
        authors: '',
        year: '',
        publishedIn: '',
        public: '',
        url: '',
        description: ''
      },
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
      },
      search_options: [{
          value: 'all',
          label: '全部'
        }, {
          value: 'title',
          label: '标题'
        }, {
          value: 'authors',
          label: '作者'
        }, {
          value: 'year',
          label: '年份'
        }, {
          value: 'publishedIn',
          label: '期刊 & 会议'
        },{
          value: 'abstract',
          label: 'TODO: Abstract',
          disabled: true
        },{
          value: 'description',
          label: '描述'
        },{
          value: 'upload_uname',
          label: '发布用户'
        }],
        search_value: 'all',
        search_content: ''
    }
  },
  created: function () {
    console.log('created')
    this.urlMap = new Map()
    this.login_with_token()
    const items = ['all']
    const conditions = ['all']
    const contents = ['']
    const page = 1
    this.getPaperList(items, conditions, contents, page, this.pageSize)
  },
  watch: {
    // 当前激活菜单
    'active': {
      handler (newVal, oldVal) {
        console.log(`activate changed: ${oldVal} -> ${newVal}`)
        this.preActive = oldVal
        this.search_content = ''
        if (newVal === 'search_paper') {
          const items = ['all']
          const conditions = ['all']
          const contents = ['']
          const page = 1
          this.getPaperList(items, conditions, contents, page, this.pageSize)
        }
      }
    },
    // 文章阅读下的当前激活菜单
    'readingActive': {
        handler (newVal, oldVal) {
          console.log(`readingActivate changed: ${oldVal} -> ${newVal}`)
          if (newVal === 'note') {
            this.getNoteListByPid()
          }
        }
    }
  },
  methods: {
    // 主菜单切换
    handleMainMenuClick: function (item) {
      console.log(item.index)
      // this.$message.success(item.index)
      this.active = item.index
    },
    // 阅读区菜单切换
    handleReadingMenuClick: function (item) {
      console.log(item.index)
      this.readingActive = item.index
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
            this.logined = false
          } else {
            this.$message.error('登录失败，用户名或密码错误')
            this.logined = false
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('error!')
          this,logined = false
        })
    },
    // token 登录
    login_with_token: function () {
      // get token from cookie
      var token = this.$cookies.get('paperhub_login_token')
      console.log('get token from cookie: ' + token)
      if (token == null) {
        this.logined = false
        return
      }
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
          this.logined = true
        } else {
          console.log('token check failed.')
          this.logined = false
        }
      }).catch(err => {
        console.log(err)
        this.logined = false
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
    searchPaper: function () {
      let items = [this.search_value]
      let conditions = ['like']
      let contents = [this.search_content]
      let page = 1
      this.getPaperList(items, conditions, contents, page, this.pageSize)
    },
    test: function () {
      console.log('test:')
    },
    mappingPeperUrl: function (url) {
      console.log(this.urlMap)
      console.log(this.urlMap.has(url))
      if (this.urlMap.has(url)) {
        this.blob = this.urlMap.get(url)
        return
      }
      this.$http.get(url, {
        responseType: 'arraybuffer',
        timeout: 10000
      }).then(res => {
        console.log(res)
        console.log(res.data)
        let blob = new Blob([res.data], {type:'application/pdf'});
        this.blob = URL.createObjectURL(blob)
        this.urlMap.set(url, this.blob)
        console.log(this.blob)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取 paper 列表
    getPaperList: function (items, conditions, contents, page, pageSize) {
      // TODO: sort
      console.log('get paper list:')
      console.log('items: ' + items)
      console.log('conditions: ' + conditions)
      console.log('contents: ' + contents)
      console.log('page: ' + page)
      console.log('pageSize: ' + pageSize)
      this.$http.post('/paper/paper/list',
        {
          items: items,
          conditions: conditions,
          contents: contents,
          page: page,
          pageSize: pageSize
        },
        {
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
    },
    showPaper: function (paper) {
      console.log(paper)
      this.mappingPeperUrl(paper.url)
      this.active = 'read_paper'
      this.paper = paper
      this.showSide = false
    },
    // 从阅读区返回
    back: function () {
      this.active = this.preActive
      this.showSide = true
    },
    // 重置
    reset: function () {
      this.$confirm('是否重置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '表单信息已重置'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消重置'
        })
      })
    },
    // 写笔记
    writeNote: function () {
      console.log('write note!')
      let routeUrl = this.$router.resolve({
        path: "/write_note",
        query: {
            pid: this.paper.pid,
            uid: this.uid,
            blob: this.blob
        }
      })
      window.open(routeUrl.href, '_blank');
    },
    // 获取笔记列表
    getNoteListByPid: function () {
      console.log('get note list by pid: ' + this.paper.pid)
      this.$http.get(`/note/note/getNoteListByPid/${this.paper.pid}`)
      .then(res => {
        console.log(res)
        this.noteList = res.data.note_list
        this.myNotes = []
        this.othersNotes = []
        for (let i = 0; i < this.noteList.length; i++) {
          const note = this.noteList[i];
          const uid = note.uid
          if (uid === this.uid) {
            // myself note
            this.myNotes.push(note)
          } else this.othersNotes.push(note)
        }
        console.log('my notes: ' + this.myNotes.length)
        console.log('others notes: ' + this.othersNotes.length)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 全屏显示笔记
    readNote: function (html) {
      console.log('full screen note')
      let routeUrl = this.$router.resolve({
        path: "/read_note",
        query: {
            blob: this.blob,
            html: html
        }
      })
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>

<style>
html,
body,
#main {
  background: url("~@/assets/bg15.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  padding: 0px;
  /* background-color: #eceff6; */
}
#header {
  height: 32px;
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
.el-menu-vertical-demo1 {
  background-color: #ffffff00;
}
.el-menu-vertical-demo2 {
  background-color: #ffffff4e;
}

.highlight {
  background-color: #feffac;
}

#pageHeader {
  margin-bottom: 30px;
}

#paperInfo {
  margin-bottom: 30px;
}

#test {
  min-width: 0px;
}

.wrapper {
  padding: 1px;
  background-color: #efd7b3;
}

#paperListTable {
  padding: 20px;
}

#uploadForm {
  padding: 20px;
  background-color: #ffffff;
}

#noteListdiv {
  width: 100%;
}

.notePreview {
  background-color: #ffffff;
  /* margin: 10px 10px 10px 10px; */
  overflow: auto;
  max-height: 200px;
}

.notePreviewWrapper {
  background-color: #99a9bf;
  padding: 2px 2px 2px 2px;
  /* scale: 0.2; */
}

.username {
  color: #907afa;
  font-style: oblique;
}

iframe {
  border-width: 0px;
}

</style>
