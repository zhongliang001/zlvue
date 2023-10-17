<template>
  <div>
    <zl-input class="a" type="number" step="," ref="xx" name="hhhhhhhhhh"></zl-input>

    <button :onclick="ci">点击</button>
    <button :onclick="add">+</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const a = ref('1')
const xx: any = ref(null)

const ci = () => {
  xx.value.say()
}

const add = () => {
  a.value++
}
</script>
