<template>
  <zl-container>
    <zl-header>hi</zl-header>
    <zl-container>
      <zl-aside>侧边</zl-aside>
      <zl-main>
        <zl-form ref="form" :model="xxx" :formData="formData" :rules="rules">
          <zl-form-item prop="phoneNo" label="test">
            <zl-input class="a" v-model="formData.phoneNo" ref="xx" name="hhhhhhhhhh"></zl-input>
          </zl-form-item>

          <zl-input class="a" type="date" ref="xxxx" name="a"></zl-input>
          <zl-date :width="300"></zl-date>

          <div>
            <button type="button" @click="ci">点击</button>
            <button :onclick="add">+</button>
          </div>
        </zl-form>
      </zl-main>
    </zl-container>

    <zl-footer>底部</zl-footer>
  </zl-container>
</template>
<script lang="ts" setup>
import { FormRule, FormRuleItems } from '@zl-vue/components/form/src/form'
import ZlAside from '@zl-vue/components/layout/aside'
import { reactive, ref, onMounted } from 'vue'
const a = ref<number>(1)
const xx: any = ref(null)

const formData = reactive({ phoneNo: 'b' })
const form: any = ref(null)
const ci = () => {
  form.value.volidate()
}
const rule: FormRuleItems = [{ msg: 'haha', paterrn: 'ss' }]

const rules: FormRule = reactive({ phoneNo: rule, test2: rule })

const add = () => {
  a.value++
}

// onMounted(() => {
//   form.value.volidate()
// })

const xxx = ref('1')
</script>
