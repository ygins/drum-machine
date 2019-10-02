import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import { SoundCache, Sound } from "../.././sounds";
import Track from "../Track";

interface Props {
  soundCache: SoundCache,
  playing: boolean,
  setPlaying: (playing: boolean) => void,
  updateAppWidth: () => void
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
  private maybeDumps: Sound[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      numMeasures: 4,
      beatsPerMinute: 260,
      beatsPerMeasure: 4,
      tracks: this.getSounds(),
      currentPlayingIndex: -1
    }
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 80) {
        this.props.setPlaying(!this.props.playing);
      }
    });
  }
  private getSounds() {
    return [
      { category: "Acoustic", sound: "ClHat-01" },
      { category: "Acoustic", sound: "Crash-02" },
      { category: "Acoustic", sound: "Tom-04" }
    ]
  }

  componentDidUpdate(prevProps: Props) {
    this.maybeDumps.forEach(soundToDump => {
      if (!this.state.tracks.find(it => it == soundToDump)) {
        this.props.soundCache.dump(soundToDump);
      }
    });
    this.maybeDumps.length = 0;

    if (prevProps.playing != this.props.playing) {
      this.togglePlaying(this.props.playing);
    }
    this.props.updateAppWidth();
  }

  componentDidMount() {
    this.props.updateAppWidth();
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
          removeTrack={() => {
            if (this.state.tracks.length == 1) {
              return;
            }
            const newTracks = this.state.tracks.slice();
            const deleted = newTracks.splice(index, 1);
            this.setState({ tracks: newTracks });
            this.maybeDumps.push(deleted[0]);
          }}
          changeTrack={(track: Sound) => {
            const newTracks = this.state.tracks.slice();
            const deleted = newTracks.splice(index, 1, track);
            this.setState({ tracks: newTracks });
            this.maybeDumps.push(deleted[0]);
          }}
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
