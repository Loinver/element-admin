const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: process.env.outputDir,
  publicPath: process.env.baseUrl,
  assetsDir: 'static',
  chainWebpack: (config) => {
    // :todo 有条件的话，可以抽离element-ui 等比较大的依赖到cdn上
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('utils', resolve('src/utils'))
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
    // 仅仅在uat 和生产环境生成文件大小日志
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('analyzer')
        .use(BundleAnalyzerPlugin)
        .end();
    }
    // 压缩图片
    config.module
        .rule("image-webpack-loader")
        .test(/\.(gif|png|jpe?g|svg)$/i)
        .use("file-loader")
        .loader("image-webpack-loader")
        .tap(() => ({
          disable: process.env.NODE_ENV !== "production"
        }))
        .end();
  },
  // 反向代理
  devServer: {
    port: 8010,
    hotOnly: true,
    host: '0.0.0.0',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com/mock/5c7794e135c5e14db980feed/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
