<template>
<body>
  <h3>Edit Note</h3>
  <el-row type="flex" justify="space-around">
    <el-col class="wrapper" :span=12>
      <iframe id="pdfShower" :src='blob' />
    </el-col>
    <el-col class="wrapper" :span=12>
      <div id="noteEditor">
        <v-md-editor v-model="note" @save="saveOrUpdateNote"></v-md-editor>
      </div>
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
  created () {
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
          this.$notify({
            title: '已保存',
            type: 'success',
            duration: 1500
          })
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
body {
  padding: 0px;
  margin: 0px;
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

.wrapper {
  padding: 1px;
  background-color: #efd7b3;
  height: 1000px;
}

#pdfShower {
  height: 100%;
  width: 100%;
  border-width: 0px;
}

#noteEditor {
    background-color: #ffffff;
    overflow: auto;
    width: 100%;
    height: 100%;
    /* max-height: 1000px; */
    text-align: left;
}

</style>
