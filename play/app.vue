<template>
  <zl-config lang="zhCN"></zl-config>
  <zl-container>
    <zl-header>hi</zl-header>
    <zl-container>
      <zl-aside>侧边</zl-aside>
      <zl-main>
        <zl-form ref="form" :model="xxx" :formData="formData" :rules="rules">
          <zl-form-item prop="phoneNo" label="test">
            <zl-input class="a" v-model="formData.phoneNo" ref="xx" name="phoneNo"></zl-input>
          </zl-form-item>
          <zl-form-item prop="phoneNo2" label="test2">
            <zl-input
              class="a"
              name="phoneNo2"
              type="search"
              @search="testEnter"
              :max="100"
              :digit="2"
              ref="xxxx"
            ></zl-input>
          </zl-form-item>
          <zl-form-item prop="phoneNo3" label="test">
            <zl-date :width="300" name="phoneNo3"></zl-date>
          </zl-form-item>
          <zl-form-item prop="user" label="user">
            <zl-input type="user" v-model="formData.user" name="user"></zl-input>
          </zl-form-item>
          <zl-form-item prop="password" label="password">
            <zl-input type="password" v-model="formData.password" name="password"></zl-input>
          </zl-form-item>
          <zl-form-item prop="email" label="email">
            <zl-input type="email" v-model="formData.email" :isGuess="true" name="email"></zl-input>
          </zl-form-item>
          <zl-form-item prop="dataRange" label="dataRange">
            <zl-input
              type="range"
              v-model="formData.email1"
              :max="200"
              :min="10"
              name="dataRange"
            ></zl-input>
          </zl-form-item>
          <zl-form-item prop="url" label="url">
            <zl-input type="url" v-model="formData.url" :isGuess="true" name="url" />
          </zl-form-item>
        </zl-form>
      </zl-main>
    </zl-container>

    <zl-footer>底部</zl-footer>
  </zl-container>
</template>
<script lang="ts" setup>
import { FormRule, FormRuleItems } from '@zl-vue/components/types/type'
import { reactive, ref } from 'vue'

const a = ref<number>(1)
const xx: any = ref(null)

const formData = reactive({
  phoneNo: 'b',
  password: '',
  user: '',
  email: '',
  dataRange: '',
  email1: '',
  url: ''
})
const form: any = ref(null)
const ci = () => {
  form.value.volidate()
}
const rule: FormRuleItems = [{ msg: 'haha', pattern: 'ss' }]

const rules: FormRule = reactive({ phoneNo: rule, test2: rule })

const add = () => {
  a.value++
}

const testEnter = (data: string, event: Event) => {
  console.log(data, event)
}

// onMounted(() => {
//   form.value.volidate()
// })

const xxx = ref('1')
</script>
