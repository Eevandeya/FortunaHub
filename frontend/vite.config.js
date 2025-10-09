import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    server: { port: 5173, historyApiFallback: true },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components.common': path.resolve(
                __dirname,
                'src/components/common'
            ),
            '@components.features': path.resolve(
                __dirname,
                'src/components/features'
            ),
            '@context': path.resolve(__dirname, 'src/context'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),

            '@root': path.resolve(__dirname),
            '@root.api': path.resolve(__dirname, 'api'),
            '@root.consts': path.resolve(__dirname, 'consts'),
            '@root.utils': path.resolve(__dirname, 'utils'),
        },
    },
});
