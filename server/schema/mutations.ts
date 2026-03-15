import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import mongoose from "mongoose";
import SongType from "./song_type";
import LyricType from "./lyric_type";
import { ISongModel, ISong } from "../models/song";
import { ILyricModel } from "../models/lyric";

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
        return Song.addLyric(args.songId, args.content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        return Lyric.like(args.id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue: unknown, args: Record<string, string>) {
        return Song.deleteOne({ _id: args.id });
      },
    },
  },
});

export default mutations;
