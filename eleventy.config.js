import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

import { minify } from 'html-minifier'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import mdiImageFigures from 'markdown-it-image-figures'
import mdiBracketedSpans from 'markdown-it-bracketed-spans'

export default function (eleventyConfig) {
  // Targets
  eleventyConfig.addWatchTarget('src/css/styles.css')

  // Plugins
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['avif', 'webp', 'jpeg'],
    widths: [150, 300, 320, 640, 1024],
    defaultAttributes: {
      loading: 'lazy',
      sizes: '100vw',
      decoding: 'async',
    },
  })

  // Markdown helpers
  const md = MarkdownIt({ html: true })
  md.use(markdownItAttrs)
  md.use(mdiImageFigures, { figcaption: true })
  md.use(mdiBracketedSpans)
  eleventyConfig.setLibrary('md', md)

  // Passthrough
  eleventyConfig.addPassthroughCopy('img')
  eleventyConfig.addPassthroughCopy('src/favicon.png')
  eleventyConfig.addPassthroughCopy('src/public/**')

  // Collections
  eleventyConfig.addCollection('post', function (collectionApi) {
    return collectionApi.getFilteredByGlob('./src/posts/**/*.md')
  })
  eleventyConfig.addCollection('tagList', function (collectionApi) {
    let tagMap = new Map()
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        let tags = Array.isArray(item.data.tags) ? item.data.tags : [item.data.tags]
        tags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, 1)
          } else {
            tagMap.set(tag, tagMap.get(tag) + 1)
          }
        })
      }
    })
    return Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
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
    server: {
      host: '0.0.0.0',
    },
  }
}
