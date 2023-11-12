<template>
  <template v-for="key in radioData?.keys()" :key="key">
    <input type="radio" name="name" :value="key" @click="sel(radioData?.get(key))" />
    {{ key }}
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { radioProps } from './radio'

defineOptions({
  name: 'ZlRadio'
})
defineProps(radioProps)
const selData = ref<string>()
const emit = defineEmits(['update:modelValue'])
const sel = (data: string | undefined) => {
  if (!data) return
  if (selData.value) {
    selData.value = data
  }
  emit('update:modelValue', data)
}
</script>
