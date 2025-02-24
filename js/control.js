import { Asset }        from "./asset.js"
import { TextSync }     from "./apply/text_sync.js"
import { ClickWindow }  from "./control/click_window.js"
import { Keydown }      from "./control/keydown.js"
import { ColorPicker }  from "./control/color_picker.js"
import { IframeSelect } from "./control/iframe_select.js"

export class Control{
  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }
  
  html = []

  async load(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET' , `${Asset.dir}/html/control.html` , false)
    xhr.setRequestHeader("Content-Type", "text/html")
    xhr.onload = this.view.bind(this)
    xhr.send()
  }

  view(e){
    const html = e.target.response
    Asset.root.insertAdjacentHTML("afterbegin", html)
    this.set_event()
    this.finish()
  }

  set_event(){
    window.addEventListener("click" , ((e) => new ClickWindow(e)))

    if(Asset.iframe){
      Asset.iframe.contentWindow.addEventListener("click", ((e) => new ClickWindow(e)))
      Asset.iframe_root.addEventListener("input"         , ((e) => new TextSync(e)))
      Asset.iframe_root.addEventListener("selectstart"   , ((e) => new IframeSelect(e)))
    }

    if(Asset.textarea){
      Asset.textarea.addEventListener("keydown" , ((e) => new Keydown(e)))
      Asset.textarea.addEventListener("input"   , ((e) => new TextSync(e)))
    }

    const color_pickers = Asset.control_root.querySelectorAll(`input[type="color"]`)
    for(const color_picker of color_pickers){
      color_picker.addEventListener("input", ((e) => new ColorPicker(e, "change")))
      color_picker.addEventListener("click", ((e) => new ColorPicker(e, "click")))
    }
  }

  finish(){
    this.resolve()
  }
}