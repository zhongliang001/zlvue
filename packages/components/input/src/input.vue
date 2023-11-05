<template>
  <div class="zl-input-wrapper">
    <input
      ref="input"
      class="zl-input"
      :name="name"
      :disabled="disabled"
      :pattern="pattern"
      :max="max"
      :min="min"
      :readonly="readonly"
      :required="required"
      :size="size"
      :step="step"
      :placeholder="placeholder"
      @keyup="enter"
      @focus="focus"
      @blur="blur"
      @input="handleInput"
    />
    <zl-icon :onclick="clear">x</zl-icon>
  </div>
</template>
<script setup lang="ts">
import { inputProps } from './input'
import { computed, inject, nextTick, onMounted, shallowRef, watch } from 'vue'
import { formatCurrency } from '@zl-vue/utils/src/currency'

const props = defineProps(inputProps)
defineOptions({
  name: 'ZlInput'
})
const input = shallowRef<HTMLInputElement>()
const _ref = computed(() => input.value)

const zlLang: any = inject('zlLang')
const language: any = zlLang.language

watch(
  () => props.modelValue,
  (newVal: any) => {
    if (_ref.value) {
      _ref.value.value = newVal
    }
  },
  { deep: true }
)

const emit = defineEmits(['update:modelValue'])
const enter = () => {
  // 当type为number时控制只能输入数字
  if (props.type === 'currency') {
    preventInputChar()
  }
}
/**
 * 控制只能输入数字
 */
const preventInputChar = () => {
  let value = _ref.value?.value

  if (value && _ref.value) {
    let num = parseInt(value?.toString())
    let position
    if (_ref.value?.selectionStart) {
      position = _ref.value?.selectionStart
    }
    // 当输入非数字字符时将字符删除
    if (_ref.value && !Object.is(num, NaN)) {
      let length = value.length
      let sp: Set<string> = new Set<string>()
      let index = 0
      while (index < length) {
        let ch = value.charAt(index)
        if (
          (ch.charCodeAt(0) != 101 && ch.charCodeAt(0) != 69 && ch.charCodeAt(0) >= 58) ||
          (ch.charCodeAt(0) <= 47 && ch.charCodeAt(0) != 46)
        ) {
          if (props.type === 'currency') {
            sp.add(ch)
          } else {
            sp.add(ch)
          }
        }
        index++
      }
      index = 0
      for (const s of sp) {
        if (value) {
          value = value.replaceAll(s, '')
        }
        index++
      }
      if (_ref.value) {
        _ref.value.value = value
      }
      _ref.value.setSelectionRange(position - sp.size, position - sp.size)
    } else if (_ref.value) {
      _ref.value.value = ''
    }
  }
}

onMounted(() => {
  if (props.type !== 'currency') {
    input.value?.setAttribute('type', props.type)
  } else {
    input.value?.setAttribute('type', 'text')
  }
  if (!props.placeholder) {
    if (input.value) {
      input.value.placeholder = language.input.placeholder
    }
  }
  if (_ref.value && props.modelValue) {
    const md: string = props.modelValue
    _ref.value.value = md
  }
})

const clear = () => {
  emit('update:modelValue', '')
}

const focus = () => {
  if (props.type !== 'currency') {
    const value = _ref.value?.value
    if (value) {
      let curr = value?.replaceAll(',', '')
      if (_ref.value) {
        _ref.value.value = curr
      }
    }
  }
}

const blur = () => {
  if (props.type === 'currency') {
    const value = _ref.value?.value
    if (value) {
      const curr = formatCurrency(value, props.digit)
      _ref.value.value = curr
    }
  }
}

const handleInput = () => {
  emit('update:modelValue', _ref.value?.value)
  nextTick()
}

defineExpose({})
</script>
