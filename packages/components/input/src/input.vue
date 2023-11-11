<template>
  <div class="zl-input-wrapper" @mouseover="isHover(true)" @mouseout="isHover(false)">
    <template v-if="type === 'range'">
      <span v-if="min">{{ min }}</span>
      <span v-else>0</span>
    </template>
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
    <template v-if="type === 'range'">
      <input
        class="zl-range-input"
        ref="iRange"
        type="text"
        :value="_ref?.value"
        @blur="setRange"
      />
      <span>%</span>
    </template>

    <zl-icon
      v-show="type !== 'password' && type !== 'range' && isShow"
      class="icon-clear"
      @click="clear"
      :font-size="1"
    ></zl-icon>
    <zl-icon v-show="type === 'search'" class="icon-search" @click="enter"></zl-icon>
    <zl-icon v-show="type === 'password'" class="icon-mima"></zl-icon>
    <zl-icon v-show="type === 'user'" class="icon-user"></zl-icon>
  </div>
  <template v-if="isGuess && type === 'email'">
    <div class="zl-input-guess" ref="iGuess">
      <div
        class="gess-item"
        v-for="mail in newEmails"
        :key="mail"
        @mousedown="selEmail(_ref?.value.split('@')[0] + '@' + mail)"
      >
        {{ _ref?.value.split('@')[0] }}@{{ mail }}
      </div>
    </div>
  </template>
  <template v-else-if="isGuess && type === 'url'">
    <div class="zl-input-guess" ref="uGuess">
      <div class="gess-item" v-for="url in newUrl" :key="url" @mousedown="selUrl(url)">
        {{ url }}
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { inputProps } from './input'
import { Ref, computed, inject, onMounted, reactive, ref, shallowRef, useAttrs, watch } from 'vue'
import { formatCurrency } from '@zl-vue/utils/src/currency'
import { isPositiveInteger } from '@zl-vue/utils/src/number'
const props = defineProps(inputProps)
defineOptions({
  name: 'ZlInput'
})
const input = shallowRef<HTMLInputElement>()
const _ref = computed(() => input.value)
const zlLang: any = inject('zlLang')
const language: any = zlLang.language

const max = props.type === 'range' ? (props.max ? props.max : 100) : props.max
const min = props.type === 'range' ? (props.min ? props.min : 0) : props.min

// 控制是否展示clear按钮
const isShow = ref(false)
const isHover = (isHover): void => {
  isShow.value = isHover
}

const commonEmail =
  props.type === 'email'
    ? props.commonEmail
      ? props.commonEmail
      : reactive(['qq.com', '126.com', '163.com'])
    : reactive([])
let newEmails: string[] = reactive([])

const preUrl = reactive(['http://', 'https://'])
const suffUrl = reactive(['com', 'cn', 'org'])

const newUrl: string[] = reactive([])

const volidChild = inject('volidChild')

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
const iGuess = ref(null)
const uGuess = ref(null)

const enterkey = () => {
  // 当type为number时控制只能输入数字
  if (props.type === 'currency') {
    preventInputChar()
  } else if (props.type === 'email') {
    const ml = _ref?.value?.value.split('@')
    if (ml && ml[1]) {
      const m = ml[1]
      commonEmail.forEach((t: string) => {
        if (t.startsWith(m) && newEmails.indexOf(t) < 0) {
          newEmails.push(t)
        }
        if (!t.startsWith(m) && newEmails.indexOf(t) > -1) {
          const index = newEmails.indexOf(t)
          newEmails.splice(index)
        }
      })
    } else if (ml && !ml[1]) {
      commonEmail.forEach((t: string) => {
        if (newEmails.indexOf(t) < 0) {
          newEmails.push(t)
        }
      })
    }
    displayGuess(iGuess)
  } else if (props.type === 'url') {
    const enterUrl: string | undefined = _ref.value?.value
    const interUrl: string[] = reactive([])
    preUrl.forEach((pu: string) => {
      if (enterUrl && pu.length > enterUrl?.length && pu.indexOf(enterUrl) > -1) {
        interUrl.push(pu)
      } else if (enterUrl) {
        if (interUrl.indexOf(enterUrl) === -1) {
          interUrl.push(enterUrl)
        }
      }
    })
    newUrl.length = 0
    interUrl.forEach((iu) => {
      suffUrl.forEach((su) => {
        const ius = iu.split('.')
        const endUrl = ius[ius.length - 1]
        let wu = ''
        if (su.startsWith(endUrl)) {
          for (let i = 0; i < ius.length - 2; i++) {
            wu += ius[i] + '.'
          }
          wu += su
          if (newUrl.indexOf(wu) === -1) {
            newUrl.push(wu)
          }
        } else {
          wu = iu + '.' + su
          if (newUrl.indexOf(wu) === -1) {
            newUrl.push(wu)
          }
        }
      })
    })
    displayGuess(uGuess)
  }
}

const displayGuess = (rf: Ref<null>) => {
  if (rf.value) {
    const ig: HTMLElement = rf.value
    if (ig) {
      ig.classList.remove('hidden')
    }
  }
}

const hiddenGuess = (rf: Ref<null>) => {
  if (rf.value) {
    const ig: HTMLElement = rf.value
    if (ig) {
      if (!ig.classList.contains('hidden')) ig.classList.add('hidden')
    }
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

const advice: Function | undefined = inject('advice')

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
  if (props.type === 'search' || props.type === 'user') {
    if (_ref.value) {
      _ref.value.type = 'text'
    }
  }
  if (advice) {
    advice(props.type)
  }
})

const iRange = ref(null)
const setRange = () => {
  if (_ref.value && iRange?.value) {
    const ir: any = iRange.value
    if (max && ir.value > max) {
      console.warn(language.input.error.max, max)
      ir.value = _ref.value.value
    } else if (min && ir.value < min) {
      console.warn(language.input.error.min, min)
      ir.value = _ref.value.value
    } else {
      emit('update:modelValue', ir.value)
      _ref.value.value = iRange?.value
    }
  }
}

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
  if (iGuess.value) {
    displayGuess(iGuess)
  }
  if (uGuess.value) {
    displayGuess(uGuess)
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
      if (props.digit) {
        const isPositiveInt: boolean = isPositiveInteger(props.digit)
        if (isPositiveInt) {
          _ref.value.value = intValue.toFixed(props.digit)
        } else {
          console.warn(language.input.error.digist)
        }
      }
    }
    volid(value)
  }
  if (iGuess.value) {
    hiddenGuess(iGuess)
  }
  if (uGuess.value) {
    hiddenGuess(uGuess)
  }
}

const volid = (value: string) => {
  if (!_ref.value) return
  if (typeof volidChild === 'function') return
  if (props.type === 'number') {
    const intValue = parseInt(value)
    if (props.max) {
      if (intValue > props.max) {
        adiviceVolid(false, language.input.error.max + props.max, _ref.value)
      }
    } else if (props.min) {
      if (intValue < props.min) {
        adiviceVolid(false, language.input.error.min + props.min, _ref.value)
      }
    } else {
      adiviceVolid(true, '', _ref.value)
    }
    emit('update:modelValue', _ref.value?.value)
  }
}

const adiviceVolid = (res: boolean, errMsg: string, ref: HTMLInputElement) => {
  ref.value = ''
  if (typeof volidChild === 'function') {
    volidChild(res, errMsg)
  } else {
    ref.placeholder = language.input.error.min + props.min
  }
}

const selEmail = (mail: string) => {
  emit('update:modelValue', mail)
  if (_ref.value) _ref.value.value = mail
  hiddenGuess(iGuess)
}
const selUrl = (url: string) => {
  emit('update:modelValue', url)
  if (_ref.value) _ref.value.value = url
  hiddenGuess(uGuess)
}

const handleInput = () => {
  emit('update:modelValue', _ref.value?.value)
}
defineExpose({})
</script>
