import React from "react";
import PropTypes from "prop-types";
import "./VideoStyle.scss";

const VideoEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

VideoEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default VideoEmbed;
