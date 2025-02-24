export class Asset{
  constructor(options){
    Asset.options = options || {}
  }
  static options = {}
  static current_iframe_select_start = null

  static get root(){
    return document.getElementById("mynt_wysiwig")
  }

  static get current_input_type(){
    const elm = Asset.root.querySelector(`.control [data-name="input_types"] [name="input_type"]:checked`)
    if(!elm){return}
    return elm.id.replace("input_", "")
  }

  static get current_input_elm(){
    switch(Asset.current_input_type){
      case "wysiwig":
        return Asset.iframe_root
      case "html":
        return Asset.textarea
    }
  }

  static get iframe_root(){
    // if(Asset.options.iframe_root){
    //   // console.log(Asset.iframe.contentDocument.body.innerHTML)
    //   return Asset.iframe.contentDocument.body.querySelector(Asset.options.iframe_root)
    // }
    // else{
    //   return Asset.iframe.contentDocument.body
    // }
    return Asset.iframe.contentDocument.body
  }

  static get current_input_value(){
    switch(Asset.current_input_type){
      case "wysiwig":
        return Asset.inner_iframe
      case "html":
        return Asset.inner_textarea
    }
  }

  static get iframe(){
    return Asset.root.querySelector("iframe")
  }

  static get textarea(){
    return Asset.root.querySelector("textarea")
  }

  static get dir(){
    return import.meta.url.split("/").slice(0,-2).join("/")
  }

  static get inner_iframe(){
    return Asset.iframe_root.innerHTML
  }

  static get inner_textarea(){
    return Asset.textarea.value
  }

  static get control_root(){
    return Asset.root.querySelector(`.control`)
  }
}