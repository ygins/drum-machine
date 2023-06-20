import React from 'react';
import { Theme, getTheme, getThemeNames, THEMES, Context } from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache, TrackInfo } from "./sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faPlayCircle, faStop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.scss";

interface Props{

}

interface State {
  playing: boolean,
  appHeight: number,
  tracks: TrackInfo[],
  beatsPerMinute: number,
  theme: Theme,
  soundCache: SoundCache|null
};

export default class MyApp extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)
    this.state = {
      playing: false,
      appHeight: 0,
      beatsPerMinute: 90,
      tracks: this.getInitialSounds(),
      theme: THEMES[0],
      soundCache: null
    };
    SoundCache.create().then(it=>this.setState({
      ...this.state,
      soundCache: it
    }))
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

  setBeatsPerMeasure(newBeatsPerMeasure: number) {
    const newArr = this.state.tracks.slice();
    newArr.forEach(track => track.selected.forEach(measure => measure.length = newBeatsPerMeasure));
    this.setState({ tracks: newArr });
  }

  setAmountMeasures(newAmount: number) {
    const newArr = this.state.tracks.slice();
    newArr.forEach(track => {
      const oldLength = track.selected.length;
      track.selected.length = newAmount;
      if (newAmount > oldLength) {
        for (let newMeasureIndex = oldLength; newMeasureIndex < track.selected.length; newMeasureIndex++) {
          track.selected[newMeasureIndex] = [];
          track.selected[newMeasureIndex].length = this.state.tracks[0].selected[0].length;
          for (let i = 0; i < track.selected[newMeasureIndex].length; i++) {
            track.selected[newMeasureIndex][i] = false;
          }
        }
      }
    });
    this.setState({ tracks: newArr });
  }

  render() {
    if(!this.state.soundCache){
      return <p>Loading... Please wait 10-20 seconds...</p>
    }
    else return (
      <div className="DrumMachineApp" style={{ height: `${this.state.appHeight}px` }}>
        <Context.Provider value={this.state.theme}>
          <Controller
            playing={this.state.playing}
            bpm={this.state.beatsPerMinute}
            tracks={this.state.tracks}
            useApp={(func: (app: MyApp)=>void)=>func(this)}>
          </Controller>
          <Grid>
            <DrumMachine
              soundCache={this.state.soundCache}
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
        </Context.Provider>
      </div>
    );
  }

}

interface ControllerProps {
  playing: boolean,
  bpm: number,
  tracks: TrackInfo[],
  useApp: (func: (app: MyApp) => void) => void
}
const Controller: React.FC<ControllerProps> = (props: ControllerProps) => {
  const [showing, setShowing] = React.useState(false);
  const theme = React.useContext(Context);
  const getShowButton = () => (
    <div className="show-button"
      onClick={() => setShowing(!showing)}>
      <FontAwesomeIcon icon={!showing ? faCaretRight : faCaretLeft} style={{ color: theme.text, fontSize: "200%" }} />
    </div>
  )
  const getPlayButton = () => (
    <div className="play-button"
      onClick={() => props.useApp(app => app.setState({ playing: !props.playing }))}>
      <FontAwesomeIcon className="toggle-icon" icon={!props.playing ? faPlayCircle : faStop} />
    </div>
  )
  const numberInput = (name: string, min: number, max: number, defaultVal: number, action: (app: MyApp, val: number) => void) => {
    return (
      <div className={`${name}-control control`}>
        <p className={`input-title`} style={{ color: theme.text }}>
          {name.toUpperCase()}
        </p>
        <input className={`input-box`} type="number" name={name.toUpperCase()}
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
              props.useApp(app => action(app, val));
              return false;
            }
          }} />
      </div>
    )
  }
  const getThemeInput = () => {
    const themeOptions = getThemeNames();
    let themeName = themeOptions.next();
    const themeNames = [];
    while (!themeName.done) {
      themeNames.push(<option value={themeName.value} key={themeName.value}>{themeName.value}</option>);
      themeName = themeOptions.next();
    }
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newTheme = getTheme(e.target.value);
      if (newTheme) {
        props.useApp(app => app.setState({ theme: newTheme }))
      }
    }
    return (
      <div className="theme-control control">
        <p className="input-title" style={{ color: theme.text }}>
          THEME
        </p>
        <select name="theme" className="input-box" value={theme.name} onChange={handleChange}>
          {themeNames}
        </select>
      </div>
    )
  }
  if (showing) {
    return (
      <div className="play-controller controller">
        {getPlayButton()}
        {getShowButton()}
        {numberInput("bpm", 10, 500, props.bpm, (app, val) => app.setState({ beatsPerMinute: val }))}
        {numberInput("beats", 1, 8, props.tracks[0].selected[0].length, (app, val) => app.setBeatsPerMeasure(val))}
        {numberInput("measures", 1, 16, props.tracks[0].selected.length, (app, val) => app.setAmountMeasures(val))}
        {getThemeInput()}
        <p id="instructions" style={{color: theme.text}}>Press Enter in a box to update changes!</p>
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

const Grid: React.FC = (props: any) => {
  const theme = React.useContext(Context);
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
