import { ExtractPropTypes } from 'vue'
import { definePropType } from '../../types/type'

export const checkboxProps = {
  checkData: { type: definePropType<Map<string, string>>(Object) },
  name: {
    type: String
  },
  modelValue: {
    type: definePropType<Array<String>>(Object),
    default: []
  }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
