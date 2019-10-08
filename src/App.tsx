import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache, TrackInfo } from "./sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faPlayCircle, faStop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.scss";

interface Props {
  soundCache: SoundCache
};
interface State {
  playing: boolean,
  appHeight: number,
  tracks: TrackInfo[]
  beatsPerMinute: number
};

export default class MyApp extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      playing: false,
      appHeight: 0,
      beatsPerMinute: 90,
      tracks: this.getInitialSounds()
    };
  }

  private getInitialSounds() {
    function createEmptyTrack(category: string, sound: string): TrackInfo {
      const arr: boolean[][] = [];
      for (let r = 0; r < 4; r++) {
        arr[r] = [];
        for (let c = 0; c < 4; c++) {
          arr[r][c] = false;
        }
      }
      return {
        sound: {
          category: category,
          sound: sound
        },
        selected: arr
      }
    }
    return [
      createEmptyTrack("Acoustic", "ClHat-01"),
      createEmptyTrack("Acoustic", "Crash-02"),
      createEmptyTrack("Acoustic", "Tom-04")
    ]
  }

  private setBeatsPerMeasure(newBeatsPerMeasure: number) {
    const newArr = this.state.tracks.slice();
    newArr.forEach(track => track.selected.forEach(measure => measure.length = newBeatsPerMeasure));
    this.setState({ tracks: newArr });
  }

  private setAmountMeasures(newAmount: number) {
    const newArr = this.state.tracks.slice();
    newArr.forEach(track => {
      const oldLength=track.selected.length;
      track.selected.length = newAmount;
      if(newAmount>oldLength){
        for(let newMeasureIndex=oldLength; newMeasureIndex<track.selected.length; newMeasureIndex++){
          console.log(newMeasureIndex+" INDEX")
          track.selected[newMeasureIndex]=[];
          track.selected[newMeasureIndex].length=this.state.tracks[0].selected[0].length;
          for(let i=0; i<track.selected[newMeasureIndex].length; i++){
            track.selected[newMeasureIndex][i]=false;
          }
        }
      }
    });
    this.setState({ tracks: newArr });
  }

  render() {
    return (
      <div className="DrumMachineApp" style={{ height: `${this.state.appHeight}px` }}>
        <Themes.Context.Provider value={Themes.THEMES.DEFAULT}>
          <this.Controller />
          <Grid>
            <DrumMachine
              soundCache={this.props.soundCache}
              playing={this.state.playing}
              beatsPerMinute={this.state.beatsPerMinute}
              setPlaying={(playing: boolean) => {
                this.setState({ playing: playing });
              }}
              setTracks={(newTracks: TrackInfo[]) => this.setState({ tracks: newTracks })}
              tracks={this.state.tracks}
              updateAppWidth={() => {
                const windowHeight = Math.max(document.body.scrollHeight, window.outerHeight);
                const toSet = Math.max(windowHeight, this.state.appHeight);
                if (this.state.appHeight !== toSet) {
                  this.setState({ appHeight: toSet });
                }
              }}
            >
            </DrumMachine>
            <RightBar />
          </Grid>
        </Themes.Context.Provider>
      </div>
    );
  }
  readonly Controller: React.FC = () => {
    const [showing, setShowing] = React.useState(false);
    const getShowButton = () => (
      <div className="show-button"
        onClick={() => setShowing(!showing)}>
        <FontAwesomeIcon icon={!showing ? faCaretRight : faCaretLeft} />
      </div>
    )
    const getPlayButton = () => (
      <div className="play-button"
        onClick={() => this.setState({ playing: !this.state.playing })}>
        <FontAwesomeIcon className="toggle-icon" icon={!this.state.playing ? faPlayCircle : faStop} />
      </div>
    )
    const numberInput = (name: string, min: number, max: number, defaultVal: number, action: (app: MyApp, val: number) => void) => {
      return (
        <div className={`${name}-control number-control`}>
          <p className={`number-title`}>
            {name.toUpperCase()}
          </p>
          <input className={`number-input`} type="number" name={name.toUpperCase()}
            min={min} max={max} defaultValue={defaultVal.toString()}
            style={{ width: "100%" }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                let val = parseInt(e.currentTarget.value);
                if (val < min) {
                  e.currentTarget.value = min.toString();
                  val = min;
                }
                else if (val > max) {
                  e.currentTarget.value = max.toString();
                  val = max;
                }
                action(this, val);
                return false;
              }
            }} />
        </div>
      )
    }
    if (showing) {
      return (
        <div className="play-controller controller">
          {getPlayButton()}
          {getShowButton()}
          {numberInput("bpm", 10, 360, this.state.beatsPerMinute, (app, val) => app.setState({ beatsPerMinute: val }))}
          {numberInput("beats", 2, 8, this.state.tracks[0].selected[0].length, (app, val) => app.setBeatsPerMeasure(val))}
          {numberInput("measures", 2, 16, this.state.tracks[0].selected.length, (app, val) => app.setAmountMeasures(val))}
        </div>
      )
    } else {
      return (
        <div className="hidden-play-controller controller">
          {getShowButton()}
        </div>
      )
    }
  }
}

const Grid: React.FC = (props: any) => {
  const theme = React.useContext(Themes.Context);
  return (
    <div id="root-grid" style={{ background: theme.background }}>
      {props.children}
    </div>
  )
}

const RightBar: React.FC = () => {
  const githubLink = require("./options.json").githubLink;
  return (
    <div id="right">
      <div onClick={() => {
        window.open(githubLink, "_blank");
      }}>
        <FontAwesomeIcon className="github-icon" icon={faGithub} />
      </div>
    </div>
  )
}
