import styles from "./Detail.module.css"
import {FaArrowLeft, FaRegBookmark, FaRegLightbulb} from "react-icons/fa";
import {FaShareNodes} from "react-icons/fa6";
import {useEffect, useState} from "react";
import Modal from "./Modal.tsx";
import Toast from "../../components/Toast.tsx";

type DetailPropsType = {
	onBack: () => void
}
function Detail(props: DetailPropsType) {
	const [isShowTips, setIsShowTips] = useState(false);
	const [toastText, setToastText] = useState<string|null>(null)

	const onToastHandler = (text: string) => {
		setToastText(text);
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setToastText(null);
		}, 3000);

		return () => clearTimeout(timer);
	}, [toastText]);

	const recipeDetail = {
			"id": 1,
			"title": "Spaghetti Bolognese",
			"short_description": "Classic Italian pasta dish with a rich meat sauce.",
			"ingredients": [
				"250g spaghetti",
				"400g ground beef",
				"1 onion, chopped",
				"2 cloves of garlic, minced",
				"400g canned diced tomatoes",
				"1 tablespoon tomato paste",
				"1 teaspoon dried oregano",
				"1 teaspoon dried basil",
				"Salt and pepper to taste",
				"Grated Parmesan cheese, for serving"
			],
			"instruction": [
				"Cook spaghetti according to package instructions.",
				"In a large skillet, brown the ground beef over medium heat. Add the onion and garlic, and cook until softened.",
				"Stir in the diced tomatoes, tomato paste, oregano, basil, salt, and pepper. Simmer for 15-20 minutes.",
				"Serve the sauce over cooked spaghetti and sprinkle with Parmesan cheese."
			],
			"image_url": "https://picsum.photos/seed/1/300/300"
		};

	return (
		<>
			<div className={styles.container}>
				<div className={styles['top-action-container']}>
					<div style={{flexGrow: 1}}><button className={styles['btn-action']} onClick={props.onBack}><FaArrowLeft /></button></div>
					<div><button className={styles['btn-action']} onClick={() => onToastHandler('Bookmarked!')}><FaRegBookmark /></button></div>
					<div><button className={styles['btn-action']} onClick={() => onToastHandler('Shared!')}><FaShareNodes /></button></div>
				</div>
				<img src={recipeDetail.image_url} className={styles.thumbnail} />
				<h1 className={styles.title}>{recipeDetail.title}</h1>
				<p className={styles.description}>{recipeDetail.short_description}</p>
				<hr className={styles['dashed-hr']} />
				<h2 style={{margin: 0}}>Ingredients</h2>
				<ul className={styles['list-container']}>
					{recipeDetail.ingredients.map((item, index) => <li key={index}>{item}</li>)}
				</ul>
				<hr className={styles['dashed-hr']} />
				<h2 style={{margin: 0}}>Instructions</h2>
				<ol className={styles['list-container']}>
					{recipeDetail.instruction.map((item, index) => <li key={index}>{item}</li>)}
				</ol>
			</div>
			<div className={styles['floating-action-container']}>
				<div className={styles['floating-action-content']}>
					<div style={{flexGrow: 1}}><button className={`${styles['btn-floating-action']} ${styles.main}`} onClick={() => onToastHandler('Lets Cook!')}>Lets Cook!</button></div>
					<div><button className={`${styles['btn-floating-action']} ${styles.tips}`} onClick={() => setIsShowTips(true)}><FaRegLightbulb /></button></div>
				</div>
			</div>
			<Modal isShow={isShowTips} onClose={() => setIsShowTips(false)} />
			<Toast text={toastText} />
		</>
	);
}

export default Detail;