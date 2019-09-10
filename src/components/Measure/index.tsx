import React from "react";
import "./style.scss";

import Themes from "../../Theme";
import TrackLight from "../TrackLight";
import {Howl} from "howler";

interface State {

}

interface Props {
  amtBeats: number,
  measureIndex: number,
  noteIndex: number,
  howlProvider: ()=>Howl
}


export default class Measure extends React.Component<Props, State>{
  static contextType=Themes.Context;
  constructor(props:Props){
    super(props);
  }

  private getTrackLights(){
    const trackLights=[];
    for(let i=0; i<this.props.amtBeats; i++){
      trackLights.push((
        <TrackLight indexInMeasure={i} key={i} highlight={this.props.noteIndex===i}
        howlProvider={this.props.howlProvider} >
        </TrackLight>
      ))
    }
    return trackLights;
  }
  render() {
    return (
      <div className="measure" style={{
        gridColumnStart: this.props.measureIndex+2,
        gridColumnEnd: this.props.measureIndex+3,
        gridRowStart:1,
        gridRowEnd: 2,
        gridTemplateColumns: `repeat(${this.props.amtBeats}, auto)`,
        border: this.context.measureBorder
      }}>
        {this.getTrackLights()}
      </div>
    )
  }
}
