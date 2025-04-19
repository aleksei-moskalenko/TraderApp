import { z, ZodUnknown } from 'zod'

export type RenameMap = Record<string, string>

type ShapeMap = Record<string, ZodUnknown>

type TransformMap = Record<string, string>

export function rename<T extends RenameMap>(map: T) {
  const shapeMap: ShapeMap = {}
  const transformMap: TransformMap = {}

  for (const mapKey in map) {
    const from = map[mapKey] as string
    const to = mapKey as string
    shapeMap[from] = z.unknown()
    transformMap[to] = from
  }

  return z.object(shapeMap).transform(shape => {
    const transformed = {} as Record<string, unknown>
    for (const transformTo in transformMap) {
      const transformFrom = transformMap[transformTo] as string
      transformed[transformTo] = shape[transformFrom]
    }
    return transformed as Record<keyof T, unknown>
  })
}
