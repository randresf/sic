import { Cache } from "@urql/exchange-graphcache"

export const invalidateQuerys = (cache: Cache, fName: string) => {
  const fieldInfos = cache
    .inspectFields("Query")
    .filter((info) => info.fieldName === fName)
  fieldInfos.forEach(({ fieldName, arguments: variables }: any) => {
    cache.invalidate("Query", fieldName, variables || undefined)
  })
}
