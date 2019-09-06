import React from "react";
import "./style.scss";

interface Props {
  highlight: boolean,
  indexInMeasure: number
}

const TrackLight: React.FC<Props> = (props: Props) => {
  return (
    <div className="track-light" style={{
      backgroundColor: props.highlight ? "white" : "black",
      gridColumnStart: props.indexInMeasure+1,
      gridColumnEnd: props.indexInMeasure+2
    }}>
    </div>
  )
}

export default TrackLight;
