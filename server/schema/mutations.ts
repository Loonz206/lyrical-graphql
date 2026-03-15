import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import mongoose from "mongoose";
import SongType from "./song_type";
import LyricType from "./lyric_type";
import { ISongModel, ISong } from "../models/song";
import { ILyricModel } from "../models/lyric";
import { assertValidObjectId } from "../utils/validateObjectId";

const Song = mongoose.model<ISong, ISongModel>("song");
const Lyric = mongoose.model<InstanceType<ILyricModel>, ILyricModel>("lyric");

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        return new Song({ title: args.title }).save();
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        const songId = assertValidObjectId(args.songId, "songId");
        return Song.addLyric(songId, args.content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        const id = assertValidObjectId(args.id);
        return Lyric.like(id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        const id = assertValidObjectId(args.id);
        return Song.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
      },
    },
  },
});

export default mutations;
