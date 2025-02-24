import { Asset }     from "../asset.js"


export class PageColor{
  constructor(options){
    this.options = options || {}
    this.wysiwig()
    this.textarea()
    // switch(Asset.current_input_type){
    //   case "wysiwig":
    //     this.wysiwig()
    //     break

    //   case "html":
    //     this.textarea()
    //     break
    // }
  }

  tag = "span"

  get color(){
    return this.options.value || "#FFFFFF"
  }

  wysiwig(){
    Asset.iframe.style.setProperty("background-color", this.color, "")
  }

  textarea(){
    Asset.textarea.style.setProperty("--page-color", this.color, "")
  }
}