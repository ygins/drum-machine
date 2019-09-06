import React from "react";
import Themes from "../../Theme";
interface State {

}

interface Props {
  amtBeats: number,
  index: number
}


const Measure:React.FC<Props>=(props:Props)=>{
    return (
      <div className="measure" style={{
        gridColumnStart: props.index+2,
        gridColumnEnd: props.index+3,
        gridRowStart:1,
        gridRowEnd: 2,
        border: React.useContext(Themes.Context).measureBorder
      }}>
      </div>
    )
}

export default Measure;
