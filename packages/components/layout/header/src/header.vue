<template>
  <header class="zl-header" :style="{ height: height }">
    <slot></slot>
  </header>
</template>
<script setup lang="ts">
import { headerProps } from './header'

defineOptions({
  name: 'ZlHeader'
})
defineProps(headerProps)
</script>
