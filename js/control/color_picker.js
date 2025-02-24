import { Common as ApplyCommon } from "../apply/common.js"
import { Color }                 from "../lib/color.js"
import { Apply }                 from "../apply.js"
import { Asset }                 from "../asset.js"

export class ColorPicker{
  constructor(event, mode){
    if(event.target.tagName.toLowerCase() !== "input"){return}
    const name = event.target.name
    switch(mode){
      case "change":
        this.change(event);break

      case "click":
        this.click(event);break
    }
  }

  get color(){
    const target_tag = ApplyCommon.get_iframe_select_start_tag()
    return target_tag ? Color.get_text_color(target_tag, "hex") : "#000"
  }

  change(e){
    const name  = e.target.name
    const value = e.target.value
    new Apply(name, value)
  }

  click(e){
    e.target.value = this.color
  }

}