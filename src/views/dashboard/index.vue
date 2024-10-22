<template>
  <div class="dashboard-container">
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img class="w-20 h-20 mr-5 rounded-full" src="/public/bunny.gif" />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">
                今日天氣晴朗
              </p>
            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <!-- <el-statistic v-for="item in statisticData" :key="item.key" :value="item.value">
              <template #title>
                <div class="flex items-center">
                  <svg-icon :icon-class="item.iconClass" size="20px" />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
<template v-if="item.suffix" #suffix>/100</template>
</el-statistic> -->
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 數据卡片- 總瀏覽人次及會員人數 -->
    <el-row :gutter="20" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>總瀏覽人次： </div>
          <div>0 次</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>總會員人數： </div>
          <div>{{ memberCount }} 人</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>已審核會員： </div>
          <div>{{ memberApprovedCount }} 人</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>未審核會員： </div>
          <div>{{ memberPendingCount }} 人</div>
        </el-card>
      </el-col>

    </el-row>

    <!-- 數据卡片- 最新消息及文章篇數 -->
    <el-row :gutter="20" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>最新消息： </div>
          <div>{{ newsCount }} 則</div>

        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>醫療新知文章： </div>
          <div>{{ medicalKnowledgeCount }} 篇</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>專業醫療文章： </div>
          <div>{{ professionalMedicalCount }} 篇</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>衛教手術文章： </div>
          <div>{{ educationSurgeryCount }} 篇</div>
        </el-card>
      </el-col>

    </el-row>

    <!-- 數据卡片- 最新消息及文章瀏覽量 -->
    <el-row :gutter="20" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>最新消息瀏覽數： </div>
          <div>{{ newsViewsCount }} 次</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>醫療新知瀏覽數：</div>
          <div>{{ medicalKnowledgeViewsCount }} 次</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>專業醫療瀏覽數： </div>
          <div>{{ professionalMedicalViewsCount }} 次</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <div>衛教手術瀏覽數： </div>
          <div>{{ educationSurgeryViewsCount }} 次</div>
        </el-card>
      </el-col>

    </el-row>



    <!-- Echarts 图表 -->
    <!-- <el-row :gutter="10" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="8" class="mb-2" v-for="item in chartData" :key="item">
        <component :is="chartComponent(item)" :id="item" height="400px" width="100%"
          class="bg-[var(--el-bg-color-overlay)]" />
      </el-col>
    </el-row> -->
  </div>
</template>

<script setup lang="ts">
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types";
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

import { useUserStore } from "@/store/modules/user";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { getMemberCountApi, getMemberCountByStatusApi } from "@/api/member";

import { getArticleCountByGroupApi, getArticleViewsCountByGroupApi } from "@/api/article"


let memberCount = ref(0)
let memberApprovedCount = ref(0)
let memberPendingCount = ref(0)

let educationSurgeryCount = ref(0)
let educationSurgeryViewsCount = ref(0)

let medicalKnowledgeCount = ref(0)
let medicalKnowledgeViewsCount = ref(0)

let professionalMedicalCount = ref(0)
let professionalMedicalViewsCount = ref(0)

let newsCount = ref(0)
let newsViewsCount = ref(0)


//獲取總會員人數 及 已審核、未審核人數
const getMemberCount = async () => {
  let res = await getMemberCountApi()
  memberCount.value = res.data

  let approvedRes = await getMemberCountByStatusApi("1")
  memberApprovedCount.value = approvedRes.data

  let pendingRes = await getMemberCountByStatusApi("0")
  memberPendingCount.value = pendingRes.data


}

//獲取手術衛教文章數 及 瀏覽數
const getEducationSurgeryCount = async () => {
  const GROUP = "educationSurgery"
  let res = await getArticleCountByGroupApi(GROUP);
  educationSurgeryCount.value = res.data
  let viewsCountRes = await getArticleViewsCountByGroupApi(GROUP)
  educationSurgeryViewsCount.value = viewsCountRes.data
}

//獲取醫療新知文章數 及 瀏覽數
const getMedicalKnowledgeCount = async () => {
  const GROUP = "medicalKnowledge"
  let res = await getArticleCountByGroupApi(GROUP);
  medicalKnowledgeCount.value = res.data
  let viewsCountRes = await getArticleViewsCountByGroupApi(GROUP)
  medicalKnowledgeViewsCount.value = viewsCountRes.data
}

//獲取專業醫療文章數 及 瀏覽數
const getProfessionalMedicalCount = async () => {
  const GROUP = "professionalMedical"
  let res = await getArticleCountByGroupApi(GROUP);
  professionalMedicalCount.value = res.data
  let viewsCountRes = await getArticleViewsCountByGroupApi(GROUP)
  professionalMedicalViewsCount.value = viewsCountRes.data
}

//獲取最新消息則數 及 瀏覽數
const getNewsCount = async () => {
  const GROUP = "news"
  let res = await getArticleCountByGroupApi(GROUP);
  newsCount.value = res.data
  let viewsCountRes = await getArticleViewsCountByGroupApi(GROUP)
  newsViewsCount.value = viewsCountRes.data
}

//掛載時獲取首頁Dashboard數據
onMounted(() => {
  getMemberCount()
  getEducationSurgeryCount()
  getMedicalKnowledgeCount()
  getProfessionalMedicalCount()
  getNewsCount()
})



const userStore = useUserStore();
const date: Date = new Date();

const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，軒窗已自喜微涼🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.user.nickName + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.user.nickName + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.user.nickName + "！";
  } else {
    return "偷偷向銀河要了一把碎星，只等你閉上眼睛撒入你的夢中，晚安🌛！";
  }
});

const duration = 5000;

// 銷售額
const amount = ref(0);
const amountOutput = useTransition(amount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
amount.value = 2000;

// 访客數
const visitCount = ref(0);
const visitCountOutput = useTransition(visitCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
visitCount.value = 2000;

// IP數
const dauCount = ref(0);
const dauCountOutput = useTransition(dauCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
dauCount.value = 2000;

// 訂單量
const orderCount = ref(0);
const orderCountOutput = useTransition(orderCount, {
  duration: duration,
  transition: TransitionPresets.easeOutExpo,
});
orderCount.value = 2000;

// 右上角數量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todolist",
    title: "待辦",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "項目",
    key: "project",
  },
]);

interface CardProp {
  title: string;
  tagType: EpPropMergeType<
    StringConstructor,
    "primary" | "success" | "info" | "warning" | "danger",
    unknown
  >;
  tagText: string;
  count: any;
  dataDesc: string;
  iconClass: string;
}
// 卡片數量
const cardData = ref<CardProp[]>([
  {
    title: "訪客數",
    tagType: "success",
    tagText: "日",
    count: visitCountOutput,
    dataDesc: "總訪客數",
    iconClass: "visit",
  },
  {
    title: "IP數",
    tagType: "success",
    tagText: "日",
    count: dauCountOutput,
    dataDesc: "總IP數",
    iconClass: "ip",
  },
  {
    title: "銷售額",
    tagType: "primary",
    tagText: "月",
    count: amountOutput,
    dataDesc: "總IP數",
    iconClass: "money",
  },
  {
    title: "訂單量",
    tagType: "danger",
    tagText: "季",
    count: orderCountOutput,
    dataDesc: "總訂單量",
    iconClass: "order",
  },
]);
// 图表數据
const chartData = ref(["BarChart", "PieChart", "RadarChart"]);
const chartComponent = (item: string) => {
  return defineAsyncComponent(() => import(`./components/${item}.vue`));
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>
