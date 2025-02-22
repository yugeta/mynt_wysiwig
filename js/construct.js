import { Asset }   from "./asset.js"
import { Iframe }  from "./iframe.js"
import { Control } from "./control.js"
import { Css }     from "./css.js"
import { Event }   from "./event.js"
import { Setting } from "./setting.js"
import { Cache }   from "./cache.js"

export class Construct{
  constructor(options){
    // Asset.options = options
    new Asset(options)

    if(!Asset.root){
      console.warn("Not Element. div#MYNT_wysiwig")
      return;
    }

    new Css()
    new Iframe().promise.then(()=>{
      new Event()
      new Cache()
    })
    new Control().promise.then(()=>{
      new Setting()
    })
  }
}
