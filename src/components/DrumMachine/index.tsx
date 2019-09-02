import React from "react";
import Themes from "../../Theme";
import "./style.scss";
import Sounds from "../.././sounds/Sounds";
interface Props {

};

interface State {

};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
  }
  render() {
    const currentTheme = this.context
    return (
      <div id="frame" style={{
        backgroundColor: currentTheme.machine,
        border: currentTheme.border
      }}>
        <p>hey!</p>
      </div>
    )
  }
}
