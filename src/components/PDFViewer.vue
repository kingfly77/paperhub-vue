<template>
  <div id="pdf-wrapper">
    <canvas id='pdf-canvas' width="100px" height="100px" border="1px"></canvas>
    <!-- <div id='text-layer' class="textLayer"></div> -->
    <!-- <embed src="https://paperhub.oss-cn-chengdu.aliyuncs.com/papers/8d6b53b3-6ce4-4578-9b01-862e3db0b4bb.pdf"> -->
    <button @click="previewPDF">预览</button>
    <button @click="downloadPDF">下载</button>
    <span id="page-num"></span>
    <span id="page-count"></span>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist'
import TextLayerBuilder from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'

export default {
  name: 'PDFViewer',
  data () {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      canvas: null,
      ctx: null,
      scale: 5.0
    }
  },
  mounted () {
    this.wrapper = document.getElementById('pdf-wrapper')
    this.canvas = document.getElementById('pdf-canvas')
    this.textLayerDiv = document.getElementById('text-layer')
    this.ctx = this.canvas.getContext('2d')
  },
  methods: {
    renderPage (num) {
      console.log('render page')
      this.pageRendering = true
      this.pdfDoc.getPage(num).then(page => {
        console.log(page)
        var viewport = page.getViewport(this.scale)
        console.log(viewport)
        this.canvas.height = viewport.height
        this.canvas.width = viewport.width

        this.canvas.style.width = '100%'
        this.canvas.style.height = '100%'
        this.wrapper.style.width = Math.floor(viewport.width / this.scale) + 'pt'
        this.wrapper.style.height = Math.floor(viewport.height / this.scale) + 'pt'

        const renderContext = {
          canvasContext: this.ctx,
          viewport: viewport
        }

        // const renderTask = page.render(renderContext)

        page.render(renderContext).then(() => {
          return page.getTextContent()
        }).then((textContent) => {
          console.log(textContent)
          // // 创建文本图层div
          // const textLayerDiv = document.createElement('div')
          // textLayerDiv.setAttribute('class', 'textLayer')
          // // 将文本图层div添加至每页pdf的div中
          // this.wrapper.appendChild(textLayerDiv)

          // 创建新的TextLayerBuilder实例
          var textLayer = new TextLayerBuilder({
            textLayerDiv: this.textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewport
          })

          textLayer.setTextContent(textContent)
          textLayer.render()
        })
        document.getElementById('page-num').textContent = num
        //   renderTask.promise.then(() => {
        //     this.pageRendering = false
        //     if (this.pageNumPending !== null) {
        //       this.renderPage(this.pageNumPending)
        //       this.pageNumPending = null
        //     }
        //   }).catch(() => {
        //     console.log('render error')
        //   })
        // }).catch(err => {
        //   console.log(err)
        // })
      })
    },
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    onPrevPage () {
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    onNextPage () {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },
    previewPDF () {
      const url = 'https://paperhub.oss-cn-chengdu.aliyuncs.com/papers/8d6b53b3-6ce4-4578-9b01-862e3db0b4bb.pdf'
      pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        console.log(pdfDoc_)
        this.pdfDoc = pdfDoc_
        document.getElementById('page-count').textContent = this.pdfDoc.numPages
        this.renderPage(this.pageNum)
      }).catch(err => {
        console.log(err)
      })
    },
    downloadPDF () {
      const url = 'https://paperhub.oss-cn-chengdu.aliyuncs.com/papers/8d6b53b3-6ce4-4578-9b01-862e3db0b4bb.pdf'
      pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        const fileName = 'download.pdf'
        const fileData = pdfDoc_.output
        const blob = new Blob([fileData], {type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
