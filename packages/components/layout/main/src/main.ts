import { ExtractPropTypes } from 'vue'

export const mainProps = {
  width: String
}

export type MainProps = ExtractPropTypes<typeof mainProps>
