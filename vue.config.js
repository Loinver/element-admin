const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: process.env.outputDir,
  publicPath: process.env.baseUrl,
  assetsDir: 'static',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 添加svg处理loader
    config.module
      .rule('svgSpriteLoader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end();
  },
  // 反向代理
  devServer: {
    port: 8010,
    proxy: {
      '/api': {
        target: '192.168.34.164:8010',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
