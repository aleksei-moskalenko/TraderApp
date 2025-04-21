export function getStack(stack?: string | undefined) {
  return stack?.split('\n').map((line) => line.trim())
}
