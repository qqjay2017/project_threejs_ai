export const serverUrl = 'https://project-threejs-ai-84h9.onrender.com';

export const apiConfig = {
	development: {
		backendUrl: `${serverUrl}/api/v1/dalle`,
		// backendUrl: `http://localhost:8080/api/v1/dalle`,
	},
	production: {
		backendUrl: `${serverUrl}/api/v1/dalle`,
	},
};