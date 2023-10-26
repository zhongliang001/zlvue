import { ExtractPropTypes } from 'vue'

export const footerProps = {
  width: {
    type: String
  }
}

export type FooterProps = ExtractPropTypes<typeof footerProps>
