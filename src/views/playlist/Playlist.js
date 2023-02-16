import React, { useState, useEffect, useContext } from "react";
import MusicList from "../../components/music-list/MusicList";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import prettyMilliseconds from "pretty-ms";

import "./Playlist.css";
import SongHeader from "../../components/playlist-header/SongHeader";

export default function Playlist(props) {
  // data info
  const [playlistInfo, setPlaylistInfo] = useState({
    collaborative: false,
    description:
      "<a>NKVT</a> sunar: yılın favori Türkçe rap parçaları. Kapak: UZI",
    followers: { total: 10000 },
    images: [{ url: "" }],
    name: "NKVT 2021",
    owner: {},
    public: false,
    tracks: {},
    uri: "spotify:playlist:37i9dQZF1DX4Wsb4d7NKfP",
  });
  const [playlistInfoDuration, setPlaylistInfoDuration] = useState(0);

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [loading, setloading] = useState(false);

  let navigate = useNavigate();

  // Id params from url
  const { id } = useParams();

  //go to top
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
    params: { id: id, offset: "0" },
    headers: {
      "X-RapidAPI-Key": "fbda0b7f98mshfc3b56db77a522ap1fb738jsn10cc01abb78e",
      "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
  };

  const optionsInfo = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/playlist/",
    params: { id: id },
    headers: {
      "X-RapidAPI-Key": "fbda0b7f98mshfc3b56db77a522ap1fb738jsn10cc01abb78e",
      "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
  };

  // console.log(options);
  // useEffect(() => {
  //   if (JSON.parse()) {
  //   }
  // }, []);

  useEffect(() => {
    setloading(true);
    if (
      localStorage.getItem("currentPlaylistId") !== id ||
      !localStorage.getItem("currentPlaylistId")
    ) {
      console.log("cambiato");

      localStorage.setItem("currentPlaylistId", id);
      getPlaylistInfo();
      getPlaylistTracks();
    } else {
      setPlaylistInfo(JSON.parse(localStorage.getItem("currentPlaylistInfo")));
      setPlaylistTracks(
        JSON.parse(localStorage.getItem("currentPlaylistTracks"))
      );
    }
    setloading(false);
  }, []);

  useEffect(() => {
    if (playlistInfo) {
      calcDurationPlaylist(playlistInfo);
    }
  }, []);

  const getPlaylistTracks = async () => {
    await axios
      .request(options)
      .then((response) => {
        localStorage.setItem(
          "currentPlaylistTracks",
          JSON.stringify(response.data.items)
        );
        setPlaylistTracks(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPlaylistInfo = async () => {
    axios
      .request(optionsInfo)
      .then((response) => {
        localStorage.setItem(
          "currentPlaylistInfo",
          JSON.stringify(response.data)
        );
        setPlaylistInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calcDurationPlaylist = (arr) => {
    let c = 0;
    arr.tracks?.items?.map((el) => (c += el.track.duration_ms));
    setPlaylistInfoDuration(c);
  };

  // console.log("img", playlistTracks[0].track.album.images[0].url);

  return (
    <div className="playlist">
      <div className="playlist-container">
        <SongHeader
          playlist={true}
          music={false}
          artist={"artist"}
          listNumber={playlistInfo?.tracks?.total}
          year={2022}
          duration={prettyMilliseconds(playlistInfoDuration)}
          title={playlistInfo?.name}
          desc={playlistInfo?.description}
          follower={playlistInfo?.followers?.total.toLocaleString("de-DE", {
            minimumFractionDigits: 0,
          })}
          img={
            playlistInfo &&
            playlistInfo.images &&
            playlistInfo.images?.length !== 0 &&
            playlistInfo?.images[0]?.url
          }
        />

        <section className="playlist-content">
          <div className="playlist-content-table">
            <div className="music-list-number flex-center">
              <h2>#</h2>
            </div>
            <div className="music-list-title flex-left">
              <div className="music-list-title-desc">
                <h2>title</h2>
              </div>
            </div>
            <div className="music-list-album flex-center">
              <h2>album</h2>
            </div>
            <div className="music-list-data flex-center">
              <h2>data</h2>
            </div>
            <div className="music-list-duration flex-center">
              <AccessTimeIcon />
            </div>
          </div>
          {/* <MusicListHeader /> */}
          {playlistTracks?.map((el, index) => (
            <div onClick={() => navigate("/track/" + el.track?.id)} key={index}>
              <MusicList
                number={index + 1}
                img={el.track?.album?.images[0]?.url}
                title={el.track?.name}
                artist={el.track?.artists}
                album={el.track?.album?.name}
                data={el.track?.album?.release_date}
                duration={prettyMilliseconds(el.track?.duration_ms, {
                  secondsDecimalDigits: 0,
                })}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
