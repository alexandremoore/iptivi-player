import { parseM3U } from "@iptv/playlist";
import { parseXmltv } from "@iptv/xmltv";

export const fetchChannels = () =>
  fetch("https://i.mjh.nz/PlutoTV/fr.xml")
    .then((res) => res.text())
    .then((data) => parseXmltv(data))
    .then((epg) =>
      epg.channels.map((channel) => {
        return {
          uuid: channel.id,
          type: "channel",
          logo: channel.icon?.[0]?.src,
          title: channel.displayName?.[0]?._value,
        };
      })
    );

export const fetchEpg = async () =>
  fetch("https://i.mjh.nz/PlutoTV/fr.xml")
    .then((res) => res.text())
    .then((data) => parseXmltv(data))
    .then((epg) =>
      epg.programmes.map((programme) => {
        return {
          description: programme.desc?.[0]?._value,
          title: programme.title?.[0]?._value,
          since: programme.start,
          till: programme.stop,
          channelUuid: programme.channel,
          image: programme.icon?.[0]?.src,
        };
      })
    );

export const fetchPlaylist = async () =>
  fetch("https://alexandremoore.github.io/iptivi/plutotv.m3u")
    .then((res) => res.text())
    .then((data) => parseM3U(data));
