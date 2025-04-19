import { z } from 'zod'
import { RenameMap, ShapeMap, TransformMap } from './rename.types'

export function rename<T extends RenameMap>(map: T) {
  const shapeMap: ShapeMap = {}
  const transformMap: TransformMap = {}

  for (const mapKey in map) {
    const from = map[mapKey] as string
    const to = mapKey as string
    shapeMap[from] = z.unknown()
    transformMap[to] = from
  }

  return z.object(shapeMap)
    .partial()
    .transform(shape => {
      const transformed = {} as Record<string, unknown>
      for (const transformTo in transformMap) {
        const transformFrom = transformMap[transformTo] as string
        transformed[transformTo] = shape[transformFrom]
      }
      return transformed as Record<keyof T, unknown>
    })
}
