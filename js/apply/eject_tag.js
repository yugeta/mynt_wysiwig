import { Asset }    from "../asset.js"

export class EjectTag{
  constructor(target_tag){
    if(!target_tag){return}
    const parent = target_tag.parentNode
    while (target_tag.firstChild){
      parent.insertBefore(target_tag.firstChild, target_tag)
    }
    parent.removeChild(target_tag)

    // カーソル位置を復元
    this.cursor_select(parent)
  }

  // カーソル位置を復元
  cursor_select(parent){
    const selection = Asset.iframe.contentWindow.getSelection()
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNodeContents(parent.firstChild)
    selection.addRange(range)
  }
}