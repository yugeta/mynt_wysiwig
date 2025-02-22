import { Construct } from "../js/construct.js"

class Main{
  constructor(){
    new Construct({
      iframe_html : "iframe_index.html",
      iframe_root : "main",
    })
  }

  // get_dir(){
  //   return import.meta.url.split("/").slice(0,-1).join("/")
  // }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}