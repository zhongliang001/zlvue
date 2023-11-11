<template>
  <div class="zl-item">
    <label class="zl-item-label" :for="prop" :props="prop">
      {{ label }}
    </label>
    <div class="zl-item-field">
      <div ref="field" class="field" :class="[{ isvolidate: isvolidate }, result ? 'ok' : 'error']">
        <slot></slot>
      </div>
      <div :class="result ? 'hidden' : 'errorMsg'">
        <p v-for="m in msg" :key="m">
          {{ m }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, provide, ref } from 'vue'
import { ItemProps } from './item'
import { FormField, FormRuleItem, FormRuleItems } from '../../types/type'

defineOptions({
  name: 'ZlFormItem'
})
const props = defineProps(ItemProps)
// 校验的结果
const msg = ref<string[]>([])
let result = ref(true)
let isvolidate = ref(false)

const volidate = (rule: FormRuleItems, data: string): boolean => {
  result.value = true
  rule.forEach((r: FormRuleItem) => {
    let re = true
    if (!r.pattern) return
    else {
      const pattern: string = r.pattern
      const mr: RegExpMatchArray | null = pattern.match(data)
      if (mr === null || mr.length <= 0) {
        re = false
        if (r.msg) msg.value.push(r.msg)
      }
    }
    if (!re) result.value = false
    if (r.volidator) {
      let rr = r.volidator(data)
      if (!rr) {
        if (r.msg) msg.value.push(r.msg)
        result.value = false
      }
    }
  })
  isvolidate.value = true
  return result.value
}

const formFiled: FormField = {
  name: props?.prop ? props?.prop : 'formFild',
  volidate: volidate
}

const addFiled = inject('addFiled')
onMounted(() => {
  if (typeof addFiled === 'function') {
    addFiled(formFiled)
  }
})

const volidChild = (res: boolean, errMsg: string) => {
  if (!res) {
    const index = msg.value.indexOf(errMsg)
    if (index < 0) {
      msg.value.push(errMsg)
    }
  } else {
    msg.value = []
  }
}

const field = ref(null)
const advice = (type: string) => {
  if (type === 'range' || type === 'checkbox') {
    if (field.value) {
      const f: HTMLElement = field.value
      f.classList.add('border-none')
    }
  }
}

provide('volidChild', volidChild)

provide('advice', advice)

const prop = props.prop

defineExpose({
  prop
})
</script>
