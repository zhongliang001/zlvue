<template>
  <form class="zl-form" :style="{ width: width }">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { formProps } from './form'
import { FormField } from '../../types/type'
defineOptions({
  name: 'ZlForm'
})
const props = defineProps(formProps)

watch(
  () => props.formData,
  () => {
    if (isvolidate.value) {
      volidate()
    }
  },
  { deep: true }
)

const rules = props.rules
const formdata = props.formData

let validator = ref(true)

let isvolidate = ref(false)

const volidate = (): boolean => {
  formFileds.forEach((t: FormField) => {
    const name: string | '' = t.name
    if (rules) {
      const rule = rules[name]
      if (rule && formdata && name) {
        const data = formdata[name]
        if (data) {
          const result = t.volidate(rule, data)
          if (!result) {
            validator.value = false
          }
        }
      }
    }
  })
  isvolidate.value = true
  return validator.value
}

const formFileds: FormField[] = []

const addField = (formFiled: FormField) => {
  formFileds.push(formFiled)
}

provide('addFiled', addField)

defineExpose({
  volidate
})
</script>
