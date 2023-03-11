const typeDefs = `
  type User {
    _id: ID!
    Email: String!
    NickName: String!
    Password: String!
    ImageUrl: String!
    Name: String
    Biography: String
    Website: String
    EmailVerify: Boolean
    OnlineStatus: Boolean
    Follower: Int
    MyFollowed: Int
    posts:[Post!]
    comments: [Comment!]
  }
  type Post {
    _id: ID!
    title: String!
    description: String
    short_description: String
    cover: String
    user_id: String!
    user: User!
    comments: [Comment!]!
  }
  type Comment {
    _id: ID!
    text: String!
    post_id: ID!
    user_id: ID!
    user: User!
    post: Post!
  }

  input LoginInput{
    Email: String!
    Password: String!
  }

  type Query {
    users: [User!]!
    user(_id: ID!): User!
    login(data: LoginInput): User!
    posts: [Post!]!
    post(_id: ID!): Post!
    comments: [Comment!]!
    comment(_id: ID!): Comment!
  }

  # User #
  input CreateUserInput {
    Email: String!
    NickName: String!
    Password: String!
    ImageUrl: String!
    Name: String
    Biography: String
    Website: String
    EmailVerify: Boolean
    OnlineStatus: Boolean
    Follower: Int
    MyFollowed: Int
  } 
  input UpdateUserInput {
    _id: ID!
    NickName: String
    Password: String
    ImageUrl: String
    Name: String
    Biography: String
    Website: String
    OnlineStatus: Boolean
    Follower: Int
    MyFollowed: Int
  } 
  input DeleteUserInput {
    _id: ID!
  }

  # Post #
  input CreatePostInput {
    title: String!
    user_id: String!
    description: String
    short_description: String
    cover: String
  } 
  input UpdatePostInput {
    _id: ID!
    title: String!
    description: String
    short_description: String
    cover: String
  } 
  input DeletePostInput {
    _id: ID!
  }

  # Comment #
  input CreateCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
  } 
  input UpdateCommentInput {
    _id: ID!
    text: String!
  } 
  input DeleteCommentInput {
    _id: ID!
  }
  type Mutation {

    # User #
    createUser(data: CreateUserInput): User
    updateUser(data: UpdateUserInput): User
    deleteUser(data: DeleteUserInput): User
    deleteAllUser: Int!

    # Post #
    createPost(data: CreatePostInput): Post
    updatePost(data: UpdatePostInput): Post
    deletePost(data: DeletePostInput): Post
    deleteAllPost: Int!

    # Comment #
    createComment(data: CreateCommentInput): Comment
    updateComment(data: UpdateCommentInput): Comment
    deleteComment(data: DeleteCommentInput): Comment
    deleteAllComment: Int!
  }

  # Subscribe
  type Subscription {
    # User #
    userCreated: User!
    userUpdated: User!
    userDeleted: User!
    userDeletedAll: Int!

    # Post #
    postCreated(user_id: ID): Post!
    postUpdated: Post!
    postDeleted: Post!
    postDeletedAll: Int!
    postCount: Int!

    # Comment #
    commentCreated(post_id:ID): Comment!
    commentUpdated: Comment!
    commentDeleted: Comment!
    commentDeletedAll: Int!
  }
`;

export default typeDefs;