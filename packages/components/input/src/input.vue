<template>
  <input class="zl-input" type="text" :name="name" />
</template>
<script setup lang="ts">
import { inputProps } from './input'
defineProps(inputProps)

defineOptions({
  name: 'ZlInput'
})
</script>
