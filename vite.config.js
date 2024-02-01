// vite.config.js
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

const clientCommonConfig = {
    main: './ui/main.jsx',
    build: {
        outDir: 'client',
        target: 'modules',
        rollupOptions: {
            input: {
                main: './ui/main.jsx',
            },
            output: {
                entryFileNames: 'client.js',
            },
            external: [
                /^(meteor.*|react|react-dom)/,
            ],
            plugins: [copy({ targets: [{ src: './ui/main.html', dest: 'client' }] })],
        },
        minify: false,
    },
};

const serverCommonConfig = {
    main: './api/main.js',
    build: {
        outDir: 'server',
        target: 'modules',
        rollupOptions: {
            input: {
                main: './api/main.js',
            },
            output: {
                entryFileNames: 'server.js',
            },
            external: [
                /^meteor\/.*/,
            ],
        },
        polyfillDynamicImport: false,
        minify: false,
    },
};

const clientDevelopmentConfig = {
    ...clientCommonConfig,
};

const serverDevelopmentConfig = {
    ...serverCommonConfig,
};

const clientProductionConfig = {
    ...clientCommonConfig,
    build: {
        ...clientCommonConfig.build,
        minify: true,
    },
};

const serverProductionConfig = {
    ...serverCommonConfig,
    build: {
        ...serverCommonConfig.build,
        minify: true,
    },
};

const target = process.env.TARGET || 'client';

const isClient = target === 'client';
const isServer = target === 'server';

export default defineConfig(({ mode }) => {
    switch (mode) {
        case 'development':
            if (isClient) return clientDevelopmentConfig;
            if (isServer) return serverDevelopmentConfig;
            return clientDevelopmentConfig;
        case 'production':
            if (isClient) return clientProductionConfig;
            if (isServer) return serverProductionConfig;
            return clientProductionConfig;
        default:
            return clientProductionConfig;
    }
});
