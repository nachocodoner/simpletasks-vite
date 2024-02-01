// vite.config.js
import { defineConfig } from 'vite';
import define from 'rollup-plugin-define';
import copy from 'rollup-plugin-copy';
import stripCode from 'rollup-plugin-strip-code';
import conditional from "rollup-plugin-conditional";

const isDevelopment = process.env.npm_lifecycle_script.includes('mode=development');
const isProduction = process.env.npm_lifecycle_script.includes('mode=production');

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
            plugins: [
                copy({ targets: [{ src: './ui/main.html', dest: 'client' }] }),
                define({
                    replacements: {
                        'Meteor.isClient': JSON.stringify(true),
                        'Meteor.isServer': JSON.stringify(false),
                        'Meteor.isTest': JSON.stringify(false),
                        ...(isDevelopment ? {
                            'Meteor.isDevelopment': JSON.stringify(true),
                            'Meteor.isProduction': JSON.stringify(false),
                        } : {
                            'Meteor.isDevelopment': JSON.stringify(false),
                            'Meteor.isProduction': JSON.stringify(true),
                        }),
                    },
                }),
                // stripCode({
                //     start_comment: 'server:start',
                //     end_comment: 'server:end',
                // }),
                // conditional(isProduction, [
                //     stripCode({
                //         start_comment: 'development:start',
                //         end_comment: 'development:end',
                //     }),
                // ]),
                // conditional(isDevelopment, [
                //     stripCode({
                //         start_comment: 'production:start',
                //         end_comment: 'production:end',
                //     }),
                // ]),
            ],
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
            plugins: [
                define({
                    replacements: {
                        'Meteor.isClient': JSON.stringify(false),
                        'Meteor.isServer': JSON.stringify(true),
                        'Meteor.isTest': JSON.stringify(false),
                        ...(isDevelopment ? {
                            'Meteor.isDevelopment': JSON.stringify(true),
                            'Meteor.isProduction': JSON.stringify(false),
                        } : {
                            'Meteor.isDevelopment': JSON.stringify(false),
                            'Meteor.isProduction': JSON.stringify(true),
                        }),
                    },
                }),
                // stripCode({
                //     start_comment: 'client:start',
                //     end_comment: 'client:end',
                // }),
                // conditional(isProduction, [
                //     stripCode({
                //         start_comment: 'development:start',
                //         end_comment: 'development:end',
                //     }),
                // ]),
                // conditional(isDevelopment, [
                //     stripCode({
                //         start_comment: 'production:start',
                //         end_comment: 'production:end',
                //     }),
                // ]),
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
