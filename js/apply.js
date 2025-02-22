import { Asset }    from "./asset.js"
import { TextSync } from "./text_sync.js"

export class Apply{
  constructor(name){
    if(!this.target_form){return}
    switch(name){
      case "bold":
        this.insert_tag("b");break
      case "italic":
        this.insert_tag("i");break
      case "underline":
        this.insert_tag("u");break
      case "tab":
        this.tab();break
      case "dom":
        this.dom();break
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

  tab(){
    console.log("tab")
  }

  // 選択箇所のタグを除外
  eject_iframe(target_tag){
    const parent = target_tag.parentNode
    while (target_tag.firstChild){
      parent.insertBefore(target_tag.firstChild, target_tag)
    }
    parent.removeChild(target_tag)
  }

  // 選択箇所にタグを挿入
  insert_iframe(tag){
    const selection = Asset.iframe.contentWindow.getSelection()
    if (selection.rangeCount === 0) {return}
    const range = selection.getRangeAt(0)
    const selectedContent = range.extractContents()
    const tempDiv = document.createElement("div")
    tempDiv.appendChild(selectedContent)
    const findText = tempDiv.innerHTML
    const replaceText = `<${tag}>${findText}</${tag}>`
    const selectedHTML = tempDiv.innerHTML.replace(findText, replaceText);

    // 置換後のHTMLを挿入
    const newNode = document.createElement("div");
    newNode.innerHTML = selectedHTML;
    const fragment = document.createDocumentFragment();
    while (newNode.firstChild) {
      fragment.appendChild(newNode.firstChild);
    }

    range.insertNode(fragment);

    // カーソル位置を復元
    const selection2 = Asset.iframe.contentWindow.getSelection();
    selection2.removeAllRanges();
    selection.addRange(range);
  }

  insert_textarea(tag){
    const elm = Asset.current_input_elm
    if(!elm){return}
    const value      = this.get_node_inner_text(elm)
    const start_pos  = elm.selectionStart
    const end_pos    = elm.selectionEnd
    const before_string = value.slice(0, start_pos)
    const select_string = `<${tag}>`+ value.slice(start_pos, end_pos) +`</${tag}>`
    const after_string  = value.slice(end_pos, value.length)
    elm.value = before_string + select_string + after_string
    // カーソル位置を復元
    elm.setSelectionRange(before_string.length , before_string.length + select_string.length);
    elm.focus()
  }

  string_replace(str){
    // 文字書き換え
    try{
      document.execCommand("insertText", true, str);
    }
    catch(err){
      Asset.current_input_elm.setRangeText(str);
    }
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

  insert_tag(tag){
    switch(Asset.current_input_type){
      case "wysiwig":
        // タグ削除
        const target_tag = Asset.current_iframe_select_start.parentNode.closest(tag)
        if(target_tag){
          this.eject_iframe(target_tag)
        }
        // タグ追加（挿入）
        else{
          this.insert_iframe(tag)
        }
        break

      case "html":
        this.insert_textarea(tag)
        break
    }
  }


  // HTMLの書式を設定（DOM階層に改行、インデントを挿入）
  dom(){
    const html = Asset.textarea.value
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html") // HTML をパース
    function format(node, indent = 0) {
      let result = ""
      const indentStr = "  ".repeat(indent) // インデント用スペース
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          // テキストノードの処理（空白のみは無視）
          const text = child.textContent.trim()
          if (text) result += `${indentStr}${text}\n`
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          // 開始タグ
          const tagName = child.tagName.toLowerCase()
          result += `${indentStr}<${tagName}>\n`
          // 子要素を再帰的に処理
          result += format(child, indent + 1)
          // 終了タグ
          result += `${indentStr}</${tagName}>\n`
        }
      })
      return result
    }
    Asset.textarea.value = format(doc.body).trim()
  }
}