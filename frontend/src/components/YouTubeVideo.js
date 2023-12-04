import React from "react";
import styled from "styled-components";
const Wrapper = styled.section`
  /* YouTubeVideo.css */

  .video-container {
    position: relative;
    width: 80%;
    margin-top: 3%;
    margin-left: 10%;
    border-radius: 20px;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (change as needed) */
    overflow: hidden;
    margin-bottom: 3%; /* Optional: Adjust spacing */
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    animation: fadeInAnimation 1s ease-in-out; /* Add animation */
  }

  /* Define animation keyframes */
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const YouTubeVideo = () => {
  return (
    <Wrapper>
      <div className="video-container">
        <iframe
          width="1061"
          height="597"
          src="https://www.youtube.com/embed/aOKPanscMuE"
          title="Benque The credit card management! platform"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </Wrapper>
  );
};

export default YouTubeVideo;
