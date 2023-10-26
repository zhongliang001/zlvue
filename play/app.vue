<template>
  <zl-container>
    <zl-header>hi</zl-header>
    <zl-container>
      <zl-aside>侧边</zl-aside>
      <zl-main>
        <zl-input class="a" type="number" ref="xx" name="hhhhhhhhhh"></zl-input>

        <zl-input class="a" type="date" ref="xxxx" name="a"></zl-input>
        <zl-date :width="300"></zl-date>
        <div>
          <button :onclick="ci">点击</button>
          <button :onclick="add">+</button>
        </div>
      </zl-main>
    </zl-container>
    <zl-footer>底部</zl-footer>
  </zl-container>
</template>
<script lang="ts" setup>
import ZlAside from '@zl-vue/components/layout/aside'
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
