const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  const Image = require('@11ty/eleventy-img')
  eleventyConfig.addNunjucksAsyncShortcode('image', async (src, alt) => {
    let metadata = await Image(src, {
      widths: [320, 640, 1024],
      formats: ['avif', 'webp', 'jpeg'],
      outputDir: './_site/img/',
      urlPath: '/img/',
    })

    let imageAttributes = {
      alt,
      loading: 'lazy',
      decoding: 'async',
    }

    return Image.generateHTML(metadata, imageAttributes)
  })

  eleventyConfig.addNunjucksAsyncShortcode('imagePath', async function (src, options = {}) {
    const widths = options.widths ?? [null]
    const format = options.format || 'webp'

    let metadata = await Image(src, {
      widths,
      formats: [format],
      outputDir: './_site/img/',
      urlPath: '/img/',
    })

    return metadata[format][0].url
  })

  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))

  eleventyConfig.addPassthroughCopy('img')

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
    }
    return content
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  }
}
