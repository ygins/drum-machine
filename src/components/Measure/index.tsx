import React from "react";

interface State{

}

interface Props{
  amtBeats: number
}


export class Measure extends React.Component<Props, State>{
  constructor(props:Props){
    super(props);
  }
}
