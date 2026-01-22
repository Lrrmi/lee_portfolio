import fs from "node:fs"
import path from "node:path"

const imagesDir = path.resolve("src/assets/images")
const targetFolderName = "potpourri"
const outputFile = path.resolve("src/potpourri.json")

const targetFolderPath = path.join(imagesDir, targetFolderName)

if (!fs.existsSync(targetFolderPath)) {
  console.error(`Folder "${targetFolderName}" not found in ${imagesDir}`)
  process.exit(1)
}

const items = fs.readdirSync(targetFolderPath, { withFileTypes: true })

const files = items
  .filter(i => i.isFile())
  .map(i => i.name)

const jsonArray = files.map(fileName => ({ file: fileName }))

fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2))

console.log(`${files.length} files from "${targetFolderName}" written to ${outputFile}`)
