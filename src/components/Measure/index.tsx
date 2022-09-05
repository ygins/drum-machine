import React from "react";
import "./style.scss";
import Themes from "../../Theme";
import TrackLight from "../TrackLight";
import {Howl} from 'howler';

interface Props {
  beats: boolean[],
  setBeats: (beats: boolean[]) => void,
  measureIndex: number,
  noteIndex: number,
  howlProvider: () => Howl
}


export default class Measure extends React.Component<Props>{
  static contextType = Themes.Context;

  private getTrackLights() {
    const trackLights = [];
    for (let i = 0; i < this.props.beats.length; i++) {
      trackLights.push((
        <TrackLight indexInMeasure={i} key={i} onNote={this.props.noteIndex === i}
          howlProvider={this.props.howlProvider} selected={this.props.beats[i]}
          setSelected={(selected: boolean) => {
            const newArr = this.props.beats.slice();
            newArr[i] = selected;
            this.props.setBeats(newArr)
          }}>
        </TrackLight>
      ))
    }
    return trackLights;
  }
  render() {
    return (
      <div className="measure" style={{
        gridColumnStart: this.props.measureIndex + 2,
        gridColumnEnd: this.props.measureIndex + 3,
        gridRowStart: 1,
        gridRowEnd: 2,
        gridTemplateColumns: `repeat(${this.props.beats.length}, auto)`,
        border: this.context.measureBorder
      }}>
        {this.getTrackLights()}
      </div>
    )
  }
}
