import React from "react";
import Themes from "../../Theme";
import { Sound } from "../../sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface Props {
  soundName: string,
  removeTrack: () => void,
  changeTrack: (track: Sound) => void
}

const TrackController: React.FC<Props> = (props: Props) => {
  const ChangeBox: React.FC = ()=>{
    return (
      <div className="change-box">
      </div>
    )
  }
  return (
    <div className="track-controller" style={{
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 0,
      gridRowEnd: 2,
      border: React.useContext(Themes.Context).measureBorder
    }}>
      <p className="track-name">{props.soundName}</p>
      <div
        className="remove-button button"
        onClick={() => props.removeTrack()}>
        <FontAwesomeIcon className="icon" icon={faTrashAlt} />
      </div>
      <div
        className="change-button button"
        onClick={() => props.changeTrack({ category: "drums", sound: "drum1" })}>
        <FontAwesomeIcon className="icon" icon={faExchangeAlt} />
      </div>
    </div>
  )
}

export default TrackController;
