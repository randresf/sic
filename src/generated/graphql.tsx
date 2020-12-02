import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  meetings: Array<Meeting>;
  meeting: MeetingRes;
  meetingsById: Array<Meeting>;
  questions: Array<Question>;
  searchReservation: ReservationResponse;
  userById: UserResponse;
};


export type QueryMeetingArgs = {
  id: Scalars['String'];
};


export type QueryMeetingsByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QuerySearchReservationArgs = {
  reservationId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['String'];
  title: Scalars['String'];
  spots: Scalars['Float'];
  meetingDate: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type MeetingRes = {
  __typename?: 'MeetingRes';
  meeting?: Maybe<Meeting>;
  errors?: Maybe<Array<ErrorField>>;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['String'];
  questionId: Scalars['String'];
  answer: Scalars['String'];
};

export type ReservationResponse = {
  __typename?: 'ReservationResponse';
  errors?: Maybe<Array<ErrorField>>;
  reservation?: Maybe<Reservation>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['String'];
  meetingId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  qrText: Scalars['String'];
  citizen: User;
  meeting: Meeting;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  document: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['Float'];
  contactNumber: Scalars['Float'];
  emergenceContact: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  birthDate: Scalars['String'];
  reservations: Array<Reservation>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<ErrorField>>;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMeeting: Meeting;
  registrerQuestion: QuestionResponse;
  addReservation: ReservationResponse;
  cancelReservation: Scalars['Boolean'];
  user: UserResponse;
  createUser: UserResponse;
  saveUser: UserResponse;
  updateContactUser: UserResponse;
};


export type MutationCreateMeetingArgs = {
  data: MeetingInput;
};


export type MutationRegistrerQuestionArgs = {
  userId: Scalars['String'];
  questions: Array<QuestionType>;
};


export type MutationAddReservationArgs = {
  data: ReservationType;
};


export type MutationCancelReservationArgs = {
  userId: Scalars['String'];
  reservationId: Scalars['String'];
};


export type MutationUserArgs = {
  document: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationSaveUserArgs = {
  userId?: Maybe<Scalars['String']>;
  data: UserInput;
};


export type MutationUpdateContactUserArgs = {
  contactData: UserContactType;
  userId: Scalars['String'];
};

export type MeetingInput = {
  title: Scalars['String'];
  spots: Scalars['Float'];
  meetingDate: Scalars['String'];
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  error?: Maybe<Scalars['String']>;
  saved?: Maybe<Scalars['Boolean']>;
};

export type QuestionType = {
  questionId: Scalars['String'];
  answer: Scalars['String'];
};

export type ReservationType = {
  userId: Scalars['String'];
  meetingId: Scalars['String'];
};

export type UserInput = {
  document: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['Float'];
  email: Scalars['String'];
  birthDate: Scalars['String'];
  emergenceContac?: Maybe<Scalars['String']>;
  contactNumer?: Maybe<Scalars['Float']>;
};

export type UserContactType = {
  contactNumber: Scalars['Float'];
  emergenceContact: Scalars['String'];
};

export type MeetingDataFragment = (
  { __typename?: 'Meeting' }
  & Pick<Meeting, 'id' | 'title' | 'meetingDate' | 'spots'>
);

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'document' | 'lastName' | 'firstName' | 'phone' | 'email' | 'birthDate'>
  & { reservations: Array<(
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'qrText' | 'meetingId'>
    & { meeting: (
      { __typename?: 'Meeting' }
      & Pick<Meeting, 'title' | 'meetingDate'>
    ) }
  )> }
);

export type CancelReservationMutationVariables = Exact<{
  reservationId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CancelReservationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelReservation'>
);

export type ConfirmReservationMutationVariables = Exact<{
  meetingId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type ConfirmReservationMutation = (
  { __typename?: 'Mutation' }
  & { addReservation: (
    { __typename?: 'ReservationResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>>, reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id'>
    )> }
  ) }
);

export type GetUserMutationVariables = Exact<{
  citizenId: Scalars['String'];
}>;


export type GetUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type SaveQuestionMutationVariables = Exact<{
  questions: Array<QuestionType>;
  userId: Scalars['String'];
}>;


export type SaveQuestionMutation = (
  { __typename?: 'Mutation' }
  & { registrerQuestion: (
    { __typename?: 'QuestionResponse' }
    & Pick<QuestionResponse, 'error' | 'saved'>
  ) }
);

export type SaveUserMutationVariables = Exact<{
  input: UserInput;
  userId?: Maybe<Scalars['String']>;
}>;


export type SaveUserMutation = (
  { __typename?: 'Mutation' }
  & { saveUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type UpdateContactUserMutationVariables = Exact<{
  userId: Scalars['String'];
  contactData: UserContactType;
}>;


export type UpdateContactUserMutation = (
  { __typename?: 'Mutation' }
  & { updateContactUser: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'userId'>
  ) }
);

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDataFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type GetMeetingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMeetingQuery = (
  { __typename?: 'Query' }
  & { meeting: (
    { __typename?: 'MeetingRes' }
    & { meeting?: Maybe<(
      { __typename?: 'Meeting' }
      & MeetingDataFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type MeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeetingsQuery = (
  { __typename?: 'Query' }
  & { meetings: Array<(
    { __typename?: 'Meeting' }
    & MeetingDataFragment
  )> }
);

export type GetMeetingsByIdQueryVariables = Exact<{
  ids: Array<Scalars['String']>;
}>;


export type GetMeetingsByIdQuery = (
  { __typename?: 'Query' }
  & { meetingsById: Array<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'meetingDate' | 'title'>
  )> }
);

export type SearchReservationQueryVariables = Exact<{
  reservationId: Scalars['String'];
}>;


export type SearchReservationQuery = (
  { __typename?: 'Query' }
  & { searchReservation: (
    { __typename?: 'ReservationResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>>, reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id' | 'qrText'>
      & { citizen: (
        { __typename?: 'User' }
        & Pick<User, 'document' | 'firstName' | 'lastName'>
      ), meeting: (
        { __typename?: 'Meeting' }
        & Pick<Meeting, 'id' | 'title' | 'meetingDate'>
      ) }
    )> }
  ) }
);

export const MeetingDataFragmentDoc = gql`
    fragment MeetingData on Meeting {
  id
  title
  meetingDate
  spots
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  document
  lastName
  firstName
  phone
  email
  birthDate
  reservations {
    id
    qrText
    meetingId
    meeting {
      title
      meetingDate
    }
  }
}
    `;
export const CancelReservationDocument = gql`
    mutation cancelReservation($reservationId: String!, $userId: String!) {
  cancelReservation(reservationId: $reservationId, userId: $userId)
}
    `;

export function useCancelReservationMutation() {
  return Urql.useMutation<CancelReservationMutation, CancelReservationMutationVariables>(CancelReservationDocument);
};
export const ConfirmReservationDocument = gql`
    mutation confirmReservation($meetingId: String!, $userId: String!) {
  addReservation(data: {userId: $userId, meetingId: $meetingId}) {
    errors {
      message
    }
    reservation {
      id
    }
  }
}
    `;

export function useConfirmReservationMutation() {
  return Urql.useMutation<ConfirmReservationMutation, ConfirmReservationMutationVariables>(ConfirmReservationDocument);
};
export const GetUserDocument = gql`
    mutation getUser($citizenId: String!) {
  user(document: $citizenId) {
    user {
      ...UserData
    }
    errors {
      message
    }
  }
}
    ${UserDataFragmentDoc}`;

export function useGetUserMutation() {
  return Urql.useMutation<GetUserMutation, GetUserMutationVariables>(GetUserDocument);
};
export const SaveQuestionDocument = gql`
    mutation saveQuestion($questions: [QuestionType!]!, $userId: String!) {
  registrerQuestion(questions: $questions, userId: $userId) {
    error
    saved
  }
}
    `;

export function useSaveQuestionMutation() {
  return Urql.useMutation<SaveQuestionMutation, SaveQuestionMutationVariables>(SaveQuestionDocument);
};
export const SaveUserDocument = gql`
    mutation saveUser($input: UserInput!, $userId: String) {
  saveUser(data: $input, userId: $userId) {
    user {
      id
    }
    errors {
      message
    }
  }
}
    `;

export function useSaveUserMutation() {
  return Urql.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument);
};
export const UpdateContactUserDocument = gql`
    mutation updateContactUser($userId: String!, $contactData: userContactType!) {
  updateContactUser(userId: $userId, contactData: $contactData) {
    userId
  }
}
    `;

export function useUpdateContactUserMutation() {
  return Urql.useMutation<UpdateContactUserMutation, UpdateContactUserMutationVariables>(UpdateContactUserDocument);
};
export const GetUserByIdDocument = gql`
    query getUserById($userId: String!) {
  userById(userId: $userId) {
    user {
      ...UserData
    }
    errors {
      message
    }
  }
}
    ${UserDataFragmentDoc}`;

export function useGetUserByIdQuery(options: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByIdQuery>({ query: GetUserByIdDocument, ...options });
};
export const GetMeetingDocument = gql`
    query getMeeting($id: String!) {
  meeting(id: $id) {
    meeting {
      ...MeetingData
    }
    errors {
      message
    }
  }
}
    ${MeetingDataFragmentDoc}`;

export function useGetMeetingQuery(options: Omit<Urql.UseQueryArgs<GetMeetingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMeetingQuery>({ query: GetMeetingDocument, ...options });
};
export const MeetingsDocument = gql`
    query Meetings {
  meetings {
    ...MeetingData
  }
}
    ${MeetingDataFragmentDoc}`;

export function useMeetingsQuery(options: Omit<Urql.UseQueryArgs<MeetingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeetingsQuery>({ query: MeetingsDocument, ...options });
};
export const GetMeetingsByIdDocument = gql`
    query getMeetingsById($ids: [String!]!) {
  meetingsById(ids: $ids) {
    id
    meetingDate
    title
  }
}
    `;

export function useGetMeetingsByIdQuery(options: Omit<Urql.UseQueryArgs<GetMeetingsByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMeetingsByIdQuery>({ query: GetMeetingsByIdDocument, ...options });
};
export const SearchReservationDocument = gql`
    query searchReservation($reservationId: String!) {
  searchReservation(reservationId: $reservationId) {
    errors {
      message
    }
    reservation {
      id
      qrText
      citizen {
        document
        firstName
        lastName
      }
      meeting {
        id
        title
        meetingDate
      }
    }
  }
}
    `;

export function useSearchReservationQuery(options: Omit<Urql.UseQueryArgs<SearchReservationQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchReservationQuery>({ query: SearchReservationDocument, ...options });
};