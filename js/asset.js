

export class Asset{
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
        return Asset.iframe.contentDocument.body
      case "html":
        return Asset.textarea
    }
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
    return Asset.iframe.contentDocument.body.innerHTML
  }

  static get inner_textarea(){
    return Asset.textarea.value
  }

  static get control_root(){
    return Asset.root.querySelector(`.control`)
  }
}