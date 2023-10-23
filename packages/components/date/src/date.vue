<template>
  <input
    ref="input"
    class="zl-date"
    type="text"
    readonly="true"
    @focus="sel = 'day'"
    placeholder="年/月/日"
    :style="{ width: width + 'px' }"
  />
  <!-- width - 0 + 12 + 'px' 减0是为了解决vue中数字相加默认编程字符串拼接 -->
  <div class="zl-date-container" style="clear: both" :style="{ width: width - 0 + 12 + 'px' }">
    <!-- -->
    <div v-show="sel === 'day'">
      <div style="clear: both">
        <div class="zl-date-head" @click="subYear" :style="{ width: width / 10 + 'px' }">
          <zl-icon class="icon-arrow-double-left"></zl-icon>
        </div>
        <div class="zl-date-head" @click="subMonth" :style="{ width: width / 10 + 'px' }">
          <zl-icon class="icon-arrow-left"></zl-icon>
        </div>
        <div
          class="zl-date-head month"
          @click="toSelectMonth"
          :style="{ width: (3 * width) / 10 + 'px' }"
        >
          {{ locale[language].date.month[month] }}
        </div>
        <div
          class="zl-date-head year"
          @click="toSelectYear"
          :style="{ width: (3 * width) / 10 + 'px' }"
        >
          {{ year + locale[language].date.year }}
        </div>
        <div class="zl-date-head" @click="addMonth" :style="{ width: width / 10 + 'px' }">
          <zl-icon class="icon-arrow-right"></zl-icon>
        </div>
        <div
          class="zl-date-head right"
          @click.prevent="addYear"
          :style="{ width: width / 10 + 'px' }"
        >
          <zl-icon class="icon-arrow-double-right"></zl-icon>
        </div>
      </div>
      <div style="clear: both">
        <div
          class="zl-date-week"
          :class="{ right: index === 6 }"
          v-for="(num, index) in week"
          :key="index"
          :style="{ width: width / 7 + 'px' }"
        >
          {{ locale[language].date.week[num] }}
        </div>
      </div>
      <div style="clear: both" v-for="index in selPage.length / 7" :key="index">
        <div
          class="zl-date-sel"
          v-for="i in 7"
          :key="i"
          :class="{
            right: i === 7,
            colorgray: selPage[(index - 1) * 7 + i - 1].month !== month,
            selected:
              selPage[(index - 1) * 7 + i - 1].month === month &&
              selPage[(index - 1) * 7 + i - 1].day === day
          }"
          :style="{ width: width / 7 + 'px' }"
          @click="selDate(selPage[(index - 1) * 7 + i - 1])"
        >
          {{ selPage[(index - 1) * 7 + i - 1].day }}
        </div>
      </div>
    </div>
    <div v-show="sel === 'month'">
      <div
        class="zl-date-month-sel"
        v-for="(key, value) in locale[language].date.month"
        :key="key"
        style="float: left"
        :class="{ selected: value === month }"
        @click="selectMonth(value)"
        :style="{ width: width / 3 + 'px' }"
      >
        {{ key }}
      </div>
    </div>
    <div v-show="sel === 'year'">
      <div>
        <div class="zl-date-year-head" @click="subYears" :style="{ width: width / 2 + 'px' }">
          <zl-icon class="icon-arrow-left"></zl-icon>
        </div>
        <div class="zl-date-year-head" :style="{ width: width / 2 + 'px' }" @click="addYears">
          <zl-icon class="icon-arrow-right"></zl-icon>
        </div>
      </div>
      <div
        class="zl-date-year-sel"
        :class="{ selected: yValue === year }"
        style="float: left"
        v-for="yValue in years"
        :key="yValue"
        @click="selectYear(yValue)"
        :style="{ width: width / 3 + 'px' }"
      >
        {{ yValue }}
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
import ZlIcon from '../../icon'
const props = defineProps(dateProps)
defineOptions({
  name: 'ZlDate'
})
let year = ref<number>(getCurrentYear())
let month = ref<number>(getCurrentMonth())

const selPage = ref(getMonthPage(year.value, month.value, props.isStartMon))
const input = shallowRef<HTMLInputElement>()
const day = ref<number>(0)

const sel = ref('day')

watch(
  () => [year.value, month.value],
  (newVal) => {
    selPage.value = getMonthPage(newVal[0], newVal[1], props.isStartMon)
    years.value = generateYears(year.value)
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

const generateYears = (year: number) => {
  return [year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4]
}
const years = ref<number[]>(generateYears(year.value))

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
  const d = new Date(year.value, date.month - 1, date.day)
  day.value = date.day
  if (input.value) {
    input.value.value = formater(d, props.pattern)
  }
  if (date.month !== month.value) {
    month.value = date.month
  }
}

const toSelectMonth = () => {
  sel.value = 'month'
}

const selectMonth = (m: number) => {
  month.value = m
  sel.value = 'day'
}

const toSelectYear = () => {
  sel.value = 'year'
}

const subYears = () => {
  years.value = generateYears(years.value[4] - 9)
}

const addYears = () => {
  years.value = generateYears(years.value[4] + 9)
}

const selectYear = (yValue: number) => {
  year.value = yValue
  sel.value = 'day'
}
</script>
