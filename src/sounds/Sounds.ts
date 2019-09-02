const sounds = new Map<String, string[]>();
fetch("http://localhost:2323/paths").then(response => response.json()).then(response => {
  Object.keys(response).forEach(key => {
    response[key].forEach((sound: string) => {
      const arr = sounds.get(key) ? sounds.get(key) as string[] : [];
      arr.push(sound);
      sounds.set(key, arr);
    })
  });
}).catch(e => console.log(e));


export default {
  sounds: sounds,
  request: (category:string, sound:string)=>{
    return fetch(`http://localhost:2323/${category}/${sound}`);
  }
}
