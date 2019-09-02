import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import {SoundCache, Sound} from "../.././sounds";
import Track from "../Track";

interface Props {
  soundCache: SoundCache
};

interface State {
  numMeasures: number,
  beatsPerMinute: number,
  beatsPerMeasure: number,
  isCurrentlyPlaying: boolean
};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
    this.state = {
      numMeasures: 4,
      beatsPerMinute: 90,
      beatsPerMeasure: 4,
      isCurrentlyPlaying: false
    }
  }

  private getTracks() {
    const arr = [];
    for (let i = 0; i < this.state.numMeasures; i++) {
      arr.push((
        <Track
          soundCache={this.props.soundCache}
          isCurrentlyPlaying={this.state.isCurrentlyPlaying}
          amtMeasures={this.state.numMeasures}
          beatsPerMeasure={this.state.beatsPerMeasure}
          sound={{category: "drum", sound: "drum1"}}
          trackIndex={i}
          key={i}
        />
      ));
    }
    return arr;
  }
  render() {
    const currentTheme = this.context
    return (
      <div id="frame" style={{
        backgroundColor: currentTheme.machine,
        border: currentTheme.border
      }}>
        {this.getTracks()}
      </div>
    )
  }
}
