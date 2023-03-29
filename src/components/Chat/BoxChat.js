import { Textarea } from "@nextui-org/react";
import classNames from "classnames/bind"
import styles from "./chat.module.css"

import SendMessage from './SendMessage'
const cx = classNames.bind(styles)


function BoxChat() {
  return (
  <div className={cx("boxchat-wrap")}>
    <div className={cx("boxchat-header")}>
      <div className={cx("boxchat-logo")}>
        <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
      </div>
      <div className={cx("boxchat-title")}>
				<div>
				  <div className={cx("title")}>
  					<b>Quý Vũ</b>
  				</div>
          <span className={cx("subtitle")}>
            Truy cập 5 phút trước
          </span>
				</div>
			</div>
      
    </div>
    <div className={cx("boxchat-main")}>
      <div className={cx("boxchat-show-message")}>
            okokok
      </div>
      <div className={cx("boxchat-form")}>
        
        <div className={cx("boxchat-media")}>

        </div>
        <SendMessage/>
        
        </div>
      </div>
    </div>
  )
}

export default BoxChat;