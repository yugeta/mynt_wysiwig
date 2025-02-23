import { Asset }     from "../asset.js"

export class DomIndent{
  constructor(){
    const html = Asset.textarea.value
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html") // HTML をパース
    Asset.textarea.value = this.format(doc.body).trim()
  }

  format(node, indent = 0){
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
        result += this.format(child, indent + 1)
        // 終了タグ
        result += `${indentStr}</${tagName}>\n`
      }
    })
    return result
  }
}