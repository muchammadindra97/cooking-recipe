import { useState, useCallback } from 'react';

type RequestConfigType = {
	url: string,
	method: 'GET' | 'POST' | 'DELETE',
	headers?: HeadersInit,
	body?: object
}

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown|null>(null);

	const sendRequest = useCallback(async (requestConfig: RequestConfigType, applyData: (data: unknown) => unknown) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data: unknown = await response.json();
			applyData(data);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message || 'Something went wrong!');
			}
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useHttp;