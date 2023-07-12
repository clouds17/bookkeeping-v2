/* eslint-disable */ 
const path = require('path')
module.exports = {
  lintOnSave: false,
  
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') 
    // icon存放路径
    config.module
      .rule('svg-sprite') // 添加规则
      .test(/\.svg$/) //使用条件：.svg结尾的文件
      .include.add(dir).end()   //只包含icons目录
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end() 
      //规定需要用svg-sprite-loader-mod这个loader，extract: false表明，不要生成其他的文件
      .use('svgo-loader').loader('svgo-loader') // 此优化器能够自动消除掉fill的内容
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
      //移除svg的fill属性
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)  //其他目录的.svg文件，不需要用到以上规则
  }
}
