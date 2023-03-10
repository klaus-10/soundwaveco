import React from "react";

import "./SongHeader.css";

export default function SongHeader(props) {
  return (
    <section
      className={props.loading ? "playlist-header loading" : "playlist-header"}
    >
      <div className="playlist-header-content contentSpacing-nowidth">
        <div className="playlist-img">
          <img alt="" src={props.img && props.img} loading="eager" />
        </div>
        <div className="playlist-header-desc">
          <h2>{props.playlist && "playlist"}</h2>
          <h2>{props.music && "brano"}</h2>
          <h1>{props.title}</h1>
          <span className="standalone-ellipsis-one-line">
            <h3>{props.desc && props.playlist ? props.desc : ""}</h3>
          </span>
          <p>
            Avatar, {props.artist + ","}{" "}
            {props.listNumber && props.playlist && props.listNumber + " Brani,"}
            {props.year && props.year + ","}{" "}
            {props.playlist && props.follower + " seguiti,"} {props.duration}
          </p>
        </div>
      </div>
    </section>
  );
}
