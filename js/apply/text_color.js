import { Asset }     from "../asset.js"
import { Common }    from "./common.js"
import { InsertTag } from "./insert_tag.js"
import { EjectTag }  from "./eject_tag.js"
import { Color }     from "../lib/color.js"

export class TextColor{
  constructor(options){
    this.value = options ? options.value : ""
    this.color = this.convert_color()
    this.attribute = `color:${this.color};`

    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig()
        break

      case "html":
        this.textarea()
        break
    }
  }

  tag   = "span"
  value = null
  color = null
  attribute = null

  convert_color(){
    if(!this.value){
      return "#000000"
    }
    else if(this.value.match(/^rgb/)){
      return Color.rgb_to_hex(this.value)
    }
    else{
      return this.value
    }
  }

  wysiwig(){
    const target_tag = Common.get_iframe_select_start_tag(this.tag)

    // タグ削除
    if(!this.value){
      new EjectTag(target_tag)
    }

    // 内容変更
    else if(target_tag){
      target_tag.style.setProperty("color" , this.color , "")
    }

    // タグ追加（挿入）
    else if(this.color){
      new InsertTag({
        tag: this.tag,
        attribute: this.attribute,
      })
    }
  }

  textarea(){
    new InsertTag({
      tag: this.tag,
      attribute: this.attribute,
    })
  }
}