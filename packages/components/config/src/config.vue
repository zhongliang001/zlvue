<template>
  <div :lang="lang"><slot></slot></div>
</template>
<script setup lang="ts">
import { inject, onBeforeMount } from 'vue'
import { configProps } from './config'
const props = defineProps(configProps)
defineOptions({
  name: 'ZlConfig'
})
const zlLang: any = inject('zlLang')
onBeforeMount(() => {
  if (props.lang) zlLang.lang = props.lang
})
</script>
