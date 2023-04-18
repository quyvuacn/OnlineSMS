import BaseInput from "./BaseInput"

function UserNameInput() {
	return (
		<BaseInput
			minLength={6}
			maxLength={20}
			name="Username"
			regex={/^[a-zA-Z0-9]+$/}
			allowSpaces={false}
			contentLeft={<i className="fa-solid fa-user"></i>}
			placeholder="Username"
			validate={validateUserName}
			value={userName}
		/>
	)
}

export default UserNameInput
