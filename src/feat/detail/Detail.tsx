import styles from "./Detail.module.css"
import {FaArrowLeft, FaRegBookmark, FaRegLightbulb} from "react-icons/fa";
import {FaShareNodes} from "react-icons/fa6";
import {useCallback, useEffect, useState} from "react";
import Modal from "./Modal.tsx";
import Toast from "../../components/Toast.tsx";
import useHttp from "../../use-http.ts";
import ApiError from "../../components/ApiError.tsx";
import {BACKEND_URL} from "../../util/registry.ts";

type DetailPropsType = {
	recipeId: number
	onBack: () => void
}

type RecipeDetailType = {
	id: number,
	title: string,
	short_description: string,
	ingredients: string[],
	instruction: string[],
	image_url: string
}

function Detail(props: DetailPropsType) {
	const [isShowTips, setIsShowTips] = useState(false);
	const [toastText, setToastText] = useState<string|null>(null);
	const {isLoading, error, sendRequest} = useHttp();
	const [recipeDetail, setRecipeDetail] = useState<RecipeDetailType|null>(null);

	const fetchRecipeDetail = useCallback(() => {
		void sendRequest(
			{
				url: `${BACKEND_URL}/recipes/${props.recipeId}`,
				method: 'GET'
			},
			(data) => {
				const result = data as RecipeDetailType;
				setRecipeDetail(result);
			}
		);
	}, [sendRequest, props.recipeId])

	useEffect(() => {
		fetchRecipeDetail()
	}, [fetchRecipeDetail]);

	const onToastHandler = (text: string) => {
		setToastText(text);
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setToastText(null);
		}, 3000);

		return () => clearTimeout(timer);
	}, [toastText]);

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}, []);

	return (
		<>
			<div className={styles.container}>
				<div className={styles['top-action-container']}>
					<div style={{flexGrow: 1}}><button className={styles['btn-action']} onClick={props.onBack}><FaArrowLeft /></button></div>
					{recipeDetail &&
						<>
                            <div><button className={styles['btn-action']} onClick={() => onToastHandler('Bookmarked!')}><FaRegBookmark /></button></div>
                            <div><button className={styles['btn-action']} onClick={() => onToastHandler('Shared!')}><FaShareNodes /></button></div>
						</>
					}
				</div>
				{recipeDetail &&
					<>
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
					</>
				}
			</div>
			{recipeDetail &&
				<>
                    <div className={styles['floating-action-container']}>
                        <div className={styles['floating-action-content']}>
                            <div style={{flexGrow: 1}}><button className={`${styles['btn-floating-action']} ${styles.main}`} onClick={() => onToastHandler('Lets Cook!')}>Lets Cook!</button></div>
                            <div><button className={`${styles['btn-floating-action']} ${styles.tips}`} onClick={() => setIsShowTips(true)}><FaRegLightbulb /></button></div>
                        </div>
                    </div>
				</>
			}
			<ApiError isLoading={isLoading} error={error} onRetry={fetchRecipeDetail} />
			<Modal isShow={isShowTips} onClose={() => setIsShowTips(false)} />
			<Toast text={toastText} />
		</>
	);
}

export default Detail;