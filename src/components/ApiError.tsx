import styles from './ApiError.module.css';

type ApiErrorProps = {
	isLoading: boolean,
	error: unknown,
	onRetry: () => void
}
export default function ApiError(props: ApiErrorProps) {

	const Error = () => {
		return (
			<div style={{textAlign: 'center'}}>
				<div className={styles['text-description']}>Error</div>
				<button onClick={props.onRetry} className={styles['btn-retry']} style={{marginTop: '1rem'}}>Retry</button>
			</div>
		)
	}

	const Loading = () => {
		return (
			<div className={styles['text-description']}>
				Loading data....
			</div>
		)
	}

	if (props.isLoading) {
		return <Loading />
	} else if (props.error) {
		return <Error />
	} else {
		return null;
	}
}