import { Asset }   from "./asset.js"
import { Storage } from "./storage.js"

export class Cache{
  constructor(){
    const data = new Storage().load()
    if(data && data["html"]){
    // && confirm("作業中のデータがあります。復元しますか？")){
      this.revival(data["html"])
    }
  }

  revival(html){
    Asset.textarea.value = html
    // Asset.iframe.contentDocument.body.innerHTML = html
    Asset.iframe_root.innerHTML = html
  }

  remove(){
    new Storage().remove("html")
  }
}