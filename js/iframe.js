import { Asset }   from "./asset.js"

export class Iframe{
  constructor(){
    if(!Asset.root){return}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.make_iframe()
      this.make_textarea()
      this.finish()
    })
    
  }

  make_iframe(){
    const iframe = document.createElement("iframe")
    Asset.root.appendChild(iframe)
    iframe.contentDocument.designMode = "on"
    // iframe.placeholder = "WYSIWIGでの登録ができます。"
    const link = document.createElement("link")
    link.rel = "stylesheet"
    const dir = import.meta.url.split("/").slice(0,-2).join("/")
    link.href = `${dir}/css/iframe_style.css`
    iframe.contentDocument.querySelector("head").appendChild(link)
  }
  make_textarea(){
    const textarea = document.createElement("textarea")
    Asset.root.appendChild(textarea)
    // textarea.placeholder = "HTMLタグで入力してください。"
  }

  finish(){
    this.resolve()
  }
}