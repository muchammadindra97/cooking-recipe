import styles from './Modal.module.css'
import {FaXmark} from "react-icons/fa6";
import {useEffect} from "react";
import {createPortal} from "react-dom";

const tipsList: string[] = [
	"Read the Entire Recipe.",
	"Make Notes While You Cook.",
	"Season and Taste-Test While Cooking.",
	"Substitute Items When Necessary.",
	"Pay Attention to Your Food's Consistency.",
	"Improvise While Cooking But Not Baking.",
	"Don't Be Afraid to Try New Things.",
	"Cook What You Know for Guests."
];

type ModalPropsType = {
	isShow: boolean,
	onClose: () => void
}

const modalDiv = document.getElementById('modal-container') as HTMLElement;

export default function Modal(props: ModalPropsType) {
	useEffect(() => {
		const bodyEl = document.querySelector('body');

		if (bodyEl && props.isShow) {
			bodyEl.style.overflow = 'hidden';
		} else if (bodyEl && !props.isShow) {
			bodyEl.style.overflow = 'auto';
		}
	}, [props.isShow]);

	if (props.isShow) {
		return createPortal(
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.card}>
						<div className={styles['card-head']}>
							<div className={styles.item} style={{flexGrow: 1}}><span className={styles.title}>Tips</span></div>
							<div className={styles.item}>
								<button className={styles['btn-close']} onClick={props.onClose}><FaXmark /></button>
							</div>
						</div>
						<div>
							<ol>
								{tipsList.map((tips, index) => <li key={index}>{tips}</li>)}
							</ol>
						</div>
					</div>
				</div>
			</div>,
			modalDiv
		)
	} else {
		return null;
	}
}