import { Apply }    from "../apply.js"

export class Keydown{
  constructor(event){
    switch(event.kayCode){
      // tab
      case 9:
        event.preventDefault()
        new Apply("tab")
        break

    }
  }

}