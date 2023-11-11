import { ExtractPropTypes } from 'vue'

export const dateProps = {
  isStartMon: {
    type: Boolean,
    default: true
  },
  pattern: {
    type: String,
    default: 'yyyy-MM-dd'
  },
  width: {
    type: Number,
    default: 200
  },
  name: {
    type: String
  }
}

export type DateProps = ExtractPropTypes<typeof dateProps>
