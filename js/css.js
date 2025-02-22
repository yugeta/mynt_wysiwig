import { Asset }   from "./asset.js"

export class Css{
  constructor(){
    if(this.is_css){return}
    this.create()
  }

  class_name = "mynt-wysiwig"

  get is_css(){
    return document.querySelector(`link.${this.class_name}`)
  }

  get dir(){

  }

  create(){
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = `${Asset.dir}/css/style.css`
    link.className = this.class_name
    document.querySelector("head").appendChild(link)
  }
}