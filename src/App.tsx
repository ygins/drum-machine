import React from 'react';
import Themes from "./Theme";
import DrumMachine from "./components/DrumMachine";

import "./App.scss";

interface Props {

};
interface State {

};
export default class App extends React.Component<Props, State>{
  render() {
    return (
      <div className="DrumMachineApp">
        <Grid>
          <Themes.Context.Provider value="default">
            <DrumMachine></DrumMachine>
          </Themes.Context.Provider>
        </Grid>
      </div>
    );
  }
}

const Grid: React.FC = (props: any) => {
  return (
    <div id="root-grid">
      {props.children}
    </div>
  )
}
