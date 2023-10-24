import { ExtractPropTypes } from 'vue'

export const icontProps = {
  type: {
    type: String
  },
  fontSize: {
    type: Number,
    default: 16
  }
}

export type IconType = ExtractPropTypes<typeof icontProps>
