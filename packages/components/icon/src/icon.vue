<template>
  <i class="iconfont" :style="{ 'font-size': fontSize + 'rem' }"></i>
</template>
<script setup lang="ts">
import { icontProps } from './icon'

defineOptions({
  name: 'ZlIcon'
})
defineProps(icontProps)
</script>
