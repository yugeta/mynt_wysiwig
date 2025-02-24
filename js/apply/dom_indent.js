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
        // テキストノード（空白のみは無視）
        const text = child.textContent.trim()
        if (text) result += `${indentStr}${text}\n`
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // 開始タグの構築
        const tagName = child.tagName.toLowerCase()
        const attributes = Array.from(child.attributes)
          .map(attr => `${attr.name}="${attr.value}"`)
          .join(" ")

        const openTag = attributes ? `<${tagName} ${attributes}>` : `<${tagName}>`
        result += `${indentStr}${openTag}\n`

        // 子要素を再帰的に処理
        result += this.format(child, indent + 1)

        // 閉じタグ
        result += `${indentStr}</${tagName}>\n`
      }
    });

    return result
  }
}