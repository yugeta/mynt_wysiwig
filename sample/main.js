import { Construct }   from "../js/construct.js"
import { ImageUpload } from "./module/image_upload.js"

class Main{
  constructor(){
    new Construct({
      iframe_html  : "iframe_index.html",
      iframe_root  : "main",
      // image_upload :((e) => {new ImageUpload(e)}), // 画像アップロードした場合に処理をするcallback関数（type=fileのfilesデータが送られる）
      image_upload : ImageUpload, // 画像アップロードした場合に処理をするcallback関数（type=fileのfilesデータが送られる）
      image_dir    : null,
    })
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}