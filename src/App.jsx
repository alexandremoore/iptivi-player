import { Epg, Layout } from "planby";
import React from "react";
import ReactPlayer from "react-player";
import "./App.css";
import { ChannelItem } from "./components";
import { ProgramItem } from "./components/ProgramItem";
import { Timeline } from "./components/Timeline";
import { useApp } from "./useApp";

function App() {
  const [selectedChannel, setSelectedChannel] = React.useState();
  const { playlistData, channelsData, isLoading, getEpgProps, getLayoutProps } =
    useApp();

  const getChannel = (channelUUID) => {
    const channel = channelsData.find(
      (channel) => channel.uuid === channelUUID
    );
    const c = playlistData.find((pl) => pl.name === channel.title);
    return {channelUUID, url: c.url};
  };

  const playerHeight = "40vh";

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{ position: "fixed", top: 0, height: playerHeight }}
      >
        <ReactPlayer
          url={selectedChannel?.url}
          controls
          playing
          height={playerHeight}
          light={!selectedChannel?.url}
        />
      </div>

      <div
        style={{
          height: "60vh",
          width: "100%",
          overflow: "hidden",
          position: "fixed",
          top: playerHeight,
        }}
      >
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderTimeline={(props) => <Timeline {...props} />}
            renderProgram={({ program, ...rest }) => (
              <ProgramItem
                onClick={(data, isLive) => {
                  isLive && setSelectedChannel(getChannel(data.channelUuid));
                }}
                key={program.data.id}
                program={program}
                {...rest}
              />
            )}
            renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} onClick={(channel) => {
        
                
                setSelectedChannel(getChannel(channel.uuid));
                
              }} currentChannel={selectedChannel}/>
            )}
          />
        </Epg>
      </div>
    </div>
  );
}

export default App;
