import { AnyZodObject } from 'zod'
import { rename } from './rename'
import { RenameMap } from './rename.types'

export function fromEnvironment<TRenameMap extends RenameMap, TSchema extends AnyZodObject>(schema: TSchema, renameMap?: TRenameMap): TSchema['_output'] {
  return renameMap
    ? rename(renameMap).pipe(schema).parse(process.env)
    : schema.parse(process.env)
}
