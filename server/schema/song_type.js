const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require("./lyric_type");
const SongModel = require("../models/song");

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue, args) {
        return SongModel.findLyrics(parentValue.id);
      },
    },
  }),
});

module.exports = SongType;
