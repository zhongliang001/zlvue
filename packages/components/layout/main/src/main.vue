<template>
  <main class="zl-main" @isColumn1="isColumn" :style="{ width: width }"><slot></slot></main>
</template>
<script lang="ts" setup>
import { mainProps } from './main'
import isColumn from '../../container/src/container.vue'
defineProps(mainProps)
defineOptions({
  name: 'ZlMain'
})
</script>
