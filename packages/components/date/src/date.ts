import { ExtractPropTypes } from 'vue'

export const dateProps = {
  isStartMon: {
    type: Boolean,
    default: true
  },
  pattern: {
    type: String,
    default: 'yyyy-MM-dd'
  }
}

export type DateProps = ExtractPropTypes<typeof dateProps>
