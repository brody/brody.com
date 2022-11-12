const fs = require('fs');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const svgSprite = require('eleventy-plugin-svg-sprite');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  config.setBrowserSyncConfig({
    open: true,
    // reloadDelay: 5000,
    injectChanges: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/main.js');
  config.addPassthroughCopy('./src/fonts');

  config.addPlugin(syntaxHighlight);

  config.addPlugin(svgSprite, [
    {
      path: './src/images/icons', // relative path to SVG directory
      svgSpriteShortcode: 'svgspriteIcon',
      svgShortcode: 'icon',
    },
    {
      path: './src/images/svg', // relative path to SVG directory
      svgSpriteShortcode: 'svgspriteSvg',
      svgShortcode: 'svg',
    },
  ]);

  config.setLibrary('md', markdownLib);

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
