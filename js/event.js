import { Apply }    from "./apply.js"
import { Asset }    from "./asset.js"
import { Setting } from "./setting.js"
import { TextSync } from "./apply/text_sync.js"

export class Event{
  constructor(){
    this.set_event()
  }

  set_event(){
    window.addEventListener("click" , this.click_window.bind(this))

    if(Asset.iframe){
      Asset.iframe.contentWindow.addEventListener("click", this.click_window.bind(this))
      Asset.iframe_root.addEventListener("input" , this.input.bind(this))
      Asset.iframe_root.addEventListener("selectstart" , this.iframe_select_start.bind(this))
    }

    if(Asset.textarea){
      Asset.textarea.addEventListener("keydown" , this.keydown.bind(this))
      Asset.textarea.addEventListener("input" , this.input.bind(this))
    }

    const color_pickers = Asset.control_root.querySelectorAll(`input[type="color"]`)
    for(const color_picker of color_pickers){
      color_picker.addEventListener("input", this.change_color_picker.bind(this))
    }
  }

  click_window(e){
    // プルダウンメニュー（リストをクリックした時の挙動）
    if(e.target.closest(".pulldown-list label")){
      const pulldown_list = e.target.closest(".pulldown-list")
      const li = pulldown_list.closest("li")

      // リストを閉じる
      const checkbox = li.querySelector(`label.click-view-list input[type="checkbox"]`)
      checkbox.checked = false

      // 
      const name  = li.getAttribute("data-name")
      const value = e.target.closest("label").getAttribute("value")
      switch(name){
        case "input_types":
          Setting.save({input_type: value})
          break
        case "font_size":
        case "paragraph":
          new Apply(name, value)
          break
      }
      
    }

    // ツールボタン
    else if(e.target.closest("ul.control > li:not(:has(.pulldown-list))")){
      const target = e.target.closest("ul.control > li")
      if(target.getAttribute("data-apply") === "no"){return}
      const name = target.getAttribute("data-name")
      new Apply(name)
    }

    // リスト表示ボタン
    if(e.target.closest(`.click-view-list`)
    && e.target.closest(`[name="list_view"]`)
    && e.target.closest(`[name="list_view"]`).checked === true){
      const li = e.target.closest("li")
      const name = li.getAttribute("data-name")
      this.list_view_selected(li, name)
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
  }

  // control-pulldownListの選択処理
  list_view_selected(li, name){
    if(Asset.current_input_type === "wysiwig"){
      switch(name){
        case "font_size":
          const target_tag = Asset.get_iframe_select_start_tag("span")
          if(target_tag){
            const value = target_tag.style.getPropertyValue("font-size")
            this.select_list_item(li, value)
          }
          else{
            this.select_list_item(li, "")
          }
        break
      }
    }
  }

  select_list_item(li, value){
    const lists = li.querySelectorAll(`.pulldown-list > *`)
    if(!lists){return}
    for(const list of lists){
      if(list.getAttribute("value") === value){
        list.setAttribute("data-status" , "selected")
      }
      else if(list.hasAttribute("data-status")){
        list.removeAttribute("data-status")
      }
    }
  }

  change_color_picker(e){
    if(e.target.tagName.toLowerCase() !== "input"){return}
    const name  = e.target.name
    const value = e.target.value
    // console.log(name, value)
    new Apply(name, value)
  }
}