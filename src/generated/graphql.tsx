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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  meetings: PaginatedMeetings;
  meeting: MeetingRes;
  meetingsById: Array<Meeting>;
  questions: Array<Question>;
  searchReservation: ReservationResponse;
  userById: UserResponse;
  heartBeat?: Maybe<Admin>;
  getUserData: Admin;
  getUserPlaces: PlaceResponse;
};


export type QueryMeetingsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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

export type PaginatedMeetings = {
  __typename?: 'PaginatedMeetings';
  meetings: Array<Meeting>;
  hasMore: Scalars['Boolean'];
};

export type Meeting = {
  __typename?: 'Meeting';
  id: Scalars['String'];
  title: Scalars['String'];
  spots: Scalars['Float'];
  meetingDate: Scalars['DateTime'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isActive: Scalars['String'];
  hasReservation: Scalars['Boolean'];
  place: Place;
};


export type Place = {
  __typename?: 'Place';
  id: Scalars['String'];
  name: Scalars['String'];
  address: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isActive: Scalars['String'];
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

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type PlaceResponse = {
  __typename?: 'PlaceResponse';
  errors?: Maybe<Array<ErrorField>>;
  place?: Maybe<Array<Place>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  saveMeeting: MeetingRes;
  deleteMeeting: MeetingRes;
  registrerQuestion: QuestionResponse;
  addReservation: ReservationResponse;
  cancelReservation: Scalars['Boolean'];
  user: UserResponse;
  createUser: UserResponse;
  saveUser: UserResponse;
  updateContactUser: UserResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: LoginResponse;
  updateUser: LoginResponse;
  addPlace: PlaceResponse;
  deletePlace: PlaceResponse;
};


export type MutationSaveMeetingArgs = {
  meetingId?: Maybe<Scalars['String']>;
  data: MeetingInput;
};


export type MutationDeleteMeetingArgs = {
  meetingId?: Maybe<Scalars['String']>;
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


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: AdminInput;
};


export type MutationUpdateUserArgs = {
  userData: UserUpdateInput;
};


export type MutationAddPlaceArgs = {
  placeId?: Maybe<Scalars['String']>;
  data: PlaceInput;
};


export type MutationDeletePlaceArgs = {
  placeId: Scalars['String'];
};

export type MeetingInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  spots: Scalars['Float'];
  meetingDate: Scalars['String'];
  hasReservation?: Maybe<Scalars['Boolean']>;
  place: Scalars['String'];
  isActive: Scalars['String'];
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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<ErrorField>>;
  admin?: Maybe<Admin>;
};

export type AdminInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  organizationId: Scalars['String'];
};

export type UserUpdateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['Float'];
  email: Scalars['String'];
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type PlaceInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  address: Scalars['String'];
  isActive?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  meetingUpdated: MeetingUpdated;
  newMeeting: MeetingUpdated;
  newReservation: SubsNewReservation;
};

export type MeetingUpdated = {
  __typename?: 'MeetingUpdated';
  data: Meeting;
};

export type SubsNewReservation = {
  __typename?: 'SubsNewReservation';
  meetingId: Scalars['String'];
};

export type MeetingDataFragment = (
  { __typename?: 'Meeting' }
  & Pick<Meeting, 'id' | 'title' | 'meetingDate' | 'spots' | 'isActive' | 'createdAt'>
);

export type MeetingQueryFragment = (
  { __typename?: 'Meeting' }
  & Pick<Meeting, 'hasReservation'>
  & { place: (
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'name' | 'address'>
  ) }
  & MeetingDataFragment
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

export type AddAdminMutationVariables = Exact<{
  data: AdminInput;
}>;


export type AddAdminMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & { admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type AddPlaceMutationVariables = Exact<{
  placeId: Scalars['String'];
  data: PlaceInput;
}>;


export type AddPlaceMutation = (
  { __typename?: 'Mutation' }
  & { addPlace: (
    { __typename?: 'PlaceResponse' }
    & { place?: Maybe<Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'name' | 'address' | 'isActive'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>> }
  ) }
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

export type DeleteMeetMutationVariables = Exact<{
  meetingId: Scalars['String'];
}>;


export type DeleteMeetMutation = (
  { __typename?: 'Mutation' }
  & { deleteMeeting: (
    { __typename?: 'MeetingRes' }
    & { meeting?: Maybe<(
      { __typename?: 'Meeting' }
      & Pick<Meeting, 'id' | 'title' | 'spots' | 'meetingDate' | 'createdAt' | 'updatedAt' | 'isActive'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>> }
  ) }
);

export type DeletePlaceMutationVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type DeletePlaceMutation = (
  { __typename?: 'Mutation' }
  & { deletePlace: (
    { __typename?: 'PlaceResponse' }
    & { place?: Maybe<Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>> }
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

export type LoginMutationVariables = Exact<{
  usr: Scalars['String'];
  pwd: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & { admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'firstName' | 'lastName' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SaveMeetingMutationVariables = Exact<{
  meetingId: Scalars['String'];
  data: MeetingInput;
}>;


export type SaveMeetingMutation = (
  { __typename?: 'Mutation' }
  & { saveMeeting: (
    { __typename?: 'MeetingRes' }
    & { meeting?: Maybe<(
      { __typename?: 'Meeting' }
      & Pick<Meeting, 'id' | 'title' | 'spots' | 'meetingDate' | 'createdAt' | 'updatedAt' | 'isActive'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
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

export type UpdateUserMutationVariables = Exact<{
  userData: UserUpdateInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'LoginResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'firstName' | 'lastName' | 'email' | 'phone'>
    )> }
  ) }
);

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = (
  { __typename?: 'Query' }
  & { getUserPlaces: (
    { __typename?: 'PlaceResponse' }
    & { place?: Maybe<Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'name' | 'address' | 'isActive'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>> }
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

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { getUserData: (
    { __typename?: 'Admin' }
    & Pick<Admin, 'firstName' | 'lastName' | 'email' | 'phone'>
  ) }
);

export type HeartbeatQueryVariables = Exact<{ [key: string]: never; }>;


export type HeartbeatQuery = (
  { __typename?: 'Query' }
  & { heartBeat?: Maybe<(
    { __typename?: 'Admin' }
    & Pick<Admin, 'firstName' | 'lastName' | 'email'>
  )> }
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

export type MeetingsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type MeetingsQuery = (
  { __typename?: 'Query' }
  & { meetings: (
    { __typename?: 'PaginatedMeetings' }
    & Pick<PaginatedMeetings, 'hasMore'>
    & { meetings: Array<(
      { __typename?: 'Meeting' }
      & MeetingQueryFragment
    )> }
  ) }
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

export type MeetingUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeetingUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { meetingUpdated: (
    { __typename?: 'MeetingUpdated' }
    & { data: (
      { __typename?: 'Meeting' }
      & MeetingQueryFragment
    ) }
  ) }
);

export type NewMeetingSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMeetingSubscription = (
  { __typename?: 'Subscription' }
  & { newMeeting: (
    { __typename?: 'MeetingUpdated' }
    & { data: (
      { __typename?: 'Meeting' }
      & MeetingQueryFragment
    ) }
  ) }
);

export type NewReservationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewReservationSubscription = (
  { __typename?: 'Subscription' }
  & { newReservation: (
    { __typename?: 'SubsNewReservation' }
    & Pick<SubsNewReservation, 'meetingId'>
  ) }
);

export const MeetingDataFragmentDoc = gql`
    fragment MeetingData on Meeting {
  id
  title
  meetingDate
  spots
  isActive
  createdAt
}
    `;
export const MeetingQueryFragmentDoc = gql`
    fragment MeetingQuery on Meeting {
  ...MeetingData
  hasReservation
  place {
    id
    name
    address
  }
}
    ${MeetingDataFragmentDoc}`;
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
export const AddAdminDocument = gql`
    mutation addAdmin($data: AdminInput!) {
  register(options: $data) {
    admin {
      id
    }
    errors {
      message
    }
  }
}
    `;

export function useAddAdminMutation() {
  return Urql.useMutation<AddAdminMutation, AddAdminMutationVariables>(AddAdminDocument);
};
export const AddPlaceDocument = gql`
    mutation addPlace($placeId: String!, $data: PlaceInput!) {
  addPlace(placeId: $placeId, data: $data) {
    place {
      name
      address
      isActive
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useAddPlaceMutation() {
  return Urql.useMutation<AddPlaceMutation, AddPlaceMutationVariables>(AddPlaceDocument);
};
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
export const DeleteMeetDocument = gql`
    mutation deleteMeet($meetingId: String!) {
  deleteMeeting(meetingId: $meetingId) {
    meeting {
      id
      title
      spots
      meetingDate
      createdAt
      updatedAt
      isActive
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useDeleteMeetMutation() {
  return Urql.useMutation<DeleteMeetMutation, DeleteMeetMutationVariables>(DeleteMeetDocument);
};
export const DeletePlaceDocument = gql`
    mutation deletePlace($placeId: String!) {
  deletePlace(placeId: $placeId) {
    place {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useDeletePlaceMutation() {
  return Urql.useMutation<DeletePlaceMutation, DeletePlaceMutationVariables>(DeletePlaceDocument);
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
export const LoginDocument = gql`
    mutation login($usr: String!, $pwd: String!) {
  login(password: $pwd, username: $usr) {
    admin {
      firstName
      lastName
      email
    }
    errors {
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SaveMeetingDocument = gql`
    mutation saveMeeting($meetingId: String!, $data: MeetingInput!) {
  saveMeeting(meetingId: $meetingId, data: $data) {
    meeting {
      id
      title
      spots
      meetingDate
      createdAt
      updatedAt
      isActive
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useSaveMeetingMutation() {
  return Urql.useMutation<SaveMeetingMutation, SaveMeetingMutationVariables>(SaveMeetingDocument);
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
export const UpdateUserDocument = gql`
    mutation updateUser($userData: userUpdateInput!) {
  updateUser(userData: $userData) {
    errors {
      field
      message
    }
    admin {
      firstName
      lastName
      email
      phone
    }
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const GetPlacesDocument = gql`
    query getPlaces {
  getUserPlaces {
    place {
      id
      name
      address
      isActive
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetPlacesQuery(options: Omit<Urql.UseQueryArgs<GetPlacesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPlacesQuery>({ query: GetPlacesDocument, ...options });
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
export const UserDocument = gql`
    query User {
  getUserData {
    firstName
    lastName
    email
    phone
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const HeartbeatDocument = gql`
    query heartbeat {
  heartBeat {
    firstName
    lastName
    email
  }
}
    `;

export function useHeartbeatQuery(options: Omit<Urql.UseQueryArgs<HeartbeatQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HeartbeatQuery>({ query: HeartbeatDocument, ...options });
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
    query Meetings($limit: Int!, $cursor: String) {
  meetings(limit: $limit, cursor: $cursor) {
    meetings {
      ...MeetingQuery
    }
    hasMore
  }
}
    ${MeetingQueryFragmentDoc}`;

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
export const MeetingUpdatedDocument = gql`
    subscription MeetingUpdated {
  meetingUpdated {
    data {
      ...MeetingQuery
    }
  }
}
    ${MeetingQueryFragmentDoc}`;

export function useMeetingUpdatedSubscription<TData = MeetingUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<MeetingUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MeetingUpdatedSubscription, TData>) {
  return Urql.useSubscription<MeetingUpdatedSubscription, TData, MeetingUpdatedSubscriptionVariables>({ query: MeetingUpdatedDocument, ...options }, handler);
};
export const NewMeetingDocument = gql`
    subscription NewMeeting {
  newMeeting {
    data {
      ...MeetingQuery
    }
  }
}
    ${MeetingQueryFragmentDoc}`;

export function useNewMeetingSubscription<TData = NewMeetingSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMeetingSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMeetingSubscription, TData>) {
  return Urql.useSubscription<NewMeetingSubscription, TData, NewMeetingSubscriptionVariables>({ query: NewMeetingDocument, ...options }, handler);
};
export const NewReservationDocument = gql`
    subscription NewReservation {
  newReservation {
    meetingId
  }
}
    `;

export function useNewReservationSubscription<TData = NewReservationSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewReservationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewReservationSubscription, TData>) {
  return Urql.useSubscription<NewReservationSubscription, TData, NewReservationSubscriptionVariables>({ query: NewReservationDocument, ...options }, handler);
};