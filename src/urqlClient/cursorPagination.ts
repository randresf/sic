import { Resolver } from "@urql/exchange-graphcache"
import { stringifyVariables } from "urql"

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }
    // check if the data is in the cache and return it
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInCache = cache.resolve(entityKey, fieldKey) as string[]
    info.partial = !isItInCache // make sure it calls the BE when there is not data
    const results: string[] = []
    let hasMore = true
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, "meetings") as string[]
      const _hasMore = cache.resolve(key, "hasMore")
      if (!_hasMore) {
        hasMore = _hasMore as boolean
      }
      results.push(...data)
    })
    return { __typename: "PaginatedMeetings", hasMore, posts: results }
  }
}
