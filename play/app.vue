<template>
  <div>
    <zl-input class="a" type="number" ref="xx" name="hhhhhhhhhh"></zl-input>

    <zl-input class="a" type="date" ref="xxxx" name="a"></zl-input>
    <zl-date></zl-date>
    <div>
      <button :onclick="ci">点击</button>
      <button :onclick="add">+</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const a = ref<number>(1)
const xx: any = ref(null)

const ci = () => {
  xx.value.say()
}

const add = () => {
  a.value++
}
</script>
