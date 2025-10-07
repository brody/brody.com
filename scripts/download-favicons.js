import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create favicons directory if it doesn't exist
const faviconDir = path.join(__dirname, '../public/favicons')
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true })
}

// Function to download and save favicon
async function downloadFavicon(url, filename) {
  try {
    console.log(`Downloading favicon: ${url}`)
    const response = await fetch(url)

    if (!response.ok) {
      console.warn(`Failed to download ${url}: ${response.status}`)
      return null
    }

    const buffer = await response.arrayBuffer()
    const filePath = path.join(faviconDir, filename)

    fs.writeFileSync(filePath, Buffer.from(buffer))
    console.log(`✅ Saved: ${filename}`)
    return filename
  } catch (error) {
    console.warn(`Error downloading ${url}:`, error.message)
    return null
  }
}

// Function to get base URL and create filename
function getBaseUrl(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url.replace(/[^a-z0-9]/gi, '_')
  }
}

// Function to process favicon URL and download if needed
export async function processFavicon(faviconUrl, sourceUrl) {
  if (!faviconUrl) return null

  let fullFaviconUrl = faviconUrl

  // Handle relative URLs
  if (faviconUrl.startsWith('/')) {
    try {
      const baseUrl = new URL(sourceUrl)
      fullFaviconUrl = `${baseUrl.protocol}//${baseUrl.hostname}${faviconUrl}`
    } catch {
      return null
    }
  }

  // Generate filename based on URL
  const baseUrl = getBaseUrl(sourceUrl)
  const extension = faviconUrl.includes('.png')
    ? 'png'
    : faviconUrl.includes('.svg')
      ? 'svg'
      : 'ico'
  const filename = `${baseUrl}.${extension}`
  const filePath = path.join(faviconDir, filename)

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    return `/favicons/${filename}`
  }

  // Download and save favicon
  const savedFilename = await downloadFavicon(fullFaviconUrl, filename)
  return savedFilename ? `/favicons/${savedFilename}` : null
}

// Main function to process all bookmarks
export async function downloadAllFavicons() {
  const bookmarksDir = path.join(__dirname, '../src/content/bookmarks')
  const files = fs.readdirSync(bookmarksDir).filter((file) => file.endsWith('.md'))

  const faviconManifest = {}

  for (const file of files) {
    const content = fs.readFileSync(path.join(bookmarksDir, file), 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const faviconMatch = frontmatter.match(/faviconUrl:\s*(.+)/)
      const sourceMatch = frontmatter.match(/source:\s*(.+)/)

      if (faviconMatch && sourceMatch) {
        const faviconUrl = faviconMatch[1].replace(/['"]/g, '').trim()
        const sourceUrl = sourceMatch[1].replace(/['"]/g, '').trim()
        const baseUrl = getBaseUrl(sourceUrl)

        const localPath = await processFavicon(faviconUrl, sourceUrl)

        // Track successful downloads
        if (localPath) {
          faviconManifest[baseUrl] = {
            originalUrl: faviconUrl,
            localPath: localPath,
            sourceUrl: sourceUrl,
          }
        }
      }
    }
  }

  // Write manifest file
  const manifestPath = path.join(__dirname, '../public/favicons/manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(faviconManifest, null, 2))
  console.log(`📋 Created favicon manifest with ${Object.keys(faviconManifest).length} entries`)
}

// Run if called directly
if (process.argv[1] === __filename) {
  downloadAllFavicons()
}
