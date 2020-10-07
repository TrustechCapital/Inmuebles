module.exports = {
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
        };
    },
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || ''
};
