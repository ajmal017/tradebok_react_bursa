import gql from "graphql-tag";


export const QUERY_POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      author {
        id
        handle
        avatar
      }
      comments {
        id
        body
        author {
          id
          avatar
          handle
        }
        createdAt
      }
      uri
      likes {
        id
      }
      caption
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
 query GetUser($id: String!) {
    getUser(id: $id) {
      id
      authId
      avatar
      name
      email
      about
      followingIds
      followerIds
      posts {
        id
        caption
        uri
        createdAt
      }
    }
  }
`;

export const QUERY_USER_EXISTS = gql`
  query UserExist($authId: String!) {
    userExist(authId: $authId){
      name
      id
    }
  }
`;


export const QUERY_LIKE_USERS = gql`
  query LikeUsers($likes: [String!]) {
    likeUsers(likes: $likes) {
      id
      avatar
      handle
      name
    }
  }
`;