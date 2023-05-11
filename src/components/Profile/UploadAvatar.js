import classNames from "classnames/bind"
import styles from "./profile.module.css"
import Button from "@/customizeNextUI/nextui-org/Button"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import ModalCropImage from "./ModalCropImage"

const cx = classNames.bind(styles)

function UploadAvatar() {
	const user = useSelector((state) => state.user)
	const avatar = user.avatar ?? "/images/default-avatar.png"

	const router = useRouter()

	console.log(router)
	const isSelf =
		router.query?.userId == "self" ||
		router.query?.userId == "edit" ||
		router.pathname == "/profile"

	const [file, setFile] = useState()
	const [openModalCrop, setOpenmodalCrop] = useState(false)
	const ref = useRef()

	const handleFileUpload = (ev) => {
		const url = URL.createObjectURL(ev.target.files[0])
		setFile(url)
		setOpenmodalCrop(true)
	}
	const closeModalCrop = () => {
		console.log(file)
		setFile()
		ref.current.value = ""
		setOpenmodalCrop(false)
	}
	return (
		<div>
			<div
				className={cx("avatar")}
				style={{ "--user-avatar": `url(${avatar})` }}
			></div>
			{isSelf && (
				<Button
					as={"label"}
					auto
					className={cx("btn-update-avatar")}
					for="upload-avatar"
				>
					<i className="fa-solid fa-pen"></i>
				</Button>
			)}

			<input
				ref={ref}
				type="file"
				id="upload-avatar"
				accept="image/*"
				hidden
				onChange={handleFileUpload}
			/>
			<ModalCropImage
				file={file}
				openModalCrop={openModalCrop}
				closeModalCrop={closeModalCrop}
			/>
		</div>
	)
}

export default UploadAvatar
