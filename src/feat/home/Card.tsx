import styles from "./Card.module.css"
import {FaRegBookmark} from "react-icons/fa";
import Toast from "../../components/Toast.tsx";
import React, {useState, useEffect} from "react";

type RecipeDetailType = {
	id: number,
	title: string,
	image_url: string
}

type CardProps = {
	recipeDetail: RecipeDetailType,
	onClick: () => void
}

function Card(props: CardProps) {
	const [toastText, setToastText] = useState<string|null>(null)

	const onBookmarkHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setToastText('Bookmarked!');
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setToastText(null);
		}, 3000);

		return () => clearTimeout(timer);
	}, [toastText]);

	return (
		<>
			<div className={styles.container} onClick={props.onClick}>
				<img src={props.recipeDetail.image_url} className={styles.thumbnail} />
				<div className={styles.title}>
					<div className={styles.text}>{limitStringWihtEllipsis(props.recipeDetail.title, 27)}</div>
					<div>
						<button className={styles.bookmark} onClick={onBookmarkHandler}><FaRegBookmark /></button>
					</div>
				</div>
			</div>
			<Toast text={toastText} />
		</>
	);
}

export default Card;

function limitStringWihtEllipsis(text: string|null, limit: number): string {
	let result = text !== null ? text : '';

	if (result.length > limit) {
		result = result.slice(0, limit) + '...';
	}

	return result;
}