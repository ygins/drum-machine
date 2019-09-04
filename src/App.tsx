import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";
import { SoundCache } from "./sounds";

import "./App.scss";

interface Props {

};
interface State {

};
export default class App extends React.Component<Props, State>{
  render() {
    return (
      <div className="DrumMachineApp">
        <Themes.Context.Provider value={Themes.THEMES.DEFAULT}>
          <Grid>
            <DrumMachine
              soundCache={new SoundCache()}
              tracks={[
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" },
                { category: "drums", sound: "drum1" }
              ]}></DrumMachine>
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
