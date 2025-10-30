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

export type GetEcogestureInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  seedEcogestures: Array<Ecogesture>;
  signup: Scalars['String']['output'];
};


export type MutationLoginArgs = {
  data: NewUserInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getEcogestures: EcogestureListResponse;
};


export type QueryGetEcogesturesArgs = {
  input?: InputMaybe<GetEcogestureInput>;
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

export type GetEcogesturesQueryVariables = Exact<{
  input?: InputMaybe<GetEcogestureInput>;
}>;


export type GetEcogesturesQuery = { __typename?: 'Query', getEcogestures: { __typename?: 'EcogestureListResponse', totalCount: number, ecogestures: Array<{ __typename?: 'Ecogesture', id: number, label: string, pictureUrl: string }> } };


export const GetEcogesturesDocument = gql`
    query GetEcogestures($input: GetEcogestureInput) {
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