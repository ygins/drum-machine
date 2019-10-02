import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache } from "./sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faPlayCircle, faStop } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

interface Props {
  soundCache: SoundCache
};
interface State {
  playing: boolean,
  appHeight: number
};

export default class MyApp extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = { playing: false, appHeight: 0 };
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
              setPlaying={(playing: boolean) => {
                this.setState({ playing: playing });
              }}
              updateAppWidth={() => {
                const windowHeight = Math.max(document.body.scrollHeight, window.outerHeight);
                const toSet = Math.max(windowHeight, this.state.appHeight);
                if (this.state.appHeight != toSet) {
                  this.setState({ appHeight: toSet });
                }
              }}
            >
            </DrumMachine>
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
    if (showing) {
      return (
        <div className="play-controller controller">
          {getPlayButton()}
          {getShowButton()}
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
