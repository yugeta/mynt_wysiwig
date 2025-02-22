import { Apply }    from "./apply.js"
import { Asset }    from "./asset.js"
import { Setting } from "./setting.js"
import { TextSync } from "./text_sync.js"

export class Event{
  constructor(){
    this.set_event()
  }

  set_event(){
    window.addEventListener("click" , this.click_window.bind(this))
    if(Asset.iframe){
      Asset.iframe.contentDocument.body.addEventListener("input" , this.input.bind(this))
      Asset.iframe.contentDocument.body.addEventListener("selectstart" , this.iframe_select_start.bind(this))
    }
    if(Asset.textarea){
      Asset.textarea.addEventListener("keydown" , this.keydown.bind(this))
      Asset.textarea.addEventListener("input" , this.input.bind(this))
    }
  }

  click_window(e){
    // プルダウンメニュー
    if(e.target.closest(".pulldown-list label")){
      const pulldown_list = e.target.closest(".pulldown-list")
      const li = pulldown_list.closest("li")
      const checkbox = li.querySelector(`label.click-view-list input[type="checkbox"]`)
      checkbox.checked = false
      const name = e.target.closest("label").className
      Setting.save({input_type: name})
    }

    // ツールボタン
    else if(e.target.closest("ul.control > li:not(:has(.pulldown-list))")){
      const target = e.target.closest("ul.control > li")
      const name = target.getAttribute("data-name")
      new Apply(name)
    }


    // プルダウン（表示ボタン）以外をクリックしたら、プルダウン項目を削除する。
    if(!e.target.closest(".pulldown-list label") 
    && !e.target.closest(`input[type="checkbox"][name="list_view"]`)){
      const pulldowns = Asset.control_root.querySelectorAll(`input[type="checkbox"][name="list_view"]:checked`)
      const label = e.target.closest(`label.click-view-list`)
      // 該当リスト以外を閉じる
      if(label){
        const checkbox = label.querySelector(`input[type="checkbox"][name="list_view"]`)
        for(const pulldown of pulldowns){
          if(pulldown === checkbox){continue}
          pulldown.checked = false
        }
      }
      // 全てのリストを閉じる
      else{
        for(const pulldown of pulldowns){
          pulldown.checked = false
        }
      }
    }
  }

  keydown(e){
    switch(e.kayCode){
      // tab
      case 9:
        e.preventDefault()
        new Apply("tab")
        break

    }
  }

  input(){
    new TextSync()
  }

  iframe_select_start(e){
    Asset.current_iframe_select_start = e.target
    Asset.current_iframe_select_parent_tag = e.target.parentNode
  }
}