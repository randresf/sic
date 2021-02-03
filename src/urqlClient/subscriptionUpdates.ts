import { Cache, Data, Variables } from "@urql/exchange-graphcache"
import {
  MeetingDeleteSubscription,
  MeetingsDocument,
  MeetingsQuery,
  NewMeetingSubscription,
} from "../generated/graphql"
import { betterUpdateQuery } from "./createBetterQuery"

export function subscriptionUpdates() {
  return {
    newMeeting: (result: Data, _args: Variables, cache: Cache) => {
      const variables = {
        limit: 15,
        cursor: null as null | string,
      }
      betterUpdateQuery<NewMeetingSubscription, MeetingsQuery>(
        cache,
        { query: MeetingsDocument, variables },
        result,
        (res, que) => {
          const meeting = res.newMeeting.data
          if (!meeting) return que
          if (meeting.isActive === "true")
            que.meetings.meetings.unshift(meeting)
          else
            que.meetings.meetings = que.meetings.meetings.filter(
              (met) => met.id !== meeting.id
            )
          return que
        }
      )
    },
    meetingDelete: (result: Data, _args: Variables, cache: Cache) => {
      const variables = {
        limit: 15,
        cursor: null as null | string,
      }
      betterUpdateQuery<MeetingDeleteSubscription, MeetingsQuery>(
        cache,
        { query: MeetingsDocument, variables },
        result,
        (res, que) => {
          const meetingId = res.meetingDelete.data
          if (!meetingId) return que

          que.meetings.meetings = que.meetings.meetings.filter(
            (met) => met.id !== meetingId
          )
          return que
        }
      )
    },
  }
}
