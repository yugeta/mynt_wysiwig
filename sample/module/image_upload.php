<?php

if(@$_FILES){
  $start_time = microtime(true);
  $res = new ImageUpload(@$_POST);
  // $path = realpath($res->path);
  $path = $res->path;
  $data = [
    "status"  => $path ? "success" : "error",
    "options" => $_POST,
    "path"    => $path,
    "time"    => microtime(true) - $start_time,
  ];
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
else{
  echo '{"status" : "error"}';
}

class ImageUpload{
  function __construct($options=[]){
    $this->ymd = date("Ymd");
    $this->create_dir();
    $this->upload_file();
    $this->path = $this->get_local_path();
  }

  var $path = "";
  var $ymd  = "";

  function get_dir($site_name=null){
    return __DIR__ ."/../../data/". $this->ymd;
  }

  function get_filename(){
    return hash("adler32", $_FILES["file"]["name"]);
  }

  function get_path(){
    return $this->get_dir(). "/". $this->get_filename() .".". $this->get_ext();
  }

  function get_type(){
    return $_FILES["file"]["type"];
  }

  function get_local_path(){
    return "data/". $this->ymd ."/". $this->get_filename() .".". $this->get_ext();
  }

  function get_ext(){
    switch($this->get_type()){
      case "image/jpeg":
      case "image/jpg":
        return "jpg";
      case "image/png":
        return "png";
      case "image/gif":
        return "gif";
      case "image/webp":
        return "webp";
    }
  }

  function create_dir(){
    $path = $this->get_dir();
    if(!is_dir($path)){
      mkdir($path, 0777, true);
    }
  }

  function upload_file(){
    $basefile   = $_FILES["file"]["tmp_name"];
    $uploadfile = $this->get_path();
    move_uploaded_file($basefile, $uploadfile);
  }
}