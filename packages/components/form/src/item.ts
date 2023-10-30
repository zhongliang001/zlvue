import { CSSProperties } from 'vue'
import { definePropType, FormRuleItem } from '../../types/type'

export const ItemProps = {
  prop: {
    type: String
  },
  label: {
    type: String
  },
  align: {
    type: definePropType<CSSProperties>(Object)
  },
  rule: {
    type: definePropType<FormRuleItem>(Object)
  }
}
