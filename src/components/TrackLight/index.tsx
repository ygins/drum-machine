import React from "react";
import "./style.scss";

interface Props {
  indexInMeasure: number,
  howlProvider: () => Howl,
  onNote: boolean,
  selected: boolean,
  setSelected: (selected: boolean)=>void
}

const TrackLight: React.FC<Props> = (props:Props)=>{
    const shouldPlay=props.selected && props.onNote;
    if (shouldPlay) {
      props.howlProvider().play();
    }
    return (
      <div className="track-light" style={{
        backgroundColor: shouldPlay ? "red" : props.selected ? "white" : "transparent",
        gridColumnStart: props.indexInMeasure + 1,
        gridColumnEnd: props.indexInMeasure + 2
      }}
        onClick={() => props.setSelected(props.selected)}>
      </div>
    )
}

export default TrackLight;
