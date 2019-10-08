import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import { SoundCache, Sound, TrackInfo } from "../.././sounds";
import Track from "../Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  soundCache: SoundCache,
  playing: boolean,
  setPlaying: (playing: boolean) => void,
  updateAppWidth: () => void,
  beatsPerMinute: number,
  tracks: TrackInfo[],
  setTracks: (newTracks: TrackInfo[]) => void
};

interface State {
  currentPlayingIndex: number,
  task?: number
};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType = Themes.Context;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPlayingIndex: -1
    }
    window.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 80) {
        this.props.setPlaying(!this.props.playing);
      }
    });
  }

  private getMeasuresPerTrack() {
    return this.props.tracks[0].selected.length;
  }

  private getBeatsPerMeasure() {
    return this.props.tracks[0].selected[0].length;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.playing != this.props.playing) {
      this.togglePlaying(this.props.playing, true);
    } else if (prevProps.beatsPerMinute != this.props.beatsPerMinute) {
      if (this.props.playing) {
        this.togglePlaying(false, true);
        this.togglePlaying(true, false);
      }
    }
    if (this.props.tracks.length !== prevProps.tracks.length) {
      this.props.updateAppWidth();
    }

  }

  componentDidMount() {
    this.props.updateAppWidth();
  }

  private togglePlaying(start: boolean, reset: boolean) {
    if (!start) {
      const task = this.state.task;
      if (task) {
        window.clearTimeout(task);
        this.setState({
          currentPlayingIndex: reset ? -1 : this.state.currentPlayingIndex,
          task: undefined
        });
      }
    } else {
      const task = window.setInterval(() => {
        this.setState({
          currentPlayingIndex: this.state.currentPlayingIndex === (this.getMeasuresPerTrack() * this.getBeatsPerMeasure()) - 1 ? 0 : this.state.currentPlayingIndex + 1,
          task: task,
        });
      }, 60000 / this.props.beatsPerMinute);
    }
  }
  private getTracks() {
    return this.props.tracks.map((sound, index) => {
      return (
        <Track
          soundCache={this.props.soundCache}
          isCurrentlyPlaying={this.props.playing}
          amtMeasures={this.getMeasuresPerTrack()}
          beatsPerMeasure={this.getBeatsPerMeasure()}
          trackIndex={index}
          trackInfo={sound}
          key={index}
          setBeats={(beats: boolean[][]) => {
            const newTracks = this.props.tracks.slice();
            newTracks[index].selected = beats;
            this.props.setTracks(newTracks);
          }}
          removeTrack={() => {
            if (this.props.tracks.length == 1) {
              return;
            }
            const newTracks = this.props.tracks.slice();
            newTracks.splice(index, 1);
            this.props.setTracks(newTracks);
          }}
          changeTrack={(track: Sound) => {
            const newTracks = this.props.tracks.slice();
            newTracks.splice(index, 1, {
              sound: track,
              selected: this.props.tracks[index].selected
            });
            this.props.setTracks(newTracks)
          }}
          currentPlayingIndex={this.state.currentPlayingIndex}
        />
      )
    });
  }
  render() {
    const currentTheme = this.context;
    const addNewTrack = () => {
      const newArr = this.props.tracks.slice();
      const newSelectionArr: boolean[][] = [];
      for (let r = 0; r < this.getMeasuresPerTrack(); r++) {
        newSelectionArr[r] = [];
        for (let c = 0; c < this.getBeatsPerMeasure(); c++) {
          newSelectionArr[r][c] = false;
        }
      }
      newArr.push({ sound: { category: "Acoustic", sound: "Tom-04" }, selected: newSelectionArr });
      this.props.setTracks(newArr);
    }
    return (
      <div id="frame" style={{
        backgroundColor: currentTheme.machine,
        border: currentTheme.border
      }}>
        {this.getTracks()}
        <div className="add-icon-container" style={{
          gridRowStart: this.props.tracks.length,
          gridRowEnd: this.props.tracks.length + 1,
          gridColumnStart: 1,
          gridColumnEnd: this.getMeasuresPerTrack()
        }} onClick={addNewTrack}>
          <FontAwesomeIcon className="add-icon" icon={faPlusCircle} />
        </div>
      </div>
    )
  }
}
