import { Asset }     from "./asset.js"
import { Storage }   from "./storage.js"
import { PageColor } from "./apply/page_color.js"

export class Cache{
  constructor(){
    const data = new Storage().load()
    console.log("storage", data)
    if(data && data["html"]){
      this.revival(data["html"])
      this.page_color(data["page_color"])
    }
  }

  revival(html){
    if(!html){return}
    Asset.textarea.value = html
    Asset.iframe_root.innerHTML = html
  }

  page_color(color){
    if(!color){return}
    new PageColor({
      value : color
    })
  }

  remove(){
    new Storage().remove("html")
  }
}