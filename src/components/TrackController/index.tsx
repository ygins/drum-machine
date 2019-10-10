import React from "react";
import Themes from "../../Theme";
import { Sound, SoundCache } from "../../sounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faTrashAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

interface Props {
  sound: Sound,
  removeTrack: () => void,
  changeTrack: (track: Sound) => void,
  soundCache: SoundCache
}

interface ChangeBoxProps {
  soundCache: SoundCache,
  default: Sound,
  changeTrackTo: (sound: Sound) => void
  closeChangeBox: () => void
}

const ChangeBox: React.FC<ChangeBoxProps> = (props: ChangeBoxProps) => {
  const [sound, setSound] = React.useState<Sound>(props.default);
  const categoryOptions = [];
  const soundOptions = [];
  for (let str of props.soundCache.getSoundsFromCategory(sound.category) as string[]) {
    soundOptions.push(<option value={str} key={str}>{str}</option>)
  }
  const iter = props.soundCache.categories;
  let result = iter.next();
  while (!result.done) {
    let str = result.value;
    categoryOptions.push((<option value={str} key={str}>{str}</option>));
    result = iter.next();
  }
  return (
    <form className="change-form">
      <select name="category" value={sound.category} onChange={(e) => {
        const newCategory = e.target.value;
        if (newCategory !== sound.category) {
          const newSound = (props.soundCache.getSoundsFromCategory(newCategory) as string[])[0]
          setSound({ category: newCategory, sound: newSound })
        }
      }}>
        {categoryOptions}
      </select>
      <select name="sound" value={sound.sound} onChange={(e) => {
        setSound({ category: sound.category, sound: e.target.value })
      }}>
        {soundOptions}
      </select>
      <div className="check-container" onClick={() => {
        props.changeTrackTo(sound);
        props.closeChangeBox();
      }}>
        <FontAwesomeIcon className="check" icon={faCheckCircle} />
      </div>
    </form>
  )
}

const TrackController: React.FC<Props> = (props: Props) => {
  const [changing, setChanging] = React.useState(false);
  const theme = React.useContext(Themes.Context);
  if (!changing) {
    return (
      <div className="track-controller" style={{
        gridColumnStart: 1,
        gridColumnEnd: 2,
        gridRowStart: 0,
        gridRowEnd: 2,
        border: theme.measureBorder
      }}>
        <p className="track-name">{props.sound.sound}</p>
        <div
          className="remove-button button"
          onClick={() => props.removeTrack()}
          style={{backgroundColor: theme.button}}>
          <FontAwesomeIcon className="icon" icon={faTrashAlt} />
        </div>
        <div
          className="change-button button"
          onClick={() => setChanging(true)}
          style={{backgroundColor: theme.button}}>
          <FontAwesomeIcon className="icon" icon={faExchangeAlt} />
        </div>
      </div>
    )
  }
  else {
    return <ChangeBox soundCache={props.soundCache} default={props.sound} changeTrackTo={(sound: Sound) => {
      props.changeTrack(sound);
    }} closeChangeBox={() => setChanging(false)} />
  }

}

export default TrackController;
