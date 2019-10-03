import { Howl } from "howler";

type HowlProvider = () => Howl

export class SoundCache {
  private readonly allSounds: Map<string, string[]>;
  private readonly cache: Map<string, Map<string, Howl>> = new Map();

  constructor(sounds: Map<string, string[]>) {
    this.allSounds = sounds;
    sounds.forEach((value: string[], key: string)=>{
      this.cache.set(key, new Map());
    })
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
    const categoryArr = this.allSounds.get(category);
    if (!categoryArr) {
      return undefined;
    }
    if (categoryArr.indexOf(sound) === -1) {
      return undefined;
    }
    console.log(this.cache.get(category));
    console.log("------");
    let howlMap=new Map();
    const result=this.cache.get(category);
    if (result) {
      console.log("Yus");
      howlMap = result;
    }
    console.log(howlMap.get(sound))
    const howl = howlMap.get(sound) || await this.pull(category, sound);
    howlMap.set(sound, howl);
    console.log(`Set ${sound} to a howl`);
    console.log(this.cache);
    return () => howl;
  }

  public dump(sound: Sound) {
    console.log("Dumping!")
    const categoryMap = this.cache.get(sound.category);
    if (!categoryMap) {
      return;
    }
    categoryMap.delete(sound.sound);
  }

  public async getSound(sound: Sound): Promise<HowlProvider | undefined> {
    return await this.get(sound.category, sound.sound);
  }

  public getSoundsFromCategory(category: string) {
    return this.allSounds.get(category);
  }

  get categories() {
    return this.allSounds.keys();
  }

  get sounds() {
    return this.allSounds.values();
  }


}

export interface Sound {
  category: string,
  sound: string
}
