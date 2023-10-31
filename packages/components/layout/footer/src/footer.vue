<template>
  <footer class="zl-footer" :style="{ width: width }"><slot></slot></footer>
</template>
<script setup lang="ts">
import { footerProps } from './footer'
defineProps(footerProps)
defineOptions({
  name: 'ZlFooter'
})
</script>
