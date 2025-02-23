import { Asset }    from "../asset.js"

export class EjectTag{
  constructor(target_tag){
    const parent = target_tag.parentNode
    while (target_tag.firstChild){
      parent.insertBefore(target_tag.firstChild, target_tag)
    }
    parent.removeChild(target_tag)

    // カーソル位置を復元
    const selection = Asset.iframe.contentWindow.getSelection()
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNodeContents(parent.firstChild)
    selection.addRange(range)
  }
}