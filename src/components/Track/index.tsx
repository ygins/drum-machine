import React from "react";
import { SoundCache, Sound, TrackInfo } from "../../sounds";
import Measure from "../Measure";
import Themes from "../../Theme";
import TrackController from "../TrackController";
import {Howl} from "howler";
import "./style.scss"

interface Props {
  soundCache: SoundCache,
  isCurrentlyPlaying: boolean,
  trackInfo: TrackInfo,
  amtMeasures: number,
  beatsPerMeasure: number,
  trackIndex: number,
  removeTrack: () => void,
  changeTrack: (track: Sound) => void,
  setBeats: (beats: boolean[][]) => void,
  currentPlayingIndex: number
}

interface State {
  howl: () => Howl | null
}

export default class Track extends React.Component<Props, State>{
  static contextType = Themes.Context;
  constructor(props: Props) {
    super(props);
    this.state = { howl: () => null }
    this.updateSound();
  }

  private async howlFrom(sound: Sound) {
    const howl = await this.props.soundCache.getSound(sound);
    if (!howl) {
      throw new Error("Invalid sound!");
    }
    else {
      return howl;
    }
  }

  private updateSound() {
    this.howlFrom(this.props.trackInfo.sound).then(howl => this.setState({ howl: howl }));
  }

  componentDidMount() {
    this.updateSound();
  }

  componentDidUpdate(props: Props) {
    if (props.trackInfo.sound !== this.props.trackInfo.sound) {
      this.updateSound();
    }
  }

  private getMeasures() {
    const arr: JSX.Element[] = [];
    if (!this.state.howl()) {
      return arr;
    }
    const noteIndexFrom = (measureIndex: number) => {
      if (this.props.currentPlayingIndex === -1) {
        return -1;
      }
      const currentMeasure = Math.floor(this.props.currentPlayingIndex / this.props.beatsPerMeasure);
      return measureIndex === currentMeasure ? this.props.currentPlayingIndex % this.props.beatsPerMeasure : -1;
    }
    for (let i = 0; i < this.props.amtMeasures; i++) {
      arr.push((
        <Measure key={i} measureIndex={i}
          howlProvider={() => (this.state.howl() as Howl)}
          noteIndex={noteIndexFrom(i)} beats={this.props.trackInfo.selected[i]} setBeats={(beats: boolean[]) => {
            const newArr=this.props.trackInfo.selected.slice();
            newArr[i]=beats;
            this.props.setBeats(newArr);
          }} />
      ));
    }
    return arr;
  }
  render() {
    return (
      <div className="track" style={{
        gridRowStart: this.props.trackIndex,
        gridRowEnd: this.props.trackIndex + 1,
        gridColumnStart: 1,
        gridColumnEnd: this.props.amtMeasures,
        border: this.context.trackBorder
      }}>
        <TrackController
          soundCache={this.props.soundCache}
          sound={this.props.trackInfo.sound}
          changeTrack={this.props.changeTrack}
          removeTrack={this.props.removeTrack}
        />
        {this.state.howl() ? this.getMeasures() : <p>Loading...</p>}
      </div>
    )
  }
}
