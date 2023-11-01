import { ExtractPropTypes } from 'vue'
import { definePropType, FormRule } from '../../types/type'

export const formProps = {
  width: {
    type: String,
    default: '100%'
  },
  model: {
    type: String
  },
  rules: {
    type: definePropType<FormRule>(Object)
  },
  formData: {
    type: definePropType<Partial<Record<string, string>>>(Object)
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>
