import { ExtractPropTypes } from 'vue'

export const headerProps = {
  height: {
    type: String
  }
}
export type HeaderProps = ExtractPropTypes<typeof headerProps>
