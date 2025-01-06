const { DeepSeekAPI } = require('./deepseek');
const postcss = require('postcss');

class WebpackCSSAutopilot {
  constructor(options = {}) {
    this.options = {
      apiKey: options.apiKey || '',
      targetBrowsers: options.targetBrowsers || ['> 1%', 'last 2 versions'],
      // ...其他配置
    };
    this.deepseek = new DeepSeekAPI(this.options.apiKey);
  }

  async apply(compiler) {
    compiler.hooks.emit.tapAsync('WebpackCSSAutopilot', async (compilation, callback) => {
      // 处理CSS文件
      for (const [filename, source] of Object.entries(compilation.assets)) {
        if (filename.endsWith('.css')) {
          const optimizedCSS = await this.processCSS(source.source());
          compilation.assets[filename] = {
            source: () => optimizedCSS,
            size: () => optimizedCSS.length,
          };
        }
      }
      callback();
    });
  }

  async processCSS(cssContent) {
    try {
      // 使用DeepSeek API分析CSS
      const analysis = await this.deepseek.analyzeCSS(cssContent);

      // 使用PostCSS处理CSS
      const processed = await postcss([
        require('autoprefixer')({
          overrideBrowserslist: this.options.targetBrowsers,
        }),
        // 其他PostCSS插件
      ]).process(cssContent, {
        from: undefined,
      });

      return processed.css;
    } catch (error) {
      console.error('CSS processing error:', error);
      return cssContent; // 出错时返回原始CSS
    }
  }
}

module.exports = WebpackCSSAutopilot;
