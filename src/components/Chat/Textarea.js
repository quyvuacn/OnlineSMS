import classNames from "classnames/bind"
import { useState } from "react"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)


function Textarea({placeholder = "", className , onChange ,rows , cols}) {

  const  onInput = (el) => {
    el.style.height = 0
    el.style.height = (el.scrollHeight) + "px";
  }
  return (  
    <textarea
      className={className}
      onInput={(ev)=>{
        const el = ev.target
        el.setAttribute("style", "height:" + (ev.target.scrollHeight) + "px;overflow-y:hidden;");
        el.addEventListener("input", ()=>{ onInput(el)}, false);
      }}
      rows = {rows}
      cols= {cols}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default Textarea;