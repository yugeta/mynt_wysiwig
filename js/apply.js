import { Asset }     from "./asset.js"
import { Storage }   from "./storage.js"
import { TextSync }  from "./apply/text_sync.js"
import { InsertTag } from "./apply/insert_tag.js"
import { TextColor } from "./apply/text_color.js"
import { Paragraph } from "./apply/paragraph.js"
import { FontSize }  from "./apply/font_size.js"
import { DomIndent } from "./apply/dom_indent.js"
import { Tab }       from "./apply/tab.js"
import { Highlight } from "./apply/highlight.js"
import { PageColor } from "./apply/page_color.js"

export class Apply{
  constructor(name, value){
    if(!this.target_form){return}
    switch(name){
      case "bold":
        new InsertTag({tag: "b"});break
      case "italic":
        new InsertTag({tag: "i"});break
      case "underline":
        new InsertTag({tag: "u"});break
      case "tab":
        new Tab();break
      case "dom":
        new DomIndent();break
      case "font_size":
        new FontSize(value);break
      case "paragraph":
        new Paragraph(value);break
      case "text_color":
        new TextColor({
          value : value
        });break
      case "highlight":
        new Highlight({
          value : value
        });break
      case "page_color":
        new PageColor({
          value : value
        })
        new Storage().save({page_color: value})
        break
      default:
        console.log(name)
    }
    new TextSync()
  }

  get target_form(){
    switch(Asset.current_input_type){
      case "wysiwig":
        return Asset.iframe
      case "html":
        return Asset.textarea
    }
  }

  string_replace(str){
    // 文字書き換え
    try{
      document.execCommand("insertText", true, str)
    }
    catch(err){
      Asset.current_input_elm.setRangeText(str)
    }
  }
}