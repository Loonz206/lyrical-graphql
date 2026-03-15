import SongList from "./SongList";

interface Song {
  id: string;
  title: string;
}

const App = () => {
  const handleSongSelected = (song: Song) => {
    console.log("Song selected:", song);
  };

  return (
    <div className="container">
      <SongList onSongSelected={handleSongSelected} />
    </div>
  );
};

export default App;
