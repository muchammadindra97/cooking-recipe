import styles from './Toast.module.css';
import {createPortal} from "react-dom";

type ToastPropsType = {
	text: string|null
}

const toastDiv = document.getElementById('toast-container') as HTMLElement;

export default function Toast(props: ToastPropsType) {
	if (props.text) {
		return createPortal(
			<div className={styles.container}>
				<div className={styles.content}>{props.text}</div>
			</div>,
			toastDiv
		)
	} else {
		return null;
	}
}