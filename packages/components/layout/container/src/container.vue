<template>
  <section class="zl-container" :class="{ 'is-inline': isInline }" ref="container">
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import { SetupContext, onMounted, ref, useSlots } from 'vue'
const slot: SetupContext['slots'] | any = useSlots()
const isInline = ref(false)

defineOptions({
  name: 'ZlContainer'
})

const container: any = ref(null)
onMounted(() => {
  const def = slot.default()
  def.forEach((de) => {
    if (de.type.name === 'ZlAside' || de.type.name === 'ZlMain') {
      isInline.value = true
    }
  })
})

defineExpose({})
</script>
