import { ExtractPropTypes } from 'vue'
import { definePropType } from '../../types/type'

export const radioProps = {
  radioData: { type: definePropType<Map<string, string>>(Object) },
  name: {
    type: String
  },
  modelValue: {
    type: String
  }
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
