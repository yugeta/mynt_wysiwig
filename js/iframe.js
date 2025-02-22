import { Asset }   from "./asset.js"

export class Iframe{
  constructor(){
    if(!Asset.root){return}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.make_textarea()
      this.make_iframe()
      // this.finish()
    })
    
  }

  make_iframe(){
    const iframe = document.createElement("iframe")
    
    iframe.onload = this.finish.bind(this)
    Asset.root.appendChild(iframe)
    iframe.contentDocument.designMode = "on"

    // iframe.placeholder = "WYSIWIGでの登録ができます。"
    const link = document.createElement("link")
    link.rel = "stylesheet"
    iframe.contentDocument.querySelector("head").appendChild(link)

    // // 指定htmlファイルがある場合
    // if(Asset.options.iframe_html){
    //   iframe.src = Asset.options.iframe_html
    // }

    // // フラット指定の場合は、ライブラリ用のcssを適用
    // else{
      const dir = import.meta.url.split("/").slice(0,-2).join("/")
      link.href = `${dir}/css/iframe_style.css`
    // }

    
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