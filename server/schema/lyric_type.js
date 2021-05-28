const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const LyricModel = require("../models/lyric");

const LyricType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require("./song_type"),
      resolve(parentValue, args) {
        return LyricModel.findById(parentValue)
          .populate("song")
          .then((lyric) => {
            console.log(lyric);
            return lyric.song;
          });
      },
    },
  }),
});

module.exports = LyricType;
