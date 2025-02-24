import { Asset }     from "../asset.js"
import { Common }    from "./common.js"
import { InsertTag } from "./insert_tag.js"

export class TextAlign{
  constructor(options){
    this.value = options ? options.value : ""
    this.attribute = `text-align:${this.colvalueor};`

    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig()
        break

      case "html":
        this.textarea()
        break
    }
  }

  tag   = "div"
  value = null
  attribute = null

  wysiwig(){
    const target_tag = Common.get_iframe_select_start_tag(this.tag)

    // タグ削除
    if(!this.value){
      new EjectTag(target_tag)
    }

    // 内容変更
    else if(target_tag){
      target_tag.style.setProperty("text-align" , this.value , "")
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