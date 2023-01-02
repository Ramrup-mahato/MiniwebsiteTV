import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import parser from "iptv-playlist-parser";

// const url1 = "https://iptv-org.github.io/iptv/languages/hin.m3u";
// const url2 = "https://iptv-org.github.io/iptv/countries/in.m3u";
// const url3 = "https://iptv-org.github.io/iptv/categories/movies.m3u";
// const url4 = "https://iptv-org.github.io/iptv/countries/in.m3u";
const ChannelType = [
  {
    id: 1,
    name: "Hindi",
    url: "https://iptv-org.github.io/iptv/languages/hin.m3u",
  },
  {
    id: 2,
    name: "Indian",
    url: "https://iptv-org.github.io/iptv/countries/in.m3u",
  },
  {
    id: 3,
    name: "English",
    url: "https://iptv-org.github.io/iptv/languages/eng.m3u",
  },
  {
    id: 4,
    name: "Movies",
    url: "https://iptv-org.github.io/iptv/categories/movies.m3u",
  },
  {
    id: 5,
    name: "Music",
    url: "https://iptv-org.github.io/iptv/categories/music.m3u",
  },
  {
    id: 6,
    name: "News",
    url: "https://iptv-org.github.io/iptv/categories/news.m3u",
  },
  {
    id: 7,
    name: "Sport",
    url: "https://iptv-org.github.io/iptv/categories/sport.m3u",
  },
  {
    id: 8,
    name: "Entertainment",
    url: "https://iptv-org.github.io/iptv/categories/entertainment.m3u",
  },
  {
    id: 9,
    name: "Education",
    url: "https://iptv-org.github.io/iptv/categories/education.m3u",
  },
  {
    id: 10,
    name: "Comedy",
    url: "https://iptv-org.github.io/iptv/categories/comedy.m3u",
  },
  {
    id: 11,
    name: "All Channel",
    url: "https://iptv-org.github.io/iptv/index.country.m3u",
  },
];
const Home = ({ channel }) => {
  const [url, setUrl] = useState(
    "https://iptv-org.github.io/iptv/languages/hin.m3u"
  );
  const [statess, setStatess] = useState([]);
  const [playStop, setPlayStop] = useState(true);
  const [urlinx, setUrlinx] = useState(1);
  const [channelinx, setChannelinx] = useState(0);
  const [inpUrl, setInpUrl] = useState("");
  const [typeUrl, setTypeUrl] = useState(false);
  const [chooseChannel, setChooseChannel] = useState(
    "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XM/9XM.isml/index.m3u8"
  );
  const handlePlayStop = () => {
    if (playStop) {
      setPlayStop(false);
    } else {
      setPlayStop(true);
    }
  };
  const handleSelecturl = (id, url) => {
    setUrl(url);
    setUrlinx(id);
    setChannelinx();
  };
  const handleSelectChannel = (i, url) => {
    setChannelinx(i);
    setChooseChannel(url);
  };
  const handleExternalUrl = () => {
    if (typeUrl === true) {
      setUrl(inpUrl);
    } else {
      setChooseChannel(inpUrl);
      setUrl();
    }
    setUrlinx();
    setChannelinx();
    setStatess([]);
  };

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        if (response) {
          const result = parser.parse(response.data);
          const all = response.data.split("#");
          console.log(result.items);
          setStatess(result.items);
        } else {
          console.log("error------------------");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [url]);
  return (
    <div className="homeMainDiv">
      <div className="homeReactPlayerContainerdiv">
        <div className="homeReactPlayerdiv">
          <ReactPlayer
            url={chooseChannel}
            playing={playStop}
            controls
            volume={1}
            // loop={true}
            // onSeek
            // onEnablePIP
            width="100%"
            height="100%"
          /><br />
          <button className=" PlayPauses" onClick={handlePlayStop}>
            {playStop ? "Stop" : "Play"}
          </button>
        </div>
        <div className="homeChannelmenu">
          <div className="channelName">
            {ChannelType.map((ele, i) => (
              <div
                key={i}
                className={`logoName height ${
                  urlinx === ele.id ? "select" : undefined
                }`}
                onClick={() => handleSelecturl(ele.id, ele.url)}
              >
                <p>{ele.name} </p>
              </div>
            ))}
          </div>
          <hr />
          <div className="selectTypeUrl">
            <button
              className={typeUrl === false ? "select" : undefined}
              onClick={() => setTypeUrl(false)}
            >
              URL/single channel m3u URL
            </button>
            <button
              className={typeUrl === true ? "select" : undefined}
              onClick={() => setTypeUrl(true)}
            >
              m3u URL
            </button>
          </div>
          <div className="homeUrl">
            <input
              type="text"
              placeholder="Enter URL,Like YouTube URL"
              value={inpUrl}
              onChange={(e) => setInpUrl(e.target.value)}
            />
            <button onClick={handleExternalUrl}>Load</button>
          </div>

          <div>
            <p className="Warning">
              <strong>Warning:-</strong>For some Channel Heigh Ineternet
              connection is required!{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="homeScrollmaindiv">
        <div className="homeScrolldiv">
          <div className="homeChannelmenu hide">
            <div className="channelName">
              {ChannelType.map((ele, i) => (
                <div
                  key={i}
                  className={`logoName height ${
                    urlinx === ele.id ? "select" : undefined
                  }`}
                  onClick={() => handleSelecturl(ele.id, ele.url)}
                >
                  <p>{ele.name} </p>
                </div>
              ))}
            </div>
            <hr />
            <div className="selectTypeUrl">
              <button
                className={typeUrl === false ? "select" : undefined}
                onClick={() => setTypeUrl(false)}
              >
                URL/single channel m3u URL
              </button>
              <button
                className={typeUrl === true ? "select" : undefined}
                onClick={() => setTypeUrl(true)}
              >
                m3u URL
              </button>
            </div>
            <div className="homeUrl">
              <input
                type="text"
                placeholder="Enter URL,Like YouTube URL"
                value={inpUrl}
                onChange={(e) => setInpUrl(e.target.value)}
              />
              <button onClick={handleExternalUrl}>Load</button>
            </div>

            <div>
              <p className="Warning">
                <strong>Warning:-</strong>For some Channel Heigh Ineternet
                connection is required!{" "}
              </p>
            </div>
          </div>
          {/* <button className=" PlayPauses" onClick={handlePlayStop}>
        {playStop ? "Stop" : "Play"}
      </button> */}
          <div className="channelName">
            {statess.map((ele, i) => (
              <>
                <div
                  className={`logoName ${
                    channelinx === i ? "select" : undefined
                  }`}
                  onClick={() => handleSelectChannel(i, ele.url)}
                >
                  <p className="logoNameIndex">{i}</p>
                  <img src={ele.tvg.logo} />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
