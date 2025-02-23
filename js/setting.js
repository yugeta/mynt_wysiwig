import { Asset }   from "./asset.js"
import { Storage } from "./storage.js"

export class Setting{
  constructor(){
    const datas = Setting.load()
    if(!datas){return}
    for(const key in datas){
      switch(key){
        case "input_type":
          this.set_input_type(datas[key])
          break

      }
    }
  }


  set_input_type(type){
    const label = Asset.root.querySelector(`.control li[data-name="input_types"] .pulldown-list label[value="${type}"]`)
    if(!label){return}
    label.click()
  }

  static load(){
    return new Storage().load()
  }

  static save(data){
    new Storage().save(data)
  }
}