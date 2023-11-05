import { isPositiveInteger } from '@zl-vue/utils/src/number'
import type { ExtractPropTypes } from 'vue'

const types = [
  'color',
  'text',
  'date',
  'datetime',
  'datetime-local',
  'email',
  'month',
  'number',
  'range',
  'search',
  'tel',
  'time',
  'url',
  'week',
  'password',
  'user'
]

const checkType = (value: string): boolean => {
  if (value) {
    if (types.indexOf(value) === -1) {
      console.warn(`input类型不能为:${value}`)
      value = 'text'
      return false
    }
  } else {
    value = 'text'
    return true
  }
  return true
}

const checkDigit = (value: number): boolean => {
  const isPositiveInt: boolean = isPositiveInteger(value)
  if (!isPositiveInt) {
    throw 'digst必须是整数'
  }
  return true
}

export const inputProps = {
  name: {
    type: String
  },
  type: {
    type: String,
    default: 'text',
    validator: (value): value is string => checkType(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String
  },
  max: {
    type: Number,
    Number
  },
  min: {
    type: Number,
    Number
  },
  readonly: {
    type: Boolean,
    String
  },
  required: {
    type: Boolean,
    String
  },
  size: {
    type: Number,
    default: 1
  },
  step: {
    type: String
  },
  digit: {
    type: Number,
    default: 2,
    validator: (value): value is number => checkDigit(value)
  },
  modelValue: {
    type: String
  },
  placeholder: {
    type: String
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>
