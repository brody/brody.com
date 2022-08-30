const fs = require('fs');

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/main.js');
  config.addPassthroughCopy('./src/fonts');

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // htmlTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',
    // markdownTemplateEngine: 'njk',
  };
};
