import { Asset }     from "../asset.js"
import { InsertTag } from "./insert_tag.js"
import { EjectTag }  from "./eject_tag.js"

export class FontSize{
  constructor(value){
    const tag       = "span"
    const attribute = `font-size:${value};`
    switch(Asset.current_input_type){
      case "wysiwig":
        const target_tag = Asset.get_iframe_select_start_tag(tag)

        if(target_tag){
          // タグ削除
          if(!value || target_tag.style.getPropertyValue("font-size") === value){
            new EjectTag(target_tag)
          }

          // 内容変更
          else{
            target_tag.style.setProperty("font-size" , value , "")
          }
        }

        // タグ追加（挿入）
        else if(value){
          new InsertTag({
            tag: tag,
            attribute: attribute,
          })
        }
        break

      case "html":
        new InsertTag({
          tag: tag,
          attribute: attribute,
        })
        break
    }
  }
}