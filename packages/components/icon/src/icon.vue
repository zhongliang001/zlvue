<template>
  <i class="iconfont" :style="{ 'font-size': fontSize + 'px' }"></i>
</template>
<script setup lang="ts">
import { icontProps } from './icon'

defineOptions({
  name: 'ZlIcon'
})
defineProps(icontProps)
</script>
