import { Asset }    from "../asset.js"
import { EjectTag } from "./eject_tag.js"

export class InsertTag{
  constructor(options){
    switch(Asset.current_input_type){
      case "wysiwig":
        // タグ削除
        const target_tag = Asset.get_iframe_select_start_tag(options.tag)
        if(target_tag){
          // this.eject_tag_iframe(target_tag)
          new EjectTag(target_tag)
        }
        // タグ追加（挿入）
        else{
          this.insert_tag_iframe(options.tag, options.attribute)
        }
        break

      case "html":
        this.insert_tag_textarea(options.tag, options.attribute)
        break
    }
  }

  // 選択箇所にタグを挿入
  insert_tag_iframe(tag, attribute){
    const selection = Asset.iframe.contentWindow.getSelection()
    if (selection.rangeCount === 0) {return}
    const range = selection.getRangeAt(0)
    const selectedContent = range.extractContents()
    const tempDiv = document.createElement("div")
    tempDiv.appendChild(selectedContent)
    const findText = tempDiv.innerHTML
    if(!findText){return}

    const start_tag = attribute ? `<${tag} style="${attribute}">` : `<${tag}>`
    const end_tag   = `</${tag}>`
    const replaceText = `${start_tag}${findText}${end_tag}`
    const selectedHTML = tempDiv.innerHTML.replace(findText, replaceText)

    // 置換後のHTMLを挿入
    const newNode = document.createElement("div")
    newNode.innerHTML = selectedHTML
    const fragment = document.createDocumentFragment()
    while (newNode.firstChild) {
      fragment.appendChild(newNode.firstChild)
    }

    range.insertNode(fragment)

    // カーソル位置を復元
    const selection2 = Asset.iframe.contentWindow.getSelection()
    selection2.removeAllRanges()
    selection.addRange(range)
  }

  insert_tag_textarea(tag, attribute){
    const elm = Asset.current_input_elm
    if(!elm){return}
    const value      = this.get_node_inner_text(elm)
    const start_pos  = elm.selectionStart
    const end_pos    = elm.selectionEnd
    const before_string = value.slice(0, start_pos)
    const start_tag = attribute ? `<${tag} style="${attribute}">` : `<${tag}>`
    const end_tag   = `</${tag}>`
    const select_string = `${start_tag}`+ value.slice(start_pos, end_pos) + end_tag
    const after_string  = value.slice(end_pos, value.length)
    elm.value = before_string + select_string + after_string
    // カーソル位置を復元
    elm.setSelectionRange(before_string.length , before_string.length + select_string.length)
    elm.focus()
  }

  get_node_inner_text(elm){
    if(!elm){return}
    switch(elm.nodeName.toLowerCase()){
      case "textarea":
      case "input":
      case "select":
        return elm.value
      default:
        return elm.innerHTML
    }
  }
}