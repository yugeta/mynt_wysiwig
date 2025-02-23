import { Asset }     from "./asset.js"
import { TextSync }  from "./apply/text_sync.js"
import { InsertTag } from "./apply/insert_tag.js"
import { TextColor } from "./apply/text_color.js"
import { Paragraph } from "./apply/paragraph.js"
import { FontSize }  from "./apply/font_size.js"
import { DomIndent } from "./apply/dom_indent.js"

export class Apply{
  constructor(name, value){
    if(!this.target_form){return}
    switch(name){
      case "bold":
        // this.insert_tag("b");break
        new InsertTag({tag: "b"});break
      case "italic":
        // this.insert_tag("i");break
        new InsertTag({tag: "i"});break
      case "underline":
        // this.insert_tag("u");break
        new InsertTag({tag: "u"});break
      case "tab":
        this.tab();break
      case "dom":
        // this.dom();break
        new DomIndent();break
      case "font_size":
        // this.font_size(value);break
        new FontSize(value);break
      case "paragraph":
        // this.paragraph(value);break
        new Paragraph(value);break
      case "text_color":
        new TextColor({
          value : value
        });break
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

  // // 選択箇所のタグを除外
  // eject_tag_iframe(target_tag){
  //   const parent = target_tag.parentNode
  //   while (target_tag.firstChild){
  //     parent.insertBefore(target_tag.firstChild, target_tag)
  //   }
  //   parent.removeChild(target_tag)

  //   // カーソル位置を復元
  //   const selection = Asset.iframe.contentWindow.getSelection()
  //   selection.removeAllRanges()
  //   const range = document.createRange()
  //   range.selectNodeContents(parent.firstChild)
  //   selection.addRange(range)
  // }

  // // 選択箇所にタグを挿入
  // insert_tag_iframe(tag, attribute){
  //   const selection = Asset.iframe.contentWindow.getSelection()
  //   if (selection.rangeCount === 0) {return}
  //   const range = selection.getRangeAt(0)
  //   const selectedContent = range.extractContents()
  //   const tempDiv = document.createElement("div")
  //   tempDiv.appendChild(selectedContent)
  //   const findText = tempDiv.innerHTML
  //   if(!findText){return}

  //   const start_tag = attribute ? `<${tag} style="${attribute}">` : `<${tag}>`
  //   const end_tag   = `</${tag}>`
  //   const replaceText = `${start_tag}${findText}${end_tag}`
  //   const selectedHTML = tempDiv.innerHTML.replace(findText, replaceText)

  //   // 置換後のHTMLを挿入
  //   const newNode = document.createElement("div")
  //   newNode.innerHTML = selectedHTML
  //   const fragment = document.createDocumentFragment()
  //   while (newNode.firstChild) {
  //     fragment.appendChild(newNode.firstChild)
  //   }

  //   range.insertNode(fragment)

  //   // カーソル位置を復元
  //   const selection2 = Asset.iframe.contentWindow.getSelection()
  //   selection2.removeAllRanges()
  //   selection.addRange(range)
  // }

  // // 選択範囲のブロックを、h1タグに変換
  // insert_block_iframe(tag, attribute){
  //   const selection = Asset.iframe.contentWindow.getSelection()
  //   if (selection.rangeCount === 0) {return}
  //   const range = selection.getRangeAt(0)

  //   // 選択範囲の最初の親ブロック要素を取得
  //   let startBlock = range.startContainer
  //   while (startBlock && startBlock.nodeType !== Node.ELEMENT_NODE) {
  //     startBlock = startBlock.parentNode
  //   }

  //   // 既に <h1> なら何もしない
  //   if (startBlock && startBlock.tagName.toLowerCase === tag) {return}

  //   // <h*> を作成し、選択した要素を移動
  //   const elm = document.createElement(tag)
  //   if(!startBlock.nodeName.toLowerCase() === "body"){
  //     elm.innerHTML = startBlock.innerHTML
  //     startBlock.replaceWith(elm)
  //   }

  //   // block要素がない場合（1行目など）は、最初のブロック要素手前までを対象にする。
  //   else{
  //     startBlock = Asset.iframe_root.firstChild
  //     elm.innerHTML = startBlock.textContent.replace("\n","")
  //     startBlock.replaceWith(elm)
  //   }

  //   // カーソル位置を復元
  //   if(elm){
  //     const selection2 = Asset.iframe.contentWindow.getSelection()
  //     selection2.removeAllRanges()
  //     const range2 = document.createRange()
  //     range2.selectNodeContents(elm)
  //     selection2.addRange(range2)
  //     Asset.current_iframe_select_start = elm.firstChild
  //   }
  // }

  // insert_tag_textarea(tag, attribute){
  //   const elm = Asset.current_input_elm
  //   if(!elm){return}
  //   const value      = this.get_node_inner_text(elm)
  //   const start_pos  = elm.selectionStart
  //   const end_pos    = elm.selectionEnd
  //   const before_string = value.slice(0, start_pos)
  //   const start_tag = attribute ? `<${tag} style="${attribute}">` : `<${tag}>`
  //   const end_tag   = `</${tag}>`
  //   const select_string = `${start_tag}`+ value.slice(start_pos, end_pos) + end_tag
  //   const after_string  = value.slice(end_pos, value.length)
  //   elm.value = before_string + select_string + after_string
  //   // カーソル位置を復元
  //   elm.setSelectionRange(before_string.length , before_string.length + select_string.length)
  //   elm.focus()
  // }

  string_replace(str){
    // 文字書き換え
    try{
      document.execCommand("insertText", true, str)
    }
    catch(err){
      Asset.current_input_elm.setRangeText(str)
    }
  }

  // get_node_inner_text(elm){
  //   if(!elm){return}
  //   switch(elm.nodeName.toLowerCase()){
  //     case "textarea":
  //     case "input":
  //     case "select":
  //       return elm.value
  //     default:
  //       return elm.innerHTML
  //   }
  // }

  // insert_tag(tag, attribute){
  //   switch(Asset.current_input_type){
  //     case "wysiwig":
  //       // タグ削除
  //       const target_tag = Asset.get_iframe_select_start_tag(tag)
  //       if(target_tag){
  //         this.eject_tag_iframe(target_tag)
  //       }
  //       // タグ追加（挿入）
  //       else{
  //         this.insert_tag_iframe(tag, attribute)
  //       }
  //       break

  //     case "html":
  //       this.insert_tag_textarea(tag, attribute)
  //       break
  //   }
  // }


  // // HTMLの書式を設定（DOM階層に改行、インデントを挿入）
  // dom(){
  //   const html = Asset.textarea.value
  //   const parser = new DOMParser()
  //   const doc = parser.parseFromString(html, "text/html") // HTML をパース
  //   function format(node, indent = 0) {
  //     let result = ""
  //     const indentStr = "  ".repeat(indent) // インデント用スペース
  //     node.childNodes.forEach(child => {
  //       if (child.nodeType === Node.TEXT_NODE) {
  //         // テキストノードの処理（空白のみは無視）
  //         const text = child.textContent.trim()
  //         if (text) result += `${indentStr}${text}\n`
  //       } else if (child.nodeType === Node.ELEMENT_NODE) {
  //         // 開始タグ
  //         const tagName = child.tagName.toLowerCase()
  //         result += `${indentStr}<${tagName}>\n`
  //         // 子要素を再帰的に処理
  //         result += format(child, indent + 1)
  //         // 終了タグ
  //         result += `${indentStr}</${tagName}>\n`
  //       }
  //     })
  //     return result
  //   }
  //   Asset.textarea.value = format(doc.body).trim()
  // }

  // // 文字サイズの変更
  // font_size(value){
  //   const tag       = "span"
  //   const attribute = `font-size:${value};`
  //   switch(Asset.current_input_type){
  //     case "wysiwig":
  //       const target_tag = Asset.get_iframe_select_start_tag(tag)

  //       if(target_tag){
  //         // タグ削除
  //         if(!value || target_tag.style.getPropertyValue("font-size") === value){
  //           this.eject_tag_iframe(target_tag)
  //         }

  //         // 内容変更
  //         else{
  //           target_tag.style.setProperty("font-size" , value , "")
  //         }
  //       }

  //       // タグ追加（挿入）
  //       else if(value){
  //         this.insert_tag_iframe(tag, attribute)
  //       }
  //       break

  //     case "html":
  //       this.insert_tag_textarea(tag, attribute)
  //       break
  //   }
  // }

  // // 段落
  // paragraph(value){
  //   if(Asset.current_input_type === "wysiwig"){
  //     if(value){
  //       this.insert_block_iframe(value)
  //     }
  //     else{
  //       const target_tag = Asset.get_iframe_select_start_tag()
  //       this.eject_tag_iframe(target_tag)
  //     }
  //   }
  // }

}