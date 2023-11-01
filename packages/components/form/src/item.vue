<template>
  <div class="zl-item">
    <label class="zl-item-label" for="h" :props="prop">
      {{ label }}
    </label>
    <div class="zl-item-field">
      <div :class="[{ isvolidate: isvolidate }, result ? 'ok' : 'error']">
        <slot></slot>
      </div>

      <div :class="result ? 'hidden' : 'error'">{{ msg }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { ItemProps } from './item'
import { FormField, FormRuleItem, FormRuleItems } from '../../types/type'

defineOptions({
  name: 'ZlFormItem'
})
const props = defineProps(ItemProps)
const msg = ref<string>('a')
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
        if (r.msg) msg.value = r.msg
      }
    }
    if (!re) result.value = false
    if (r.volidator) {
      let rr = r.volidator(data)
      if (!rr) {
        if (r.msg) msg.value = r.msg
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
const prop = props.prop

defineExpose({
  prop
})
</script>
