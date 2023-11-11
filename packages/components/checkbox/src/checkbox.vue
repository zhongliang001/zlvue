<template>
  <template v-for="key in checkData?.keys()" :key="key">
    <input type="checkbox" name="name" :value="key" @click="sel(checkData?.get(key))" />
    {{ key }}
  </template>
</template>
<script setup lang="ts">
import { checkboxProps } from './checkbox'
import { inject, onMounted, ref } from 'vue'

defineOptions({
  name: 'ZlCheckbox'
})

const selData = ref<string[]>([])

const props = defineProps(checkboxProps)

const it = props.checkData?.values()
console.log('被输出值{ it }的输出结果是：', it)

const emit = defineEmits(['update:modelValue'])
const sel = (selValue: string | undefined) => {
  if (!selValue) return
  if (selData.value && selData.value.indexOf(selValue) > -1) {
    selData.value.splice(selData.value.indexOf(selValue))
  } else {
    selData.value.push(selValue)
  }
  emit('update:modelValue', selData.value)
}

const advice: Function | undefined = inject('advice')

onMounted(() => {
  if (advice) {
    advice('checkbox')
  }
})
</script>
