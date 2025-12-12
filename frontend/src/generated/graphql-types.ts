import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Challenge = {
  __typename?: 'Challenge';
  endingDate: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  startingDate: Scalars['DateTimeISO']['output'];
};

export type Ecogesture = {
  __typename?: 'Ecogesture';
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  level1Expectation: Scalars['String']['output'];
  level2Expectation: Scalars['String']['output'];
  level3Expectation: Scalars['String']['output'];
  pictureUrl: Scalars['String']['output'];
};

export type EcogestureListResponse = {
  __typename?: 'EcogestureListResponse';
  ecogestures: Array<Ecogesture>;
  totalCount: Scalars['Float']['output'];
};

export type GetEcogesturesInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChallenge: Challenge;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  seedEcogestures: Array<Ecogesture>;
  signup: Scalars['String']['output'];
  validateEcogesture: UserEcogesture;
};


export type MutationCreateChallengeArgs = {
  data: NewChallengeInput;
};


export type MutationLoginArgs = {
  data: NewUserInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};


export type MutationValidateEcogestureArgs = {
  ecogestureId: Scalars['Int']['input'];
  level_validated: Scalars['Int']['input'];
};

export type NewChallengeInput = {
  endingDate: Scalars['DateTimeISO']['input'];
  label: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  startingDate: Scalars['DateTimeISO']['input'];
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllChallenges: Array<Challenge>;
  getAllUsers: Array<User>;
  getEcogestures: EcogestureListResponse;
  getValidatedEcogestures: Array<UserEcogesture>;
};


export type QueryGetEcogesturesArgs = {
  input?: InputMaybe<GetEcogesturesInput>;
};

/** Roles for users in this app */
export enum Roles {
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  roles: Array<Roles>;
  username: Scalars['String']['output'];
};

export type UserEcogesture = {
  __typename?: 'UserEcogesture';
  ecogesture: Ecogesture;
  ecogestureId: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  level_validated: Scalars['Float']['output'];
  user: User;
  userId: Scalars['Float']['output'];
  validated_at: Scalars['DateTimeISO']['output'];
};

export type LoginMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type GetEcogesturesQueryVariables = Exact<{
  input?: InputMaybe<GetEcogesturesInput>;
}>;


export type GetEcogesturesQuery = { __typename?: 'Query', getEcogestures: { __typename?: 'EcogestureListResponse', totalCount: number, ecogestures: Array<{ __typename?: 'Ecogesture', id: number, label: string, pictureUrl: string }> } };

export type GetValidatedEcogesturesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatedEcogesturesQuery = { __typename?: 'Query', getValidatedEcogestures: Array<{ __typename?: 'UserEcogesture', id: number, validated_at: any, level_validated: number, ecogesture: { __typename?: 'Ecogesture', id: number, label: string, pictureUrl: string }, user: { __typename?: 'User', id: number } }> };

export type ValidateEcogestureMutationVariables = Exact<{
  ecogestureId: Scalars['Int']['input'];
  level_validated: Scalars['Int']['input'];
}>;


export type ValidateEcogestureMutation = { __typename?: 'Mutation', validateEcogesture: { __typename?: 'UserEcogesture', id: number, validated_at: any, level_validated: number, ecogesture: { __typename?: 'Ecogesture', id: number, label: string, pictureUrl: string }, user: { __typename?: 'User', id: number } } };


export const LoginDocument = gql`
    mutation login($data: NewUserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($data: NewUserInput!) {
  signup(data: $data)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const GetEcogesturesDocument = gql`
    query GetEcogestures($input: GetEcogesturesInput) {
  getEcogestures(input: $input) {
    totalCount
    ecogestures {
      id
      label
      pictureUrl
    }
  }
}
    `;

/**
 * __useGetEcogesturesQuery__
 *
 * To run a query within a React component, call `useGetEcogesturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEcogesturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEcogesturesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEcogesturesQuery(baseOptions?: Apollo.QueryHookOptions<GetEcogesturesQuery, GetEcogesturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEcogesturesQuery, GetEcogesturesQueryVariables>(GetEcogesturesDocument, options);
      }
export function useGetEcogesturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEcogesturesQuery, GetEcogesturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEcogesturesQuery, GetEcogesturesQueryVariables>(GetEcogesturesDocument, options);
        }
export function useGetEcogesturesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEcogesturesQuery, GetEcogesturesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEcogesturesQuery, GetEcogesturesQueryVariables>(GetEcogesturesDocument, options);
        }
export type GetEcogesturesQueryHookResult = ReturnType<typeof useGetEcogesturesQuery>;
export type GetEcogesturesLazyQueryHookResult = ReturnType<typeof useGetEcogesturesLazyQuery>;
export type GetEcogesturesSuspenseQueryHookResult = ReturnType<typeof useGetEcogesturesSuspenseQuery>;
export type GetEcogesturesQueryResult = Apollo.QueryResult<GetEcogesturesQuery, GetEcogesturesQueryVariables>;
export const GetValidatedEcogesturesDocument = gql`
    query GetValidatedEcogestures {
  getValidatedEcogestures {
    id
    validated_at
    level_validated
    ecogesture {
      id
      label
      pictureUrl
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useGetValidatedEcogesturesQuery__
 *
 * To run a query within a React component, call `useGetValidatedEcogesturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidatedEcogesturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidatedEcogesturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetValidatedEcogesturesQuery(baseOptions?: Apollo.QueryHookOptions<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>(GetValidatedEcogesturesDocument, options);
      }
export function useGetValidatedEcogesturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>(GetValidatedEcogesturesDocument, options);
        }
export function useGetValidatedEcogesturesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>(GetValidatedEcogesturesDocument, options);
        }
export type GetValidatedEcogesturesQueryHookResult = ReturnType<typeof useGetValidatedEcogesturesQuery>;
export type GetValidatedEcogesturesLazyQueryHookResult = ReturnType<typeof useGetValidatedEcogesturesLazyQuery>;
export type GetValidatedEcogesturesSuspenseQueryHookResult = ReturnType<typeof useGetValidatedEcogesturesSuspenseQuery>;
export type GetValidatedEcogesturesQueryResult = Apollo.QueryResult<GetValidatedEcogesturesQuery, GetValidatedEcogesturesQueryVariables>;
export const ValidateEcogestureDocument = gql`
    mutation ValidateEcogesture($ecogestureId: Int!, $level_validated: Int!) {
  validateEcogesture(
    ecogestureId: $ecogestureId
    level_validated: $level_validated
  ) {
    id
    validated_at
    level_validated
    ecogesture {
      id
      label
      pictureUrl
    }
    user {
      id
    }
  }
}
    `;
export type ValidateEcogestureMutationFn = Apollo.MutationFunction<ValidateEcogestureMutation, ValidateEcogestureMutationVariables>;

/**
 * __useValidateEcogestureMutation__
 *
 * To run a mutation, you first call `useValidateEcogestureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateEcogestureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateEcogestureMutation, { data, loading, error }] = useValidateEcogestureMutation({
 *   variables: {
 *      ecogestureId: // value for 'ecogestureId'
 *      level_validated: // value for 'level_validated'
 *   },
 * });
 */
export function useValidateEcogestureMutation(baseOptions?: Apollo.MutationHookOptions<ValidateEcogestureMutation, ValidateEcogestureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateEcogestureMutation, ValidateEcogestureMutationVariables>(ValidateEcogestureDocument, options);
      }
export type ValidateEcogestureMutationHookResult = ReturnType<typeof useValidateEcogestureMutation>;
export type ValidateEcogestureMutationResult = Apollo.MutationResult<ValidateEcogestureMutation>;
export type ValidateEcogestureMutationOptions = Apollo.BaseMutationOptions<ValidateEcogestureMutation, ValidateEcogestureMutationVariables>;