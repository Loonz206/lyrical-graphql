import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
import LyricType from "./lyric_type";
import SongModel from "../models/song";

const SongType: GraphQLObjectType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue: { id: string }) {
        return SongModel.findLyrics(parentValue.id);
      },
    },
  }),
});

export default SongType;
