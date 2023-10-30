<template>
  <div class="zl-item">
    <label class="zl-item-label" for="h" :props="prop">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { ItemProps } from './item'
import { FormField, FormRuleItems } from '../../types/type'

defineOptions({
  name: 'ZlFormItem'
})
const props = defineProps(ItemProps)
const volidate = (rule: FormRuleItems, data: string): boolean => {
  return false
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
