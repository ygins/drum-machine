import React from "react";
import "./style.scss";
import { Howl } from "howler";

interface Props {
  highlight: boolean,
  indexInMeasure: number,
  howlProvider: () => Howl
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
    if (this.props.highlight) {
      this.props.howlProvider().play();
    }
    return (
      <div className="track-light" style={{
        backgroundColor: this.props.highlight ? "red" : this.state.selected ? "white" : "transparent",
        gridColumnStart: this.props.indexInMeasure + 1,
        gridColumnEnd: this.props.indexInMeasure + 2
      }}
        onClick={() => this.setState({ selected: !this.state.selected })}>
      </div>
    )
  }

}

export default TrackLight;
