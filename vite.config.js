import { defineConfig } from 'vite'
import { dependencies } from './package.json'
import { sentryVitePlugin } from '@sentry/vite-plugin'

import react from '@vitejs/plugin-react'

function renderChunks(deps) {
	let chunks = {}
	Object.keys(deps).forEach((key) => {
		if (['react', 'react-router-dom', 'react-dom'].includes(key)) return
		chunks[key] = [key]
	})
	return chunks
}

export default defineConfig(() => {
	return {
		build: {
			sourcemap: true,
			// rollupOptions: {
			// 	output: {
			// 		manualChunks: {
			// 			vendor: ['react', 'react-router-dom', 'react-dom'],
			// 			...renderChunks(dependencies),
			// 		},
			// 	},
			// },
			outDir: 'build',
		},
		plugins: [
			react(),
			sentryVitePlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: 'blake-morgan',
				project: 'javascript-react',
			}),
		],
	}
})
