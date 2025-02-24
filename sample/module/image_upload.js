export class ImageUpload{
  constructor(file){
    this.file = file || null
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.upload(file)
    })
  }

  get dir(){
    return import.meta.url.split("/").slice(0,-1).join("/")
  }

  upload(file){
    const form_data = new FormData();
    form_data.append("file", file);

    const xhr = new XMLHttpRequest()
    xhr.open('POST' , this.dir +"/image_upload.php" , true)
    xhr.onload = this.uploaded.bind(this)
    xhr.send(form_data)
  }

  uploaded(e){
    const res = JSON.parse(e.target.response)
    // console.log(res)
    const data = {
      status : res.status,
      path   : null,
    }
    if(res.status === "success"){
      data.path = this.dir +"/../../"+ res.path
    }
    this.finish(data)
  }


  finish(data){
    this.resolve(data)
  }
}