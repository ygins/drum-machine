import React from "react";
import "./style.scss";
import { Howl } from "howler";

interface Props {
  indexInMeasure: number,
  howlProvider: () => Howl,
  onNote: boolean
}

interface State {
  selected: boolean;
}
class TrackLight extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { selected: false };
  }
  render() {
    const shouldPlay=this.state.selected && this.props.onNote;
    if (shouldPlay) {
      this.props.howlProvider().play();
    }
    return (
      <div className="track-light" style={{
        backgroundColor: shouldPlay ? "red" : this.state.selected ? "white" : "transparent",
        gridColumnStart: this.props.indexInMeasure + 1,
        gridColumnEnd: this.props.indexInMeasure + 2
      }}
        onClick={() => this.setState({ selected: !this.state.selected })}>
      </div>
    )
  }

}

export default TrackLight;
