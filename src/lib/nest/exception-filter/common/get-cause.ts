import fclone from 'fclone'

export function getCause(cause?: unknown) {
  return cause ? fclone(cause) : null
}
