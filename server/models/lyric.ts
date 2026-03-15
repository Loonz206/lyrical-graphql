import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILyric extends Document {
  song: mongoose.Types.ObjectId;
  likes: number;
  content: string;
}

export interface ILyricModel extends Model<ILyric> {
  like(id: string): Promise<ILyric>;
}

const LyricSchema = new Schema<ILyric, ILyricModel>({
  song: {
    type: Schema.Types.ObjectId,
    ref: "song",
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

LyricSchema.statics.like = function (id: string): Promise<ILyric> {
  const Lyric = mongoose.model<ILyric, ILyricModel>("lyric");

  return Lyric.findById(id).then((lyric) => {
    if (!lyric) {
      throw new Error(`Lyric not found: ${id}`);
    }
    ++lyric.likes;
    return lyric.save();
  });
};

const LyricModel = mongoose.model<ILyric, ILyricModel>("lyric", LyricSchema);
export default LyricModel;
