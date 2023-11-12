import { ExtractPropTypes } from 'vue'
import { definePropType } from '../../types/type'

export const selectProps = {
  isGuess: Boolean,
  selectOption: {
    type: definePropType<Map<string, string>>(Object)
  },
  modelValue: {
    type: definePropType<string | Array<string>>([String, Object])
  }
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
