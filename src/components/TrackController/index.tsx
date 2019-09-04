import React from "react";
import Track from "../Track";
import { Sound } from "../../sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface Props {
  soundName: string,
  removeTrack: () => void,
  changeTrack: (track: Sound) => void
}

interface State {

}

export default class TrackController extends React.Component<Props, State>{
  
  render() {
    return (
      <div className="track-controller" style={{
        gridColumnStart: 1,
        gridColumnEnd: 2,
        gridRowStart: 0,
        gridRowEnd: 2
      }}>
        <p className="track-name">{this.props.soundName}</p>
        <div
          className="remove-button button"
          onClick={() => this.props.removeTrack()}>
          <FontAwesomeIcon className="icon" icon={faTrashAlt} />
        </div>
        <div
          className="change-button button"
          onClick={() => this.props.changeTrack({ category: "drums", sound: "drum1" })}>
          <FontAwesomeIcon className="icon" icon={faExchangeAlt} />
        </div>
      </div>
    )
  }
}
