import { Asset }    from "../asset.js"
import { TextSync } from "../apply/text_sync.js"

export class ImgUpload{
  constructor(){
    this.remove_input_file()
    this.create_input_file()
    this.view_dialog()
  }

  input_file = null

  create_input_file(){
    const input = document.createElement("input")
    input.type = "file"
    input.hidden = true
    input.accept = "image/png, image/jpeg, image/gif, image/webp"
    input.onchange = this.file_upload.bind(this)
    document.body.appendChild(input)
    this.input_file = input
  }

  remove_input_file(){
    if(!this.input_file){return}
    this.input_file.parentNode.removeChild(this.input_file)
  }

  view_dialog(){
    if(!this.input_file){return}
    this.input_file.click()
  }

  file_upload(e){
    const files = e.target.files
    if(!files){return}

    if(Asset.options.image_upload){
      this.image_upload(files[0])
    }
    else{
      this.load(files[0])
    }
  }

  load(image_file){
    const reader = new FileReader()
    reader.onload = this.loaded.bind(this)
    reader.readAsDataURL(image_file)
  }

  loaded(e){
    const img = new Image()
    img.src = e.target.result
    const div = document.createElement("div")
    div.appendChild(img)
    const html = div.innerHTML

    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig(html)
        break

      case "html":
        this.textarea(html)
        break
    }
    this.viewed()
  }

  wysiwig(html){
    const selection = Asset.iframe.contentWindow.getSelection()
    if (selection.rangeCount === 0) {return}
    const range = selection.getRangeAt(0)
    const selectedContent = range.extractContents()
    const tempDiv = document.createElement("div")
    tempDiv.appendChild(selectedContent)
    const findText = tempDiv.innerHTML
    let selectedHTML = ""
    if(findText){
      selectedHTML = tempDiv.innerHTML.replace(findText, html)
    }
    else{
      selectedHTML = html
    }
    
    // 置換後のHTMLを挿入
    const newNode = document.createElement("div")
    newNode.innerHTML = selectedHTML
    const fragment = document.createDocumentFragment()
    while (newNode.firstChild) {
      fragment.appendChild(newNode.firstChild)
    }
    range.insertNode(fragment)
  }

  textarea(html){
    const elm = Asset.current_input_elm
    if(!elm){return}
    const value         = elm.value
    const start_pos     = elm.selectionStart
    const end_pos       = elm.selectionEnd
    const before_string = value.slice(0, start_pos)
    const after_string  = value.slice(end_pos, value.length)
    elm.value = before_string + html + after_string
  }

  viewed(){
    new TextSync()
    this.remove_input_file()
  }

  image_upload(data){
    if(!Asset.options.image_upload){return}
    const instance = new Asset.options.image_upload(data)
    // console.log(instance)
    if(instance && instance.promise){
      instance.promise.then(this.image_uploaded.bind(this))
    }
  }
  
  image_uploaded(options){
    const img = new Image()
    img.src = options.path
    const div = document.createElement("div")
    div.appendChild(img)
    const html = div.innerHTML

    switch(Asset.current_input_type){
      case "wysiwig":
        this.wysiwig(html)
        break

      case "html":
        this.textarea(html)
        break
    }
    this.viewed()
  }
}