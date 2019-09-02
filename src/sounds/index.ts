import { Howl } from "howler";

const sounds = new Map<string, string[]>();

fetch("http://localhost:2323/paths").then(response => response.json()).then(response => {
  Object.keys(response).forEach(key => {
    response[key].forEach((sound: string) => {
      const arr = sounds.get(key) ? sounds.get(key) as string[] : [];
      arr.push(sound);
      sounds.set(key, arr);
    })
  });
}).catch(e => console.log(e));

type HowlProvider=()=>Howl

export class SoundCache {
  private readonly cache: WeakMap<String, WeakMap<String, Howl>> = new Map();
  private readonly pull = (category: string, sound: string): Promise<Howl> => {
    return new Promise<Howl>((resolve, reject) => {
      const howlObj = new Howl({
        src: [`http://localhost:2323/sound/${category}/${sound}`]
      });
      howlObj.once("load", () => resolve(howlObj));
      howlObj.once("loaderror", () => reject("Error loading howl!"));
    });
  }
  public readonly get = async (category: string, sound: string): Promise<HowlProvider | undefined> => {
    const categoryArr = sounds.get(category);
    if (!categoryArr) {
      return undefined;
    }
    if (categoryArr.indexOf(sound) === -1) {
      return undefined;
    }
    const howlMap = this.cache.get(category) || new Map();
    const howl = howlMap.get(sound) || await this.pull(category, sound);
    howlMap.set(sound, howl);
    this.cache.set(category, howlMap);
    return ()=>JSON.parse(JSON.stringify(howl));
  }
}

export interface Sound{
  category: string,
  sound: string
}
