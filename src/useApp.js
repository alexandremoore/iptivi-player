import React from "react";

import { fetchChannels, fetchEpg, fetchPlaylist } from "./helpers";

import { useEpg } from "planby";

import { theme } from "./helpers/theme";

export function useApp() {
  const [channels, setChannels] = React.useState([]);
  const [epg, setEpg] = React.useState([]);
  const [playlist, setPlaylist] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);
  const playlistData = React.useMemo(() => playlist, [playlist]);
  const dateNow = new Date();
  const dateMidnight = React.useMemo(() => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date;
  }, []);
  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 7200,
    sidebarWidth: 320,
    itemHeight: 80,
    isSidebar: true,
    isTimeline: true,
    isLine: false,
    startDate: dateNow,
    endDate: dateMidnight,
    isBaseTimeFormat: true,
    theme,
  });

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const epg = await fetchEpg();
    const channels = await fetchChannels();
    const playlist = await fetchPlaylist();

    setEpg(epg);
    // filter channels to includes only the ones in the playlist
    setChannels(channels.filter((channel)=> playlist?.channels?.map(pl => pl.name).includes(channel.title)));
    setPlaylist(playlist.channels);
    setIsLoading(false);
  }, []);

  

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { playlistData, channelsData, getEpgProps, getLayoutProps, isLoading };
}
