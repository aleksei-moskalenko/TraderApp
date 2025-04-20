import { ClassProvider, InjectionToken, Type } from '@nestjs/common'

export function useClass<T>(token: InjectionToken, target: Type<T>): ClassProvider<T> {
  return {
    provide:  token,
    useClass: target
  }
}
