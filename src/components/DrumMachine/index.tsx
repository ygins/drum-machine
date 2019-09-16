import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import { SoundCache, Sound } from "../.././sounds";
import Track from "../Track";

interface Props {
  soundCache: SoundCache,
  tracks: Sound[],
  playing: boolean,
  setPlaying: (playing: boolean)=>void
};

interface State {
  numMeasures: number,
  beatsPerMinute: number,
  beatsPerMeasure: number,
  currentPlayingIndex: number,
  tracks: Sound[],
  task?: number
};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
    this.state = {
      numMeasures: 4,
      beatsPerMinute: 260,
      beatsPerMeasure: 5,
      tracks: this.props.tracks,
      currentPlayingIndex: -1
    }
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 80) {
        this.props.setPlaying(!this.props.playing);
      }
    });
  }
  componentDidUpdate(prevProps: Props){
    if(prevProps.playing != this.props.playing){
      this.togglePlaying(this.props.playing);
    }
  }

  private togglePlaying(start: boolean) {
    if (!start) {
      const task = this.state.task;
      if (task) {
        window.clearTimeout(task);
        this.setState({
          currentPlayingIndex: -1,
          task: undefined
        });
      }
    } else {
      const task = window.setInterval(() => {
        this.setState({
          currentPlayingIndex: this.state.currentPlayingIndex === (this.state.numMeasures * this.state.beatsPerMeasure) - 1 ? 0 : this.state.currentPlayingIndex + 1,
          task: task,
        });
      }, 60000 / this.state.beatsPerMinute);
    }
  }
  private getTracks() {
    return this.state.tracks.map((sound, index) => {
      return (
        <Track
          soundCache={this.props.soundCache}
          isCurrentlyPlaying={this.props.playing}
          amtMeasures={this.state.numMeasures}
          beatsPerMeasure={this.state.beatsPerMeasure}
          sound={sound}
          trackIndex={index}
          key={index}
          removeTrack={() => this.setState({ tracks: this.state.tracks.splice(index, 1) })}
          changeTrack={(track: Sound) => this.setState({ tracks: this.state.tracks.splice(index, 1, track) })}
          currentPlayingIndex={this.state.currentPlayingIndex}
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
