<!--  -->
<template>
  <section class="article-section">
    <el-card class="article-card">
      <h1>活動花絮文章管理</h1>
      <ArticleTable :table="eventHighlightsList" :getApi="getEventHighlights" :addApi="addEventHighlights"
        :deleteApi="deleteEventHighlights" :batchDeleteApi="batchDeleteEventHighlights" :group="GROUP">
      </ArticleTable>
    </el-card>

  </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
import ArticleTable from '@/components/ArticleTable/index.vue'
import { getAllArticleByGroupByPaginationApi, addArticleApi, deleteArticleApi, batchDeleteArticleApi } from '@/api/article'
import { transFormPaginationByArticle } from '@/utils/transFormData'


//獲取路由
const route = useRoute()
//獲取路由器
const router = useRouter()
//設定article_group 
const GROUP = "eventHighlights"

//後端獲取Page資料後要傳給子組件的數據
let eventHighlightsList = reactive({})

//獲取最新消息
const getEventHighlights = async (page: number, size: number) => {
  let res = await getAllArticleByGroupByPaginationApi(GROUP, page, size)
  let transData = transFormPaginationByArticle(res.data, "articleId")
  Object.assign(eventHighlightsList, transData)
  // console.log('這是轉換後的數據', eventHighlightsList)
}

//新增最新消息
const addEventHighlights = async (data: any) => {
  // console.log('子組件傳來的data', data)
  let res = await addArticleApi(data)
  const currentPath = route.fullPath
  router.push(currentPath + '/' + res.data)
  getEventHighlights(1, 10)
}

//刪除最新消息
const deleteEventHighlights = async (id: number) => {
  await deleteArticleApi(id)
  getEventHighlights(1, 10)
}

//批量刪除最新消息
const batchDeleteEventHighlights = async (data: any) => {
  await batchDeleteArticleApi(data)
  getEventHighlights(1, 10)
}

//頁面掛載時獲取數據
onMounted(() => {
  getEventHighlights(1, 10)
})



</script>

<style scoped lang="scss">
//這個組件的setion
.article-section {
  width: 95%;
  margin: 0 auto;


  //這個組件的card
  .article-card {
    margin-top: 2%;
    margin-bottom: 2%;

    //這個組件的標題
    h1 {
      text-align: center;
      font-size: 2rem;
      margin: 1% 0;
    }

  }
}
</style>
