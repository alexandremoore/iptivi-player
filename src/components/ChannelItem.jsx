import { ChannelBox, ChannelLogo } from "planby";
import "./ChannelItem.css"

export const ChannelItem = ({ channel, onClick,currentChannel }) => {
  const { position, logo } = channel;
const isSelected = currentChannel && currentChannel.channelUUID === channel.uuid
  return (
    <ChannelBox {...position} onClick={() => onClick(channel)} className={`channelItem ${isSelected && "selected"}`}>
      {/* Overwrite styles by add eg. style={{ maxHeight: 52, maxWidth: 52,... }} */}
      {/* Or stay with default styles */}
      <ChannelLogo
        src={logo}
        alt="Logo"
        style={{ maxHeight: 52, maxWidth: 200 }}
      />
      <div  >{channel.title}</div>
    </ChannelBox>
  );
};
