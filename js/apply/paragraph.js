import { Asset }    from "../asset.js"
import { EjectTag } from "./eject_tag.js"

export class Paragraph{
  constructor(value){
    if(Asset.current_input_type === "wysiwig"){
      if(value){
        this.insert_block_iframe(value)
      }
      else{
        const target_tag = Asset.get_iframe_select_start_tag()
        // this.eject_tag_iframe(target_tag)
        new EjectTag(target_tag)
      }
    }
  }

  // 選択範囲のブロックを、h1タグに変換
  insert_block_iframe(tag, attribute){
    const selection = Asset.iframe.contentWindow.getSelection()
    if (selection.rangeCount === 0) {return}
    const range = selection.getRangeAt(0)

    // 選択範囲の最初の親ブロック要素を取得
    let startBlock = range.startContainer
    while (startBlock && startBlock.nodeType !== Node.ELEMENT_NODE) {
      startBlock = startBlock.parentNode
    }

    // 既に <h1> なら何もしない
    if (startBlock && startBlock.tagName.toLowerCase === tag) {return}

    // <h*> を作成し、選択した要素を移動
    const elm = document.createElement(tag)
    if(!startBlock.nodeName.toLowerCase() === "body"){
      elm.innerHTML = startBlock.innerHTML
      startBlock.replaceWith(elm)
    }

    // block要素がない場合（1行目など）は、最初のブロック要素手前までを対象にする。
    else{
      startBlock = Asset.iframe_root.firstChild
      elm.innerHTML = startBlock.textContent.replace("\n","")
      startBlock.replaceWith(elm)
    }

    // カーソル位置を復元
    if(elm){
      const selection2 = Asset.iframe.contentWindow.getSelection()
      selection2.removeAllRanges()
      const range2 = document.createRange()
      range2.selectNodeContents(elm)
      selection2.addRange(range2)
      Asset.current_iframe_select_start = elm.firstChild
    }
  }
}