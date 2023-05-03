const typeDefs = `
  type User {
    _id: ID!
    Email: String!
    NickName: String!
    Password: String!
    ImageUrl: String!
    Name: String
    PhoneNumber: String
    Biography: String
    Website: String
    Follower: Int
    MyFollowed: Int
    IsPrivate: Boolean
    EmailVerify: Boolean
    OnlineStatus: Boolean
    UsageAgreement: Boolean
    posts:[Post!]
    comments: [Comment!]
  }
  type File {
    FilePath: String!
    FileName: String!
    FileType: String!
    FileUrl: String!
  }

  type Post {
    _id: ID!
    OwnerId: String!
    Description: String!
    Like: Int!
    Comment: Int!
    Files: [File!]
    CommentsIsClosed: Boolean!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
    user: User!
    comments: [Comment!]
  }
  type PostLike {
    _id: ID!
    OwnerId: String!
    PostId: String!
    user: User!
  }
  type Comment {
    _id: ID!
    OwnerId: String!
    PostId: String!
    Description: String!
    user: User!
    Like: Int!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  type Connection {
    _id: ID!
    From: String!
    To: String!
    fromUser: User!
    toUser: User!
  }

  type Notification {
    _id: ID!
    From: String!
    To: String!
    Type: String!
    PostId: String
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
    fromUser: User!
  }

  type SavedPost {
    _id: ID!
    OwnerId: String!
    PostId: String!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  type Message {
    _id: ID!
    From: String!
    To: String!
    Type: String!
    ChatId: String!
    Description: String!
    Files: [File!]
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
    fromUser: User!
  }

  type Chat {
    _id: ID!
    From: String!
    To: String!
    Type: String!
    LastMessage: String!
    LastMessageOwner: String!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
    toUser: User!
    lastMessageOwner: User!
  }

  input LoginInput{
    Email: String!
    Password: String!
  }

  input SavedPostInput{
    OwnerId: String!
    PostId: String!
  }

  input NotificationInput{
    From: String!
    To: String!
    Type: String!
  }

  input ChatInput{
    From: String!
    To: String!
  }

  type Query {
    users: [User!]
    user(_id: ID!): User
    login(data: LoginInput!): User
    posts(user_id: ID!): [Post!]
    post(_id: ID!): Post
    comments(post_id: ID!): [Comment!]
    comment(_id: ID!): Comment
    postLikes(post_id: ID!): [PostLike!]
    postLike(data: CreatePostLikeInput!): PostLike
    followers(user_id: ID!): [Connection!]
    myFolloweds(user_id: ID!): [Connection!]
    connection(data: CreateConnectionInput!): Connection
    notifications(user_id: ID!): [Notification!]
    notification(data: NotificationInput!): Notification
    savedPosts(user_id: ID!): [SavedPost!]
    savedPost(data: SavedPostInput!): SavedPost
    messages(chat_id: ID!): [Message!]
    message(message_id: ID!): Message
    chats(user_id: ID!): [Chat!]
    chat(chat_id: ID!): Chat
    chatControl(data: ChatInput!): Chat
  }

  # User #
  input CreateUserInput {
    Email: String!
    NickName: String!
    Password: String!
    ImageUrl: String!
    Name: String
    PhoneNumber: String
    Biography: String
    Website: String
    Follower: Int
    MyFollowed: Int
    IsPrivate: Boolean
    EmailVerify: Boolean
    OnlineStatus: Boolean
    UsageAgreement: Boolean
  } 
  input UpdateUserInput {
    NickName: String
    Password: String
    ImageUrl: String
    Name: String
    PhoneNumber: String
    Biography: String
    Website: String
    IsPrivate: Boolean
    OnlineStatus: Boolean
    Follower: Int
    MyFollowed: Int
  } 

  input FileInput {
    FilePath: String!
    FileName: String!
    FileType: String!
    FileUrl: String!
  }

  # Post #
  input CreatePostInput {
    OwnerId: String!
    Description: String!
    Like: Int!
    Files: [FileInput!]
    Comment: Int!
    CommentsIsClosed: Boolean!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  } 
  input UpdatePostInput {
    Like: Int
    Comment: Int
    CommentsIsClosed: Boolean
  }

  # PostLike #
  input CreatePostLikeInput {
    OwnerId: String!
    PostId: String!
  }

  # Comment #
  input CreateCommentInput {
    OwnerId: String!
    PostId: String!
    Description: String!
    Like: Int!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  } 
  input UpdateCommentInput {
    _id: ID!
    Like: Int!
  } 

  # Connection #
  input CreateConnectionInput {
    From: String!
    To: String!
  }

  # Notification #
  input CreateNotificationInput {
    From: String!
    To: String!
    Type: String!
    PostId: String
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  # SavedPost #
  input CreateSavedPostInput {
    OwnerId: String!
    PostId: String!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  # Message #
  input CreateMessageInput {
    From: String!
    To: String!
    Type: String!
    File: FileInput
    Description: String
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  input DeleteMessageInput{
    message_id: ID
    type: String!
    from: String
    to: String
    time: String
  }

  # Chat #
  input CreateChatInput {
    From: String!
    To: String!
    Type: String!
    LastMessage: String
    LastMessageOwner: String
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  input UpdateChatInput{
    Type: String!
    LastMessage: String
    LastMessageOwner: String!
    FullDate: String!
    Date: String!
    Time: String!
    Month: Int!
  }

  input DeleteChatInput{
    From: String!
    To: String
  }

  # Mutation
  type Mutation {

    # User #
    createUser(data: CreateUserInput!): Boolean!
    updateUser(_id: ID!, data: UpdateUserInput!): Boolean!

    # Post #
    createPost(data: CreatePostInput!): Boolean!
    updatePost(post_id: ID!,data: UpdatePostInput!): Boolean!
    deletePost(post_id: ID!): Boolean!

    # PostLike #
    createPostLike(data: CreatePostLikeInput!): Boolean!
    deletePostLike(like_id: ID!): Boolean!
    deleteAllPostLike(post_id: ID!): Boolean!

    # Comment #
    createComment(data: CreateCommentInput!): Boolean!
    updateComment(data: UpdateCommentInput!): Boolean!
    deleteComment(comment_id: ID!): Boolean!
    deleteAllComment(post_id: ID!): Boolean!

    # Connection #
    createConnection(data: CreateConnectionInput!): Boolean!
    deleteConnection(connection_id: ID!): Boolean!

    # Notification #
    createNotification(data: CreateNotificationInput!): Boolean!
    deleteNotification(notification_id: ID!): Boolean!

    # SavedPost #
    createSavedPost(data: CreateSavedPostInput!): Boolean!
    deleteSavedPost(savedPost_id: ID!): Boolean!

    # Message #
    createMessage(data: CreateMessageInput!): Boolean!
    deleteMessage(data: DeleteMessageInput!): Boolean!

    # Chat #
    createChat(data: CreateChatInput!): Boolean!
    updateChat(chatData: ChatInput!, data: UpdateChatInput!): Boolean!
    deleteChat(chat_id: ID!): Boolean!
  }

  # Subscribe
  type Subscription {
    # User #
    userCreated: User
    userUpdated(user_id: ID!): User

    # Post #
    postCreated(user_id: ID!): Post

    # PostLike #
    postLikeCreated(post_id: ID!): PostLike

    # Comment #
    commentCreated(post_id: ID!): Comment

    # SavedPost #
    savedPostCreated(user_id: ID!): SavedPost

    # Notification #
    notificationCreated(user_id: ID!): Notification

    # Connection #
    followerCreated(user_id: ID!): Connection
    myFollowedCreated(user_id: ID!): Connection

    # Message #
    messageCreated(chat_id: ID!): Message

    # Chat #
    chatCreated(user_id: ID!): Chat
    chatUpdated(chat_id: ID!): Chat
  }
`;

export default typeDefs;