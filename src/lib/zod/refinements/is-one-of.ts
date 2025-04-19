export const isOneOf = <T extends string>(values: T[]) => [
  (value: string): value is T => (values as string[]).includes(value),
  {
    message: `Invalid value. Expected one of: ${values.join(', ')}`
  }
] as const
