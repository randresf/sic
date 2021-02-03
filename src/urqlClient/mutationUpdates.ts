import { Cache, Data, ResolveInfo, Variables } from "@urql/exchange-graphcache"
import {
  AddPlaceMutation,
  DeletePlaceMutation,
  GetPlacesDocument,
  GetPlacesQuery,
  HeartbeatDocument,
  HeartbeatQuery,
  LoginMutation,
  LogoutMutation,
} from "../generated/graphql"
import { betterUpdateQuery } from "./createBetterQuery"
import { invalidateQuerys } from "./invalidateQuerys"

export function mutationUpdates() {
  return {
    logout: (
      result: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      betterUpdateQuery<LogoutMutation, HeartbeatQuery>(
        cache,
        { query: HeartbeatDocument },
        result,
        () => ({ heartBeat: null })
      )
    },
    login: (
      results: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      betterUpdateQuery<LoginMutation, HeartbeatQuery>(
        cache,
        { query: HeartbeatDocument },
        results,
        (res, que) => {
          if (res.login.errors) return que
          return { heartBeat: res.login.admin }
        }
      )
    },
    saveMeeting: (
      _result: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      invalidateQuerys(cache, "meetings")
    },
    deleteMeeting: (
      _result: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      invalidateQuerys(cache, "meetings")
    },
    updateAdmin: (
      _result: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      invalidateQuerys(cache, "getAdminData")
      invalidateQuerys(cache, "heartBeat")
    },
    deletePlace: (
      result: Data,
      args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      betterUpdateQuery<DeletePlaceMutation, GetPlacesQuery>(
        cache,
        { query: GetPlacesDocument },
        result,
        (_res, que) => {
          que.getUserPlaces.place = que.getUserPlaces.place?.filter(
            (pl) => pl.id !== args.placeId
          )
          return que
        }
      )
    },
    addPlace: (
      result: Data,
      _args: Variables,
      cache: Cache,
      _info: ResolveInfo
    ) => {
      betterUpdateQuery<AddPlaceMutation, GetPlacesQuery>(
        cache,
        { query: GetPlacesDocument },
        result,
        (res, que) => {
          const place = res.addPlace.place
          if (!place) return que
          que.getUserPlaces.place?.unshift(place[0] as any)
          return que
        }
      )
    },
  }
}
