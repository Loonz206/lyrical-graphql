import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISong extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
  lyrics: mongoose.Types.ObjectId[];
}

export interface ISongModel extends Model<ISong> {
  addLyric(id: string, content: string): Promise<ISong>;
  findLyrics(id: string): Promise<Document[]>;
}

const SongSchema = new Schema<ISong, ISongModel>({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: "lyric",
    },
  ],
});

SongSchema.statics.addLyric = function (
  id: string,
  content: string,
): Promise<ISong> {
  const Lyric = mongoose.model("lyric");

  return this.findById(id).then((song: ISong | null) => {
    if (!song) {
      throw new Error(`Song not found: ${id}`);
    }
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric.id);
    return Promise.all([lyric.save(), song.save()]).then(
      ([, savedSong]) => savedSong,
    );
  });
};

SongSchema.statics.findLyrics = function (id: string): Promise<Document[]> {
  return this.findById(id)
    .populate("lyrics")
    .then((song: ISong | null) => {
      if (!song) {
        throw new Error(`Song not found: ${id}`);
      }
      return song.lyrics as unknown as Document[];
    });
};

const songModel = mongoose.model<ISong, ISongModel>("song", SongSchema);
export default songModel;
