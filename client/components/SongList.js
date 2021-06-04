import React from "react";
import gql from "graphql-tag";
import PropType from "prop-types";
import { graphql } from "react-apollo";

const SongList = ({ data }) => {
  const { songs, loading } = data;
  const renderSongs = () => {
    return songs.map((song) => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  };
  if (loading) {
    return <div>Loading....</div>;
  }
  return <ul className="collection">{renderSongs()}</ul>;
};

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

SongList.propTypes = {
  data: PropType.shape(),
};

export default graphql(query)(SongList);
