/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSentimentDatas = /* GraphQL */ `
  query ListSentimentDatas(
    $filter: ModelSentimentDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSentimentData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Game
        Sentiment
        Description
        Image
        Positive
        Neutral
        Negative
        Platforms
        ReleaseDate
        Genre
        Metacritic
      }
      nextToken
      __typename
    }
  }
`;
