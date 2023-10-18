<template>
  <input ref="input" class="zl-date" type="text" readonly="true" placeholder="年/月/日" />
  <div class="zl-date-container" style="clear: both">
    <div style="clear: both">
      <div class="zl-date-head" @click="subYear">&lt;&lt;</div>
      <div class="zl-date-head" @click="subMonth">&lt;</div>
      <div class="zl-date-head month">{{ locale[language].date.month[month] }}</div>
      <div class="zl-date-head year">{{ year + locale[language].date.year }}</div>
      <div class="zl-date-head" @click="addMonth">&gt;</div>
      <div class="zl-date-head right" @click.prevent="addYear">&gt;&gt;</div>
    </div>
    <div style="clear: both">
      <div
        class="zl-date-week"
        :class="{ right: index === 6 }"
        v-for="(num, index) in week"
        :key="index"
      >
        {{ locale[language].date.week[num] }}
      </div>
    </div>
    <div style="clear: both" v-for="index in selPage.length / 7" :key="index">
      <div
        class="zl-date-sel"
        v-for="i in 7"
        :key="i"
        :class="{ right: i === 7 }"
        @click="selDate(selPage[(index - 1) * 7 + i - 1])"
      >
        {{ selPage[(index - 1) * 7 + i - 1].day }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ZlDay,
  formater,
  getCurrentMonth,
  getCurrentYear,
  getMonthPage
} from '@zl-vue/utils/src/date'
import * as locale from '../../locale'
import { ref, shallowRef, watch } from 'vue'
import { dateProps } from './date'
const props = defineProps(dateProps)
defineOptions({
  name: 'ZlDate'
})
let year = ref<number>(getCurrentYear())
let month = ref<number>(getCurrentMonth())
const selPage = ref(getMonthPage(year.value, month.value, props.isStartMon))
const input = shallowRef<HTMLInputElement>()

watch(
  () => [year.value, month.value],
  (newVal) => {
    selPage.value = getMonthPage(newVal[0], newVal[1], props.isStartMon)
  }
)

const language = navigator.language.replaceAll('-', '')
let week: number[]
if (props.isStartMon) {
  week = [1, 2, 3, 4, 5, 6, 7]
} else {
  week = [7, 1, 2, 3, 4, 5, 6]
}

const addYear = () => {
  year.value++
}

const subYear = () => {
  year.value--
}

const addMonth = () => {
  month.value++
  if (month.value > 12) {
    addYear()
    month.value = 1
  }
}

const subMonth = () => {
  month.value--
  if (month.value < 1) {
    subYear()
    month.value = 12
  }
}
const selDate = (date: ZlDay) => {
  const d = new Date(year.value, date.month, date.day)
  if (input.value) {
    input.value.value = formater(d, props.pattern)
  }
}
</script>
