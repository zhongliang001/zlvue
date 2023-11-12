<template>
  <div class="zl-select">
    <div class="zl-selet-input">
      <input
        type="text"
        ref="input"
        :readonly="!isGuess"
        @blur="blur"
        @click="toSel"
        @keyup="enterData"
        @compositionstart="compositionstart"
        @compositionend="compositionend"
      />
      <zl-icon v-if="isGuess" class="icon-clear" @click="clear"></zl-icon>
      <zl-icon class="icon-arrow-down" @click="toSel"></zl-icon>
    </div>
    <div class="zl-select-option hidden" ref="selections">
      <ul>
        <li v-for="key in sGuess?.keys()" :key="key" @mousedown="sel(key)">
          {{ key }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { selectProps } from './select'
import { watch } from 'vue'

const props = defineProps(selectProps)
defineOptions({
  name: 'ZlSelect'
})

watch(
  () => props.selectOption,
  () => {
    initSelectOption()
  },
  {
    deep: true
  }
)

const input = ref(null)
const selections = ref(null)

const isGuess = props.isGuess
const selectOption = props.selectOption
const sGuess = reactive<Map<string, string>>(new Map<string, string>())
onMounted(() => {
  initSelectOption()
})

const initSelectOption = () => {
  if (sGuess.size > 0) {
    sGuess.clear()
  }
  selectOption?.forEach((value, key) => {
    sGuess.set(key, value)
  })
}

const toSel = () => {
  const iv: any = input.value
  if (iv && iv instanceof HTMLElement) {
    iv.focus()
  }
  const ss: any = selections.value
  if (ss && ss instanceof HTMLElement) {
    ss.classList.remove('hidden')
  }
}

const blur = () => {
  const ss: any = selections.value
  if (ss && ss instanceof HTMLElement) {
    if (!ss.classList.contains('hidden')) {
      ss.classList.add('hidden')
    }
  }
  const iv: any = input.value
  if (iv.value) {
    const enterData = iv.value
    selectOption?.forEach((value, key) => {
      if (key === enterData) {
        emit('update:modelValue', value)
      }
    })
  }
}
const emit = defineEmits(['update:modelValue'])
const sel = (data: string | undefined) => {
  const iv: any = input.value
  if (iv && iv instanceof HTMLElement) {
    iv.focus()
  }
  if (iv) {
    iv.value = data
  }
  if (data) {
    emit('update:modelValue', props.selectOption?.get(data))
  }
}

const enterData = () => {
  if (isEndEnterChinese.value) {
    const iv: any = input.value
    if (iv.value) {
      initSelectOption()
      const enterData = iv.value
      selectOption?.forEach((value, key) => {
        if (key.indexOf(enterData) !== -1) {
          if (!sGuess.get(key)) {
            sGuess.set(key, value)
          }
        } else {
          if (sGuess.get(key)) {
            sGuess.delete(key)
          }
        }
      })
    } else {
      initSelectOption()
    }
  }
}
/**
 * 中文输入是否结束的标志
 */
const isEndEnterChinese = ref(true)

/**
 * 检测中文输入开始
 */
const compositionstart = () => {
  isEndEnterChinese.value = false
}
/**
 * 检测中文输入结束
 */
const compositionend = () => {
  isEndEnterChinese.value = true
}

const clear = () => {
  emit('update:modelValue', '')
  if (input.value) {
    const iv: any = input.value
    iv.value = ''
  }
  initSelectOption()
  toSel()
}
</script>
