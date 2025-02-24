import { Common as ApplyCommon } from "../apply/common.js"
import { Color }                 from "../lib/color.js"
import { Apply }                 from "../apply.js"
import { Asset }                 from "../asset.js"

export class ColorPicker{
  constructor(event, mode){
    if(event.target.tagName.toLowerCase() !== "input"){return}
    this.name = event.target.name
    switch(mode){
      case "change":
        this.change(event);break

      case "click":
        this.click(event);break
    }
  }

  get color(){
    const target_tag = ApplyCommon.get_iframe_select_start_tag()
    switch(this.name){
      case "text_color":
        return target_tag ? Color.get_text_color(target_tag, "hex") : "#000"
      case "highlight":
        return target_tag ? Color.get_background_color(target_tag, "hex") : "#000"
      case "page_color":
        return Color.get_page_color(Asset.iframe, "hex") || "#000"
    }
  }

  change(e){
    const value = e.target.value
    new Apply(this.name, value)
  }

  click(e){
    console.log(this.color)
    e.target.value = this.color
  }

}