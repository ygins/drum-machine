import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import { SoundCache, Sound } from "../.././sounds";
import Track from "../Track";

interface Props {
  soundCache: SoundCache,
  tracks: Sound[],
  currentPlayingIndex: number
};

interface State {
  numMeasures: number,
  beatsPerMinute: number,
  beatsPerMeasure: number,
  isCurrentlyPlaying: boolean,
  tracks: Sound[],
};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
    this.state = {
      numMeasures: 4,
      beatsPerMinute: 90,
      beatsPerMeasure: 4,
      isCurrentlyPlaying: false,
      tracks: this.props.tracks
    }
  }

  private getTracks() {
    return this.state.tracks.map((sound, index) => {
      return (
        <Track
          soundCache={this.props.soundCache}
          isCurrentlyPlaying={this.state.isCurrentlyPlaying}
          amtMeasures={this.state.numMeasures}
          beatsPerMeasure={this.state.beatsPerMeasure}
          sound={sound}
          trackIndex={index}
          key={index}
          removeTrack={() => this.setState({ tracks: this.state.tracks.splice(index, 1) })}
          changeTrack={(track:Sound)=>this.setState({tracks: this.state.tracks.splice(index, 1, track)})}
          currentPlayingIndex={this.props.currentPlayingIndex}
        />
      )
    });
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
