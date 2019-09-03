import React from "react";

interface State {

}

interface Props {
  amtBeats: number,
  index: number
}


export default class Measure extends React.Component<Props, State>{

  render() {
    return (
      <div className="measure" style={{
        gridColumnStart: this.props.index+1,
        gridColumnEnd: this.props.index+2,
        gridRowStart:1,
        gridRowEnd: 2
      }}>
      </div>
    )
  }
}
