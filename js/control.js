import { Asset }   from "./asset.js"

export class Control{
  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load("control.html")
      this.view()
    })
  }
  
  html = []

  async load(filename){
    const xhr = new XMLHttpRequest()
    xhr.open('GET' , `${Asset.dir}/html/${filename}` , false)
    xhr.setRequestHeader("Content-Type", "text/html")
    xhr.onload = (e=>{
      this.html[filename] = e.target.response
    }).bind(this)
    xhr.send()
  }

  view(){
    Asset.root.insertAdjacentHTML("afterbegin", this.html["control.html"])
    this.finish()
  }

  finish(){
    this.resolve()
  }
}