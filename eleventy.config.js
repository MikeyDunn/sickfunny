import { minify } from 'html-minifier-terser'
import Image, { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import rssPlugin from '@11ty/eleventy-plugin-rss'
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import mdiImageFigures from 'markdown-it-image-figures'

export default function (eleventyConfig) {
  // Watch CSS
  eleventyConfig.addWatchTarget('src/css/')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['avif', 'webp'],
    widths: [320, 640, 960, 1280, 1920],
    defaultAttributes: {
      loading: 'lazy',
      sizes: '(max-width: 640px) 100vw, 640px',
      decoding: 'async',
    },
  })

  // Markdown helpers
  const md = MarkdownIt({ html: true })
  md.use(markdownItAttrs)
  md.use(mdiImageFigures, { figcaption: true })
  eleventyConfig.setLibrary('md', md)

  // Passthrough
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' })

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
  eleventyConfig.addTransform('htmlmin', async function (content, outputPath) {
    if (outputPath?.endsWith('.html')) {
      return await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      })
    }
    return content
  })

  // Filters
  eleventyConfig.addFilter('date', function (value) {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  })

  eleventyConfig.addAsyncFilter('ogImage', async function (src) {
    const metadata = await Image('./src' + src, {
      widths: [1200],
      formats: ['jpeg'],
      outputDir: '_site/img/',
      urlPath: '/img/',
    })
    return metadata.jpeg[0].url
  })

  eleventyConfig.addFilter('isoDate', function (value) {
    return new Date(value).toISOString().split('T')[0]
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
