import Detail from "./feat/detail/Detail.tsx";
import Home from "./feat/home/Home.tsx";
import styles from "./App.module.css";
import {useState} from "react";

function App() {
	const [detailId, setDetailId] = useState<number|null>(null);

	const onBackHandler = () => {
		setDetailId(null);
	}

	const onToDetailHandler = (recipeId: number) => {
		setDetailId(recipeId);
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{detailId
					? <Detail onBack={onBackHandler} />
					: <Home onToDetail={onToDetailHandler} />
				}
			</div>
		</div>
	);
}

export default App
