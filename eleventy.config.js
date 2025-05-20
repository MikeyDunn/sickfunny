import { minify } from 'html-minifier'
import rssPlugin from '@11ty/eleventy-plugin-rss'
import eleventyImage from '@11ty/eleventy-img'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPassthroughCopy('img')
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' })
  eleventyConfig.addPassthroughCopy('src/favicon.png')

  eleventyConfig.addFilter('date', function (value, format = 'en-US') {
    return new Date(value).toLocaleDateString(format, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addNunjucksAsyncShortcode('image', async (src, alt) => {
    let metadata = await eleventyImage(src, {
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

    return eleventyImage.generateHTML(metadata, imageAttributes)
  })

  eleventyConfig.addCollection('post', function (collectionApi) {
    return collectionApi.getFilteredByGlob('./src/posts/**/*.md')
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      return minify(content, {
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
      includes: '_includes',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
  }
}
