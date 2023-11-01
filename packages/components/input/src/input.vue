<template>
  <div class="zl-input-wrapper" @mouseover="isHover(true)" @mouseout="isHover(false)">
    <input
      :id="name"
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
      @keyup="enterkey"
      @focus="focus"
      @blur="blur"
      @input="handleInput"
      @keyup.enter="enter"
      v-bind="$attrs"
    />
    <zl-icon v-show="isShow" class="icon-clear" @click="clear" :font-size="1"></zl-icon>
    <zl-icon v-show="type === 'search'" class="icon-search" @click="enter"></zl-icon>
  </div>
</template>
<script setup lang="ts">
import { inputProps } from './input'
import { computed, nextTick, onMounted, ref, shallowRef, useAttrs, watch } from 'vue'
import * as all from '../../locale'
import { formatCurrency } from '@zl-vue/utils/src/currency'
import { isPositiveInteger } from '@zl-vue/utils/src/number'
const props = defineProps(inputProps)
defineOptions({
  name: 'ZlInput'
})
const input = shallowRef<HTMLInputElement>()
const _ref = computed(() => input.value)
// 控制是否展示clear按钮
const isShow = ref(false)
const isHover = (isHover): void => {
  isShow.value = isHover
}

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
const enterkey = () => {
  // 当type为number时控制只能输入数字
  if (props.type === 'currency') {
    preventInputChar()
  }
}

const attrs = useAttrs()

const enter = (event) => {
  if (props.type === 'search') {
    if (typeof attrs.onSearch === 'function') {
      attrs.onSearch(_ref.value?.value, event)
    }
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
const language = navigator.language.replaceAll('-', '')

onMounted(() => {
  if (props.type !== 'currency') {
    input.value?.setAttribute('type', props.type)
  } else {
    input.value?.setAttribute('type', 'text')
  }
  if (!props.placeholder) {
    if (input.value) {
      input.value.placeholder = all[language].input.placeholder
    }
  }
  if (_ref.value && props.modelValue) {
    const md: string = props.modelValue
    _ref.value.value = md
  }
  if (props.type === 'search') {
    if (_ref.value) {
      _ref.value.type = 'text'
    }
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
  const value = _ref.value?.value
  if (value) {
    if (props.type === 'currency') {
      const curr = formatCurrency(value, props.digit)
      _ref.value.value = curr
    }
    if (props.type === 'number') {
      const intValue = parseInt(value)
      if (props.max) {
        if (intValue > props.max) {
          _ref.value.value = ''
          _ref.value.placeholder = all[language].input.error.max + props.max
        }
      }
      if (props.min) {
        if (intValue < props.min) {
          _ref.value.value = ''
          _ref.value.placeholder = all[language].input.error.min + props.min
        }
      }
      if (props.digit) {
        const isPositiveInt: boolean = isPositiveInteger(props.digit)
        if (isPositiveInt) {
          _ref.value.value = intValue.toFixed(props.digit)
        } else {
          console.warn(all[language].input.error.digist)
        }
      }
      emit('update:modelValue', _ref.value?.value)
    }
  }
}

const handleInput = () => {
  emit('update:modelValue', _ref.value?.value)
  nextTick()
}

defineExpose({})
</script>
