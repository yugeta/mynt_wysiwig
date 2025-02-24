import { Asset }     from "../asset.js"

export class DomIndent{
  constructor(){
    const html = Asset.textarea.value
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html") // HTML をパース

    this.voidElements = new Set([
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr"
    ])

    Asset.textarea.value = this.format(doc.body).trim()
  }

  voidElements = null

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

        // void 要素の場合、自己閉じタグとして処理
        if (this.voidElements.has(tagName)) {
          const selfClosingTag = attributes ? `<${tagName} ${attributes} />` : `<${tagName} />`;
          result += `${indentStr}${selfClosingTag}\n`
        } else {
          // 通常の要素 (開始タグ + 子要素 + 閉じタグ)
          const openTag = attributes ? `<${tagName} ${attributes}>` : `<${tagName}>`;
          result += `${indentStr}${openTag}\n`
          result += this.format(child, indent + 1)
          result += `${indentStr}</${tagName}>\n`
        }
      }
    });

    return result
  }
}