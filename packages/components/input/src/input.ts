import type { ExtractPropTypes } from 'vue'

export const inputProps = {
  name: {
    type: String
  },
  color: {
    type: String
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>
