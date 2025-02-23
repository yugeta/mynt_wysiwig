import { Asset }     from "../asset.js"

export class Common{
  static get_iframe_select_start_tag(tag){
    if(!Asset.current_iframe_select_start){return}
    
    switch(Asset.current_iframe_select_start.nodeType){
      // tag
      case 1:
        if(tag){
          return Asset.current_iframe_select_start.querySelector(`:scope > ${tag}`)
        }
        else{
          return Asset.current_iframe_select_start.firstElementChild
        }

      // text
      case 3:
        if(tag){
          return Asset.current_iframe_select_start.parentNode.closest(tag)
        }
        else{
          return Asset.current_iframe_select_start.parentNode
        }
    }
  }
}