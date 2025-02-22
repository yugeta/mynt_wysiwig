import { Asset }   from "./asset.js"
import { Iframe }  from "./iframe.js"
import { Control } from "./control.js"
import { Css }     from "./css.js"
import { Event }   from "./event.js"
import { Setting } from "./setting.js"
import { Cache }   from "./cache.js"

class Main{
  constructor(){
    if(!Asset.root){
      console.warn("Not Element. div#MYNT_wysiwig")
      return;
    }
    new Css()
    new Iframe()
    new Control().promise.then(()=>{
      new Setting()
    })
    new Event()
    new Cache()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}