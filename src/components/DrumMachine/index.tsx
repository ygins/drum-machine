import React from "react";
import Themes from "../../Theme";
import "./style.scss";
interface Props {

};

interface State {

};

export default class DrumMachine extends React.Component<Props, State>{
  static contextType=Themes.Context;
  constructor(props: Props) {
    super(props);
  }
  render(){
    const currentTheme=Themes.getTheme(this.context);
    return (
      <div id="frame" style={{backgroundColor: currentTheme.background}}>
        <p>hey!</p>
      </div>
    )
  }
}
