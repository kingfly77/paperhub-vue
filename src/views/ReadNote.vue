<template>
<body>
  <h3>Reading Note</h3>
  <el-row type="flex" justify="space-around">
    <el-col id="paperZone" class="wrapper" :span=11>
      <iframe id="pdfShower" :src='blob' />
    </el-col>
    <el-col class="wrapper" :span=11>
      <div id="noteShower" v-html="html"></div>
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

#noteShower {
    background-color: #ffffff;
    overflow: auto;
    width: 100%;
    height: 100%;
    /* max-height: 1000px; */
    text-align: left;
}

</style>
