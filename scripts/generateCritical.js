import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { globby } from 'globby'
import { generate } from 'critical'

const BASE_DIR = '_site'

async function generateCriticalCSS() {
  const htmlFiles = await globby(`${BASE_DIR}/**/*.html`, {
    ignore: ['**/node_modules/**'],
  })

  for (const file of htmlFiles) {
    console.log(`🧪 Processing ${file}...`)
    const html = await readFile(file, 'utf8')

    try {
      const { html: inlinedHtml } = await generate({
        base: BASE_DIR,
        html,
        inline: true,
        width: 1300,
        height: 900,
      })

      await writeFile(file, inlinedHtml)
      console.log(`✅ Inlined critical CSS into ${file}`)
    } catch (err) {
      console.error(`❌ Failed on ${file}:`, err.message)
    }
  }
}

generateCriticalCSS()
