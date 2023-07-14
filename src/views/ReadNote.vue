<template>
<body>
  <el-row>
    <el-col id="paperZone" :span=12>
      <iframe id="pdfShower" :src='blob' />
    </el-col>
    <el-col id="noteZone" :span=12>
      <div v-html="html"></div>
    </el-col>
  </el-row>
</body>

</template>

<script>
export default {
  name: 'ReadNote',
  data () {
    return {
      blob: '',
      html: ''
    }
  },
  created: function () {
    this.blob = this.$route.query.blob
    this.html = this.$route.query.html
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,
body,
#ReadNote {
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
    overflow: auto;
    max-height: 1000px;
    text-align: left;
}

#pdfShower {
  height: 1000px;
  width: 100%;
}

</style>
