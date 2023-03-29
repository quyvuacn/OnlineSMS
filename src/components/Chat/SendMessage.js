import classNames from "classnames/bind"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function SendMessage() {
  return (
    <div className={cx("send-message")}>
      <textarea
        className={cx("textarea")}
        placeholder="Max rows (10), Min rows (1), write something large.."
        minRows={1}
        maxRows={10}
        css={{ width : "calc( 100% - 40px )", height : 24}}
        animated={false}
      />
    <div className={cx("send-more")}>

    </div>
  </div>
)
}

export default SendMessage;