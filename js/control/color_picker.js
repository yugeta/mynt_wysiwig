import { Common as ApplyCommon } from "../apply/common.js"
import { Color }                 from "../lib/color.js"
import { Apply }                 from "../apply.js"

export class ColorPicker{
  constructor(event, mode){
    switch(mode){
      case "change":
        this.change(event);break

      case "click":
        this.click(event);break
    }
  }

  change(e){
    if(e.target.tagName.toLowerCase() !== "input"){return}
    const name  = e.target.name
    const value = e.target.value
    new Apply(name, value)
  }

  click(e){
    if(e.target.tagName.toLowerCase() !== "input"){return}
    const target_tag = ApplyCommon.get_iframe_select_start_tag()
    const color = target_tag ? Color.get_text_color(target_tag, "hex") : "#000"
    e.target.value = color
  }

}