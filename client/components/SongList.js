import React from "react";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  {
    songs {
      id
      title
    }
  }
`;

const SongList = ({ onSongSelected }) => {
  const { data, loading } = useQuery(QUERY);

  if (loading) {
    return <div>Loading....</div>;
  }

  const { songs } = data || {};

  const renderSongs = () => {
    return songs.map((song) => {
      return (
        <li key={song.id} className="collection-item">
          <button
            type="button"
            onClick={() => onSongSelected(song)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              padding: 0,
            }}
          >
            {song.title}
          </button>
        </li>
      );
    });
  };

  return <ul className="collection">{renderSongs()}</ul>;
};

SongList.propTypes = {
  onSongSelected: PropTypes.func,
};

export default SongList;
