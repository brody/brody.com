import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const heroDir = path.join(__dirname, '../src/pages/about/_images')
const outFile = path.join(heroDir, 'placeholders.json')

const heroImages = ['hero1.png', 'hero2.png', 'hero3.png']

async function generatePlaceholder(filename) {
  const buffer = await sharp(path.join(heroDir, filename))
    .resize(24)
    .blur(8)
    .jpeg({ quality: 40 })
    .toBuffer()
  return `data:image/jpeg;base64,${buffer.toString('base64')}`
}

const placeholders = {}
for (const filename of heroImages) {
  placeholders[filename] = await generatePlaceholder(filename)
  console.log(`✅ Generated placeholder: ${filename}`)
}

fs.writeFileSync(outFile, JSON.stringify(placeholders, null, 2))
console.log(`📋 Wrote placeholders to ${path.relative(process.cwd(), outFile)}`)
