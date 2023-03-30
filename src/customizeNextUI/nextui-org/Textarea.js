import { useRef } from "react";

function Textarea() {
  const textarea = useRef()

  return (
  <textarea
    
    className={cx("textarea")}
    placeholder="Send message ..."
  />
)
}

export default Textarea;