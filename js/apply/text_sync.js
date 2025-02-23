/**
 * Textareaと、iframe(design-mode)のそれぞれの編集内容を相互にコピーする処理
 * 入力タイミングや、ツールバーの実行の後でclassをインスタンスnewすると同期される仕様。
 * 現在モード → もう一歩のモードへのコピー
 */

import { Asset }   from "../asset.js"
import { Storage } from "../storage.js"

export class TextSync{
  constructor(){
    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig()
        break

      case "html":
        this.textarea()
        break
    }
    this.save_storage()
  }

  wysiwig(){
    Asset.textarea.value = Asset.inner_iframe
  }

  textarea(){
    Asset.iframe_root.innerHTML = Asset.inner_textarea
  }

  save_storage(){
    const data = {html : Asset.textarea.value}
    new Storage().save(data)
  }
}