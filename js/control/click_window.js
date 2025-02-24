import { Asset }    from "../asset.js"
import { Setting }  from "../setting.js"
import { Apply }    from "../apply.js"
import { Common as ApplyCommon } from "../apply/common.js"

export class ClickWindow{
  constructor(event){
    // プルダウンメニュー（リストをクリックした時の挙動）
    if(event.target.closest(".pulldown-list label")){
      this.pull_down_menu(event)
    }

    // ツールボタン
    else if(event.target.closest("ul.control > li:not(:has(.pulldown-list))")){
      this.tool_button(event)
    }

    // リスト表示ボタン
    if(event.target.closest(`.click-view-list`)
    && event.target.closest(`[name="list_view"]`)
    && event.target.closest(`[name="list_view"]`).checked === true){
      this.list_view_button(event)
    }

    // プルダウン（表示ボタン）以外をクリックしたら、プルダウン項目を削除する。
    if(!event.target.closest(".pulldown-list label") 
    && !event.target.closest(`input[type="checkbox"][name="list_view"]`)){
      this.hidden_pull_down(event)
    }
  }

  // プルダウンメニュー（リストをクリックした時の挙動）
  pull_down_menu(event){
    const pulldown_list = event.target.closest(".pulldown-list")
    const li = pulldown_list.closest("li")

    // リストを閉じる
    const checkbox = li.querySelector(`label.click-view-list input[type="checkbox"]`)
    checkbox.checked = false

    // 
    const name  = li.getAttribute("data-name")
    const value = event.target.closest("label").getAttribute("value")
    switch(name){
      case "input_types":
        Setting.save({input_type: value})
        break
      case "font_size":
      case "paragraph":
      case "align":
        new Apply(name, value)
        break
    }
  }

  // ツールボタン
  tool_button(event){
    const target = event.target.closest("ul.control > li")
    if(target.getAttribute("data-apply") === "no"){return}
    const name = target.getAttribute("data-name")
    new Apply(name)
  }

  // リスト表示ボタン
  list_view_button(event){
    const li = event.target.closest("li")
    const name = li.getAttribute("data-name")
    this.list_view_selected(li, name)
  }

  // プルダウン（表示ボタン）以外をクリックしたら、プルダウン項目を削除する。
  hidden_pull_down(event){
    const pulldowns = Asset.control_root.querySelectorAll(`input[type="checkbox"][name="list_view"]:checked`)
    const label = event.target.closest(`label.click-view-list`)
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

  // control-pulldownListの選択処理
  list_view_selected(li, name){
    if(Asset.current_input_type === "wysiwig"){
      switch(name){
        case "font_size":
          const target_tag = ApplyCommon.get_iframe_select_start_tag("span")
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
}