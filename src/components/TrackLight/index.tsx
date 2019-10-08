import React from "react";
import "./style.scss";
import { Howl } from "howler";

interface Props {
  indexInMeasure: number,
  howlProvider: () => Howl,
  onNote: boolean,
  selected: boolean,
  setSelected: (selected: boolean)=>void
}

interface State {

}

class TrackLight extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
  }
  render() {
    const shouldPlay=this.props.selected && this.props.onNote;
    if (shouldPlay) {
      this.props.howlProvider().play();
    }
    return (
      <div className="track-light" style={{
        backgroundColor: shouldPlay ? "red" : this.props.selected ? "white" : "transparent",
        gridColumnStart: this.props.indexInMeasure + 1,
        gridColumnEnd: this.props.indexInMeasure + 2
      }}
        onClick={() => this.props.setSelected(!this.props.selected)}>
      </div>
    )
  }

}

export default TrackLight;
