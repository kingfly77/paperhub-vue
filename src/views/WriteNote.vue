<template>
<body>
  <el-row>
    <el-col id="paperZone" :span=12>
      <iframe id="pdfShower" :src='blob' />
    </el-col>
    <el-col id="noteZone" :span=12>
      <template>
        <v-md-editor v-model="note" height="1000px" @save="saveOrUpdateNote"></v-md-editor>
        <!-- <v-md-preview :text="text" height="1000px"></v-md-preview> -->
      </template>
    </el-col>
  </el-row>
</body>

</template>

<script>
export default {
  name: 'WriteNote',
  data () {
    return {
      pid: '',
      uid: '',
      blob: '',
      note: ''
    }
  },
  created: function () {
    this.pid = this.$route.query.pid
    this.uid = this.$route.query.uid
    this.blob = this.$route.query.blob
    console.log('uid: ' + this.uid)
    console.log('pid: ' + this.pid)
    this.getNote()
  },
  methods: {
    // 获取笔记
    getNote: function () {
      this.$http.get('/note/note/getNote',
        {
          params: {pid: this.pid, uid: this.uid}
        })
        .then(res => {
          console.log(res)
          this.note = res.data.text
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 保存笔记
    saveOrUpdateNote: function (text, html) {
      console.log(text)
      console.log(html)
      this.$http.post('/note/note/saveOrUpdate',
        {
          pid: this.pid,
          uid: this.uid,
          text: text,
          html: html
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,
body,
#WriteNote {
  font-family: "微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-attachment: fixed;
  padding: 0px;
  height: 100%;
  width: 100%;
  /* background-color: #eceff6; */
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

#paperZone {
    background-color: #ffffff;
}

#noteZone {
    background-color: #ffffff;
}

#pdfShower {
  height: 1000px;
  width: 100%;
}

</style>
