import { Asset }    from "../asset.js"

export class IframeSelect{
  constructor(event){
    Asset.current_iframe_select_start = event.target
  }
}