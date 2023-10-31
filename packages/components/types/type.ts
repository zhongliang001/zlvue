import { PropType } from 'vue'

export const definePropType = <T>(val: any): PropType<T> => val

export type FormRuleItems = Array<FormRuleItem>

export type FormRule = Partial<Record<string, FormRuleItems>>

export type FormRuleItem = {
  msg?: string
  paterrn?: string
}

interface FormField {
  name: string
  volidate: (rule: FormRuleItems, data: string) => boolean
  value?: any
}

export { FormField }
