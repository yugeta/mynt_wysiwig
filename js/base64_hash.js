/**
 * Base64へのエンコード、デコード処理
 * 
 * [encode]
 * const base64_string = new Base64().encode(data)
 * 
 * [decode]
 * const data = new Base64().decode(base64_string)
 */

export class Base64Hash{
  encode(data){
    if(!data){return null}
    try{
      const json = JSON.stringify(data)
      const enc  = unescape(encodeURIComponent(json))
      return btoa(enc)
    }
    catch(err){
      console.warn(err)
      return null
    }
  }

  decode(string){
    if(!string){return null}
    try{
      const dec  = escape(atob(string))
      const json = decodeURIComponent(dec)
      return JSON.parse(json)
    }
    catch(err){
      console.warn(err)
      return null
    }
  }
}