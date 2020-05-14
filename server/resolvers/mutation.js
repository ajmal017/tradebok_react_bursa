import mongoose from "mongoose";

const User = require("../model/user");
const Post = require("../model/post");

const addProfileToFollowingList = (userId, profileToFollowUserId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $push: { followingIds: profileToFollowUserId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addProfileToFollowerList = (userId, profileToFollowUserId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: profileToFollowUserId },
      { $push: { followerIds: userId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const addPost = (id, caption, uri, reports, authorId) =>
  new Promise((resolve, reject) => {
    Post.create(
      { caption, uri, reports, author: authorId, _id: id },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
const updateUserPostList = (userId, postId) =>
  new Promise((resolve, reject) => {
    User.update(
      { _id: userId },
      { $push: { posts: postId } },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
const resolvers = {
  followProfile: (_, args) => {
    return Promise.all([
      addProfileToFollowingList(args.userId, args.profileToFollowUserId),
      addProfileToFollowerList(args.userId, args.profileToFollowUserId),
    ]).then((result) => result[0]);
  },
  //   unFollowProfile: (_, args) => {
  //     return Promise.all([
  //       removeProfileFromFollowingList(args.userId, args.profileToFollowUserId),
  //       removeProfileFromFollowerList(args.userId, args.profileToFollowUserId),
  //     ]).then((result) => result[0]);
  //   },
  createPlayer: (_, args) => {
    const newlyCreatedPlayer = new Player({
      name: args.name,
      position: args.position,
      team: args.team,
      jerseyNumber: args.jerseyNumber,
      wonSuperBowl: args.wonSuperBowl,
    });
    newlyCreatedPlayer.save();
    return newlyCreatedPlayer;
  },
  updatePlayer: (_, args) => {
    return Player.findByIdAndUpdate(
      { _id: args.id },
      { $set: args },
      async (error, playerUpdated) => {
        if (error) {
          throw new Error(error);
        }
        return await playerUpdated;
      }
    );
  },
  deletePlayer: (_, args) => {
    return Player.findByIdAndDelete(
      { _id: args.id },
      (error, playerDeleted) => {
        if (error) {
          throw new Error(error);
        }
        return;
      }
    );
  },
  createUser: (_, args) => {
    const newUser = new User({
      authId: args.authId,
      avatar: args.avatar,
      name: args.name,
      email: args.email,
    });
    newUser.save(function (err) {
      // const id = newUser._id; // Hey!
    });
    return newUser;
  },
  updateUser: (_, args) => {
    return User.findByIdAndUpdate(
      { _id: args.id },
      { $set: args },
      async (error, userUpdate) => {
        if (error) {
          throw new Error(error);
        }
        return await userUpdate;
      }
    );
  },
  deleteUser: (_, args) => {
    return user.findByIdAndDelete({ _id: args.id }, (error, userDeleted) => {
      if (error) {
        throw new Error(error);
      }
      return;
    });
  },
  createPost: (_, args) => {
    const id = mongoose.Types.ObjectId();
    return Promise.all([
      addPost(id, args.caption, args.uri, args.reports, args.authorId),
      updateUserPostList(args.authorId, id),
    ]).then((result) => result[0]);
  },
};

export default resolvers;