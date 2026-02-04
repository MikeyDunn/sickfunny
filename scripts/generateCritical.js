import { readFile, writeFile, readdir } from 'fs/promises'
import path from 'path'
import Critters from 'critters'

const BASE_DIR = '_site'

async function getHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return getHtmlFiles(fullPath)
      } else if (entry.name.endsWith('.html')) {
        return fullPath
      }
      return null
    })
  )
  return files.flat().filter(Boolean)
}

async function generateCriticalCSS() {
  const critters = new Critters({
    path: BASE_DIR,
    publicPath: '/',
    inlineThreshold: 0, // inline all critical CSS
    pruneSource: false, // keep original stylesheet link as fallback
    reduceInlineStyles: true,
    mergeStylesheets: true,
  })

  const htmlFiles = await getHtmlFiles(BASE_DIR)

  for (const file of htmlFiles) {
    console.log(`🧪 Processing ${file}...`)
    const html = await readFile(file, 'utf8')

    try {
      const inlinedHtml = await critters.process(html)
      await writeFile(file, inlinedHtml)
      console.log(`✅ Inlined critical CSS into ${file}`)
    } catch (err) {
      console.error(`❌ Failed on ${file}:`, err.message)
    }
  }
}

generateCriticalCSS()
