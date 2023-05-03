import { fill } from "@cloudinary/url-gen/actions/resize"
import { CloudinaryImage } from "@cloudinary/url-gen"

import classNames from "classnames/bind"
import styles from "./profile.module.css"
import Button from "@/customizeNextUI/nextui-org/Button"

import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import { axiosUploadFile } from "@/api/axiosConfig"
import { profileUser } from "@/api/profileApi"
import ModalCropImage from "./ModalCropImage"

const cx = classNames.bind(styles)

function UploadAvatar() {
	const user = useSelector((state) => state.user)
	const avatar = user.avatar ?? "/images/default-avatar.png"

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
			<Button
				as={"label"}
				auto
				className={cx("btn-update-avatar")}
				for="upload-avatar"
			>
				<i className="fa-solid fa-pen"></i>
			</Button>
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
