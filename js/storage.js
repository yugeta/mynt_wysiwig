import { Base64Hash } from "./lib/base64_hash.js"

export class Storage{
  constructor(key){
    this.key = key || Storage.name
    this.base64 = new Base64Hash()
  }

  static name = "mynt_wysiwig_setting"

  // 既存のデータにデータを加える
  arrange(data){
    const saved_data = this.load()
    return {...saved_data, ...data}
  }

  save(data){
    if(!this.key){return}
    const new_data = this.arrange(data)

    const encode_data = this.base64.encode(new_data)
    window.localStorage.setItem(this.key, encode_data)
    return encode_data
  }

  load(){
    if(!this.key){return}

    const decode_string = window.localStorage.getItem(this.key)
    return this.base64.decode(decode_string)
  }

  delete(){
    window.localStorage.removeItem(this.key)
  }

  remove(data_name){
    const current_data = this.load()
    if(!current_data || typeof current_data[data_name]){return}
    delete current_data[data_name]
    this.save(current_data)
  }
}