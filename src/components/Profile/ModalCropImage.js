import { useState, useRef } from "react"
import { Modal, Button, Loading } from "@nextui-org/react"
import useDebounceEffect from "@/hooks/useDebounceEffect"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { canvasPreview } from "./canvasPreview"
import { profileUser } from "@/api/profileApi"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/reducers/userSlice"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"

export default function ModalCropImage({
	file,
	openModalCrop,
	closeModalCrop,
}) {
	const [crop, setCrop] = useState({
		unit: "px", // Can be 'px' or '%'
		width: 120,
		height: 120,
		minWidth: 120,
		minHeight: 120,
		locked: true,
		keepSelection: true,
	})
	const [completedCrop, setCompletedCrop] = useState({
		unit: "px", // Can be 'px' or '%'
		width: 120,
		height: 120,
		minWidth: 120,
		minHeight: 120,
		locked: true,
		keepSelection: true,
	})
	const previewCanvasRef = useRef(null)
	const imgRef = useRef(null)
	const [loading, setLoading] = useState(false)
	const blobUrlRef = useRef(null)
	const dispatch = useDispatch()

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)
			}
		},
		100,
		[completedCrop],
	)

	const onDownloadCropClick = () => {
		setLoading(true)
		if (!previewCanvasRef.current) {
			throw new Error("Crop canvas does not exist")
		}

		blobUrlRef.current = previewCanvasRef.current.toDataURL()

		profileUser
			.updateAvatar(blobUrlRef.current)
			.then((response) => {
				const { data } = response
				dispatch(
					notify({
						message: "Cập nhật thành công!",
						type: typeNotification.success,
					}),
				)

				dispatch(
					setUser({
						avatar: data,
					}),
				)

				closeModalCrop()
				setLoading(false)
			})
			.catch((error) => {
				dispatch(
					notify({
						message: "Cập nhật thất bại",
						type: typeNotification.error,
					}),
				)
				setLoading(false)
			})
	}

	return (
		<div>
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={openModalCrop}
				onClose={closeModalCrop}
			>
				<Modal.Body>
					<div
						style={{
							textAlign: "center",
						}}
					>
						<ReactCrop
							crop={crop}
							onChange={(c) => {
								setCrop(c)
							}}
							aspect={1}
							onComplete={(c) => {
								setCompletedCrop(c)
							}}
						>
							<img src={file} width={300} ref={imgRef} />
						</ReactCrop>
						{!!completedCrop && (
							<>
								<p
									style={{
										margin: "12px 0",
									}}
								>
									Review
								</p>
								<div>
									<canvas
										ref={previewCanvasRef}
										style={{
											// display: "none",
											border: "2px solid #00aeff	",
											objectFit: "contain",
											width: 160,
											height: 160,
											borderRadius: "50%",
										}}
									/>
								</div>
							</>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div style={{ display: "flex", margin: "0 auto", gap: 20 }}>
						<Button size="sm" flat color="error" onPress={closeModalCrop}>
							Cancel
						</Button>
						<Button size="sm" onClick={onDownloadCropClick}>
							{loading ? <Loading color="white" size="xs" /> : "Save"}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
