<template>
  <input
    ref="input"
    class="zl-date"
    type="text"
    readonly="true"
    @focus="sel = 'day'"
    placeholder="年/月/日"
  />
  {{ selPage.length }}
  <div class="zl-date-container" style="clear: both">
    <div v-show="sel === 'day'">
      <div style="clear: both">
        <div class="zl-date-head" @click="subYear">
          <svg
            t="1697881304891"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="912"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M797.1 769a31.88 31.88 0 0 0-9.42-22.67L552.5 512l235.18-234.29a32 32 0 1 0-45.17-45.34l-240.87 240a56 56 0 0 0 0 79.34l240.87 240A32 32 0 0 0 797.1 769z"
              p-id="913"
            ></path>
            <path
              d="M538.84 769a31.88 31.88 0 0 0-9.42-22.67L294.24 512l235.18-234.29a32 32 0 1 0-45.16-45.34l-240.88 240a56 56 0 0 0 0 79.34l240.88 240A32 32 0 0 0 538.84 769z"
              p-id="914"
            ></path>
          </svg>
        </div>
        <div class="zl-date-head" @click="subMonth">
          <svg
            t="1697881784048"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1324"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M668 769a31.88 31.88 0 0 0-9.42-22.67L423.37 512l235.18-234.29a32 32 0 1 0-45.17-45.34l-240.87 240a56 56 0 0 0 0 79.34l240.87 240A32 32 0 0 0 668 769z"
              p-id="1325"
            ></path>
          </svg>
        </div>
        <div class="zl-date-head month" @click="toSelectMonth">
          {{ locale[language].date.month[month] }}
        </div>
        <div class="zl-date-head year" @click="toSelectYear">
          {{ year + locale[language].date.year }}
        </div>
        <div class="zl-date-head" @click="addMonth">
          <svg
            t="1697881817631"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1472"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M356 769a31.88 31.88 0 0 1 9.42-22.67L600.63 512 365.45 277.71a32 32 0 1 1 45.17-45.34l240.87 240a56 56 0 0 1 0 79.34l-240.87 240A32 32 0 0 1 356 769z"
              p-id="1473"
            ></path>
          </svg>
        </div>
        <div class="zl-date-head right" @click.prevent="addYear">
          <svg
            t="1697881751063"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1175"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M226.9 769a31.88 31.88 0 0 1 9.42-22.67L471.5 512 236.32 277.71a32 32 0 1 1 45.17-45.34l240.87 240a56 56 0 0 1 0 79.34l-240.87 240A32 32 0 0 1 226.9 769z"
              p-id="1176"
            ></path>
            <path
              d="M485.16 769a31.88 31.88 0 0 1 9.42-22.67L729.76 512 494.58 277.71a32 32 0 1 1 45.16-45.34l240.88 240a56 56 0 0 1 0 79.34l-240.88 240A32 32 0 0 1 485.16 769z"
              p-id="1177"
            ></path>
          </svg>
        </div>
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
          :class="{
            right: i === 7,
            colorgray: selPage[(index - 1) * 7 + i - 1].month !== month,
            selected:
              selPage[(index - 1) * 7 + i - 1].month === month &&
              selPage[(index - 1) * 7 + i - 1].day === day
          }"
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
      >
        {{ key }}
      </div>
    </div>
    <div v-show="sel === 'year'">
      <div>
        <div class="zl-date-year-head" @click="subYears">
          <svg
            t="1697881784048"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1324"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M668 769a31.88 31.88 0 0 0-9.42-22.67L423.37 512l235.18-234.29a32 32 0 1 0-45.17-45.34l-240.87 240a56 56 0 0 0 0 79.34l240.87 240A32 32 0 0 0 668 769z"
              p-id="1325"
            ></path>
          </svg>
        </div>
        <div class="zl-date-year-head" @click="addYears">
          <svg
            t="1697881817631"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1472"
            width="16"
            height="16"
            style="transform: translateY(25%)"
          >
            <path
              d="M356 769a31.88 31.88 0 0 1 9.42-22.67L600.63 512 365.45 277.71a32 32 0 1 1 45.17-45.34l240.87 240a56 56 0 0 1 0 79.34l-240.87 240A32 32 0 0 1 356 769z"
              p-id="1473"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="zl-date-year-sel"
        :class="{ selected: yValue === year }"
        style="float: left"
        v-for="yValue in years"
        :key="yValue"
        @click="selectYear(yValue)"
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
