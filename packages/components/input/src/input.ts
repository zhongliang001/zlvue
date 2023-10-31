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
  'week'
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
    type: String,
    Number
  },
  min: {
    type: String,
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
    default: 2
  },
  modelValue: {
    type: String
  },
  placeholder: {
    type: String
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>
