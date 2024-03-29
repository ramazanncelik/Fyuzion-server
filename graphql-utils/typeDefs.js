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
    ConfirmationCode: String
    Role: String
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
    Date: String!
    Time: String!
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
    Date: String!
    Time: String!
  }

  type CommentLike {
    _id: ID!
    OwnerId: String!
    CommentId: String!
    user: User!
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
    Date: String!
    Time: String!
    fromUser: User!
  }

  type SavedPost {
    _id: ID!
    OwnerId: String!
    PostId: String!
    Date: String!
    Time: String!
  }

  type Message {
    _id: ID!
    From: String!
    To: String!
    Type: String!
    ChatId: String!
    Description: String
    File: File
    Date: String!
    Time: String!
    fromUser: User!
    IsEdited: Boolean!
  }

  type Chat {
    _id: ID!
    From: String!
    To: String!
    Type: String!
    LastMessage: String!
    LastMessageOwner: String!
    Date: String!
    Time: String!
    toUser: User!
    lastMessageOwner: User!
  }

  type Complaint {
    _id: ID!
    UserId: String!
    PostId: String!
    Title: String!
    Description: String!
    Date: String!
    Time: String!
    user: User!
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

  input ChatFromToInput{
    From: String!
    To: String!
  }

  type Query {
    users: [User!]
    user(_id: ID!): User
    login(data: LoginInput!): User
    posts(user_id: ID!): [Post!]
    post(_id: ID!): Post
    postLikes(post_id: ID!): [PostLike!]
    postLike(data: CreatePostLikeInput!): PostLike
    comments(post_id: ID!): [Comment!]
    comment(_id: ID!): Comment
    commentLikes(comment_id: ID!): [CommentLike!]
    commentLike(data: CreateCommentLikeInput!): CommentLike
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
    chatControl(data: ChatFromToInput!): Chat
    complaints(post_id: ID!): [Complaint!]
    complaint(complaint_id: ID!): Complaint
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
    ConfirmationCode: String!
    Role: String!
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
    ConfirmationCode: String
    Role: String
    IsPrivate: Boolean
    EmailVerify: Boolean
    OnlineStatus: Boolean
    Follower: Int
    MyFollowed: Int
  } 

  input UpdatePasswordInput {
    Email: String!
    ConfirmationCode: String! 
    Password: String!
  }

  input UpdateEmailVerifyInput {
    Email: String!
    ConfirmationCode: String!
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
    Date: String!
    Time: String!
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
    Date: String!
    Time: String!
  } 
  input UpdateCommentInput {
    _id: ID!
    Like: Int!
  } 

  # CommentLike #
  input CreateCommentLikeInput {
    OwnerId: String!
    CommentId: String!
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
    Date: String!
    Time: String!
  }

  # SavedPost #
  input CreateSavedPostInput {
    OwnerId: String!
    PostId: String!
    Date: String!
    Time: String!
  }

  # Message #
  input CreateMessageInput {
    From: String!
    To: String!
    Type: String!
    File: FileInput
    Description: String
    Date: String!
    Time: String!
    IsEdited: Boolean!
  }

  input UpdateMessageInput{
    from: String!
    to: String!
    time: String!
    Description: String!
  }

  input DeleteMessageInput{
    message_id: ID
    type: String!
    from: String
    to: String
    time: String
  }

  # Chat #
  input ChatDataInput{
    Type: String!
    LastMessage: String
    LastMessageOwner: String!
    Date: String!
    Time: String!
  }

  input DeleteChatInput{
    From: String!
    To: String
  }

  input CreateMailInput{
    to: String!
    subject: String!
    text: String
    html: String
  }

  input CreateComplaintInput{
    UserId: String!
    PostId: String!
    Title: String!
    Description: String!
    Date: String!
    Time: String!
  }

  type CreateUserResult{
    success: Boolean!
    emailExist: Boolean!
    nickNameExist: Boolean!
  }

  type UpdateUserResult{ 
    success: Boolean!
    nickNameExist: Boolean!
  }

  type UpdatePasswordResult{
    success: Boolean!
    userExist: Boolean!
  }

  type UpdateEmailVerifyResult{
    success: Boolean!
    userExist: Boolean!
  }

  # Mutation
  type Mutation {

    # User #
    createUser(data: CreateUserInput!): CreateUserResult!
    updateUser(_id: ID!, data: UpdateUserInput!): UpdateUserResult!
    updatePassword(data: UpdatePasswordInput!): UpdatePasswordResult!
    updateEmailVerify(data: UpdateEmailVerifyInput!): UpdateEmailVerifyResult!

    # Mail #
    createResetPasswordMail(data: CreateMailInput!): Boolean!
    createEmailVerifyMail(data: CreateMailInput!): Boolean!

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

    # CommentLike #
    createCommentLike(data: CreateCommentLikeInput!): Boolean!
    deleteCommentLike(like_id: ID!): Boolean!
    deleteAllCommentLike(comment_id: ID!): Boolean!

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
    updateMessage(data: UpdateMessageInput!): Boolean!
    deleteMessage(data: DeleteMessageInput!): Boolean!

    # Chat #
    createOrUpdateChat(fromToData: ChatFromToInput!, data: ChatDataInput!): Boolean!
    deleteChat(chat_id: ID!): Boolean!

    # Complaint #
    createComplaint(data: CreateComplaintInput!): Boolean!
    deleteComplaint(complaint_id: ID!): Boolean!
  }

  # Subscribe
  type Subscription {
    # User #
    userCreated: User
    userUpdated(user_id: ID!): User

    # Post #
    postCreated(user_id: ID!): Post
    postDeleted(user_id: ID!): Post 

    # PostLike #
    postLikeCreated(post_id: ID!): PostLike

    # Comment #
    commentCreated(post_id: ID!): Comment

    # CommentLike #
    commentLikeCreated(comment_id: ID!): CommentLike
 
    # SavedPost #
    savedPostCreated(user_id: ID!): SavedPost

    # Notification #
    notificationCreated(user_id: ID!): Notification
    notificationDeleted(user_id: ID!): Notification

    # Connection #
    followerCreated(user_id: ID!): Connection
    myFollowedCreated(user_id: ID!): Connection

    # Message #
    messageCreated(chat_id: ID!): Message
    messageUpdated(message_id: ID!): Message
    messageDeleted(chat_id: ID!): Message

    # Chat #
    chatCreated(user_id: ID!): Chat
    chatUpdated(chat_id: ID!): Chat
    chatDeleted(user_id: ID!): Chat
  }
`;

export default typeDefs;