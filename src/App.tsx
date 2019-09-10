import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache } from "./sounds";
import "./App.scss";

interface Props {
  soundCache: SoundCache
};
interface State {
  isCurrentlyPlaying: boolean;
  currentPlayingIndex: number;
};

export default class MyApp extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state={
      isCurrentlyPlaying: false,
      currentPlayingIndex: -1
    }
    window.addEventListener("keydown",(ev: KeyboardEvent)=>{
      if(ev.keyCode===80){
        const newState={...this.state};
        newState.isCurrentlyPlaying=true;
        this.setState(newState);
        const task=setInterval(()=>{
          this.setState({
            ...this.state,
            currentPlayingIndex: this.state.currentPlayingIndex+1
          })
        },500);
      }
    });
  }

  render() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    return (
      <div className="DrumMachineApp" style={{
        height: `${height}px`
      }}>
        <Themes.Context.Provider value={Themes.THEMES.DEFAULT}>
          <Grid>
            <DrumMachine
              soundCache={this.props.soundCache}
              currentPlayingIndex={this.state.currentPlayingIndex}
              tracks={[
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" }
              ]}></DrumMachine>
            <p style={{ gridArea: "header" }}>Hi!</p>
          </Grid>
        </Themes.Context.Provider>
      </div>
    );
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
