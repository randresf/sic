import gql from "graphql-tag"
import * as Urql from "urql"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: "Query"
  meetings: Array<Meeting>
  questions: Array<Question>
}

export type Meeting = {
  __typename?: "Meeting"
  id: Scalars["Float"]
  title: Scalars["String"]
  spots: Scalars["Float"]
  meetingDate: Scalars["String"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  isActive: Scalars["Boolean"]
}

export type Question = {
  __typename?: "Question"
  id: Scalars["Float"]
  questionId: Scalars["String"]
  questionText: Scalars["String"]
  answer: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createMeeting: Meeting
  registrerQuestion: Question
  user: UserResponse
  createUser: UserResponse
}

export type MutationCreateMeetingArgs = {
  data: MeetingInput
}

export type MutationRegistrerQuestionArgs = {
  data: QuestionInput
}

export type MutationUserArgs = {
  citizenId: Scalars["String"]
}

export type MutationCreateUserArgs = {
  data: UserInput
}

export type MeetingInput = {
  title: Scalars["String"]
  spots: Scalars["Float"]
  meetingDate: Scalars["String"]
}

export type QuestionInput = {
  questionId: Scalars["String"]
  questionText: Scalars["String"]
  answer: Scalars["String"]
}

export type UserResponse = {
  __typename?: "UserResponse"
  user?: Maybe<User>
  errors?: Maybe<ErrorField>
}

export type User = {
  __typename?: "User"
  id: Scalars["Float"]
  citizenId: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  phone: Scalars["Float"]
  contactNumber: Scalars["Float"]
  emergenceContact: Scalars["String"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  email: Scalars["String"]
  birthDate: Scalars["String"]
}

export type ErrorField = {
  __typename?: "ErrorField"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type UserInput = {
  citizenId: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  phone: Scalars["Float"]
  email: Scalars["String"]
  birthDate: Scalars["String"]
  emergenceContac?: Maybe<Scalars["String"]>
  contactNumer?: Maybe<Scalars["Float"]>
}

export type GetUserMutationVariables = Exact<{
  citizenId: Scalars["String"]
}>

export type GetUserMutation = { __typename?: "Mutation" } & {
  user: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        | "id"
        | "citizenId"
        | "lastName"
        | "firstName"
        | "phone"
        | "email"
        | "birthDate"
      >
    >
    errors?: Maybe<{ __typename?: "ErrorField" } & Pick<ErrorField, "message">>
  }
}

export type MeetingsQueryVariables = Exact<{ [key: string]: never }>

export type MeetingsQuery = { __typename?: "Query" } & {
  meetings: Array<
    { __typename?: "Meeting" } & Pick<
      Meeting,
      "id" | "title" | "meetingDate" | "spots"
    >
  >
}

export const GetUserDocument = gql`
  mutation getUser($citizenId: String!) {
    user(citizenId: $citizenId) {
      user {
        id
        citizenId
        lastName
        firstName
        phone
        email
        birthDate
      }
      errors {
        message
      }
    }
  }
`

export function useGetUserMutation() {
  return Urql.useMutation<GetUserMutation, GetUserMutationVariables>(
    GetUserDocument
  )
}
export const MeetingsDocument = gql`
  query Meetings {
    meetings {
      id
      title
      meetingDate
      spots
    }
  }
`

export function useMeetingsQuery(
  options: Omit<Urql.UseQueryArgs<MeetingsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeetingsQuery>({ query: MeetingsDocument, ...options })
}
