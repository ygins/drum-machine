import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache } from "./sounds";
import "./App.scss";

interface Props {
  soundCache: SoundCache
};
interface State {
};

export default class MyApp extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
  }

  private getSounds(){
    return [
      { category: "drums", sound: "drum1" },
      { category: "drums", sound: "drum1" },
      { category: "drums", sound: "drum1" },
      { category: "drums", sound: "drum1" },
      { category: "drums", sound: "drum1" },
        { category: "drums", sound: "drum1" },
          { category: "drums", sound: "drum1" },
            { category: "drums", sound: "drum1" }
    ]
  }

  render() {
    return (
      <div className="DrumMachineApp">
        <Themes.Context.Provider value={Themes.THEMES.DEFAULT}>
          <Grid>
            <DrumMachine
              soundCache={this.props.soundCache}
              tracks={this.getSounds()}>
            </DrumMachine>
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
