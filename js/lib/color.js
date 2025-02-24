/**
 * Elementにセットされている（表示されている）色を取得するライブラリ
 */

export class Color{

  // 対象要素の文字色の取得
  static get_text_color(elm, type){
    const rgb = window.getComputedStyle(elm).color;
    
    switch(type){
      case "hex":
        return this.rgb_to_hex(rgb)

      case "rgb":
      default:
        return rgb
    }
  }

  // 対象要素の背景色の取得
  static get_background_color(elm, type){
    const rgb = window.getComputedStyle(elm).backgroundColor;
    
    switch(type){
      case "hex":
        return this.rgb_to_hex(rgb)

      case "rgb":
      default:
        return rgb
    }
  }

  // ページ背景色の取得
  static get_page_color(elm, type){
    const rgb = window.getComputedStyle(elm).backgroundColor;
    
    switch(type){
      case "hex":
        return this.rgb_to_hex(rgb)

      case "rgb":
      default:
        return rgb
    }
  }

  static rgb_to_hex(rgb) {
    // RGB値を取得（例: "rgb(255, 0, 0)" → [255, 0, 0]）
    const match = rgb.match(/\d+/g);
    if (!match) return null; // 無効なRGB値の場合はnullを返す
  
    // それぞれの値を16進数に変換し、2桁にする
    return `#${match
      .map((x) => parseInt(x).toString(16).padStart(2, "0"))
      .join("")}`;
  }

  static hex_to_rgb(hex){
    // `#` を除去して6桁または3桁のHex値を取得
    hex = hex.replace(/^#/, "");

    // 3桁のHex（例: #f00 → #ff0000）を6桁に展開
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }

    // 16進数を10進数に変換
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  // html内のrgb(***,***,***)文字列をhex文字列に一括変換する。
  static html_rgb2hex(html){
    if(!html){return ""}
    const reg = new RegExp('rgb\(.+?\)','g')
    const arr = []
    let res = []
    while ((res = reg.exec(html)) !== null) {
      arr.push(res[1])
    }
    console.log(arr)
    // for(let rgb of arr){
    //   const hex = this.rgb_to_hex(rgb)
    //   html = html.split(rgb).join(hex)
    // }
    return html
  }
}