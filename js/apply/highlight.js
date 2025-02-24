import { Asset }     from "../asset.js"
import { Common }    from "./common.js"
import { InsertTag } from "./insert_tag.js"
import { EjectTag }  from "./eject_tag.js"

export class Highlight{
  constructor(options){
    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig(options.value)
        break

      case "html":
        this.textarea(options.value)
        break
    }
  }

  tag = "span"

  wysiwig(value){
    const attribute = `background-color:${value};`
    const target_tag = Common.get_iframe_select_start_tag(this.tag)

    if(target_tag){
      // タグ削除
      if(!value){
        new EjectTag(target_tag)
      }

      // 内容変更
      else{
        target_tag.style.setProperty("background-color" , value , "")
      }
    }

    // タグ追加（挿入）
    else if(value){
      new InsertTag({
        tag: this.tag,
        attribute: attribute,
      })
    }
  }

  textarea(value){
    const attribute = `background-color:${value};`
    new InsertTag({
      tag: this.tag,
      attribute: attribute,
    })
  }
}