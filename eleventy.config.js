import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

import { minify } from 'html-minifier'
import rssPlugin from '@11ty/eleventy-plugin-rss'
import eleventyImage from '@11ty/eleventy-img'

export default function (eleventyConfig) {
  // Targets
  eleventyConfig.addWatchTarget('src/css/styles.css')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)

  // Passthrough
  eleventyConfig.addPassthroughCopy('img')
  eleventyConfig.addPassthroughCopy('src/favicon.png')
  eleventyConfig.addPassthroughCopy('src/public/**')

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('image', async (src, alt, options = {}) => {
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
      ...options,
    }

    return eleventyImage.generateHTML(metadata, imageAttributes)
  })

  // Collections
  eleventyConfig.addCollection('post', function (collectionApi) {
    return collectionApi.getFilteredByGlob('./src/posts/**/*.md')
  })

  // Minify HTML
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

  // Hash CSS files
  const isProduction = process.env.NODE_ENV === 'production'
  const outputMap = {}

  eleventyConfig.on('eleventy.before', () => {
    const inputPath = 'src/css/styles.css'
    const outputDir = '_site/css/'

    const css = fs.readFileSync(inputPath)
    let outputFilename

    if (isProduction) {
      const hash = crypto.createHash('md5').update(css).digest('hex').slice(0, 8)
      outputFilename = `styles.${hash}.css`
    } else {
      outputFilename = 'styles.css'
    }

    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, outputFilename), css)

    outputMap[inputPath] = `/css/${outputFilename}`
  })

  // Filters
  eleventyConfig.addFilter('date', function (value, format = 'en-US') {
    return new Date(value).toLocaleDateString(format, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  eleventyConfig.addFilter('hashedCss', function (filepath) {
    if (!outputMap[filepath]) {
      throw new Error(`hashedCss: ${filepath} not found`)
    }
    return outputMap[filepath]
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
