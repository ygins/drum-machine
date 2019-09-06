import React from "react";
import "./style.scss";

import TrackLight from "../TrackLight";

interface State {

}

interface Props {
  amtBeats: number,
  index: number,
  noteIndex: number
}


export default class Measure extends React.Component<Props, State>{

  constructor(props:Props){
    super(props);
  }

  private getTrackLights(){
    const trackLights=[];
    for(let i=0; i<this.props.amtBeats; i++){
      trackLights.push((
        <TrackLight indexInMeasure={i} highlight={this.props.noteIndex===i}>
        </TrackLight>
      ))
    }
    return trackLights;
  }
  render() {
    return (
      <div className="measure" style={{
        gridColumnStart: this.props.index+2,
        gridColumnEnd: this.props.index+3,
        gridRowStart:1,
        gridRowEnd: 2,
        gridTemplateColumns: this.props.amtBeats
      }}>
        {this.getTrackLights()}
      </div>
    )
  }
}
