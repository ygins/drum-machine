import { Howl } from "howler";

type HowlProvider = () => Howl

export class SoundCache {
  private readonly sounds: Map<string, string[]>;
  private readonly cache: WeakMap<String, WeakMap<String, Howl>> = new Map();

  constructor(sounds: Map<string, string[]>) {
    this.sounds = sounds;
  }
  public static async create(): Promise<SoundCache> {
    const sounds = new Map<string, string[]>();
    const response = await fetch("http://localhost:2323/paths").then(response => response.json());
    Object.keys(response).forEach(key => {
      response[key].forEach((sound: string) => {
        const arr = sounds.get(key) ? sounds.get(key) as string[] : [];
        arr.push(sound);
        sounds.set(key, arr);
      })
    });
    return new SoundCache(sounds);
  }

  public pull(category: string, sound: string): Promise<Howl> {
    return new Promise<Howl>((resolve, reject) => {
      const howlObj = new Howl({
        src: [`http://localhost:2323/sound/${category}/${sound}.wav`]
      });
      howlObj.once("load", () => resolve(howlObj));
      howlObj.once("loaderror", (soundId: number, err: any) => reject("Error loading howl! " + err));
    });
  }
  public async get(category: string, sound: string): Promise<HowlProvider | undefined> {
    const categoryArr = this.sounds.get(category);
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
    return () => howl;
  }

  public async getSound(sound: Sound): Promise<HowlProvider | undefined> {
    return await this.get(sound.category, sound.sound);
  }
}

export interface Sound {
  category: string,
  sound: string
}
