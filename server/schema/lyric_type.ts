import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import LyricModel from "../models/lyric";

const LyricType: GraphQLObjectType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      type: require("./song_type").default,
      resolve(parentValue: { id: string }) {
        return LyricModel.findById(parentValue)
          .populate("song")
          .then((lyric) => {
            return lyric?.get("song");
          });
      },
    },
  }),
});

export default LyricType;
