import fs from "node:fs"
import path from "node:path"

const imagesDir = path.resolve("src/assets/images");
const outputFile = path.resolve("src/assets/images.ts");
const ignoreFolders = ["potpourri"];

function makeValidIdentifier(name) {
  let id = name.replace(/[^a-zA-Z0-9_]/g, "_");
  if (/^[0-9]/.test(id)) id = `f_${id}`;
  return id;
}

function readFolder(folderPath) {
  const result = {};
  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  const metaFile = items.find((i) => i.isFile() && i.name === "meta.json");
  result.meta = metaFile
    ? JSON.parse(fs.readFileSync(path.join(folderPath, "meta.json"), "utf-8"))
    : {};

  for (const item of items) {
    const itemPath = path.join(folderPath, item.name);

    if (item.isDirectory()) {
      if (ignoreFolders.includes(item.name)) continue;
      result[item.name] = readFolder(itemPath);
    } else if (item.isFile()) {
      if (item.name === "meta.json") continue;
      const ext = path.extname(item.name).toLowerCase().replace(".", "");
      if (!["png","jpg","jpeg","webp","svg","glb"].includes(ext)) continue;

      if (!result[ext]) result[ext] = [];
      const relativePath = "./" + path.relative(path.resolve("src/assets"), itemPath).replace(/\\/g, "/");
      result[ext].push(relativePath);
    }
  }

  return result;
}

function flattenAssets(folderName, folderData) {
  const imports = [];
  Object.entries(folderData).forEach(([key, value]) => {
    if (key === "meta") return;

    if (Array.isArray(value)) {
      value.forEach((filePath, idx) => {
        const importName = makeValidIdentifier(`${folderName}_${key}_${idx}`);
        imports.push({ importName, filePath, type: key });
      });
    } else if (typeof value === "object") {
      imports.push(...flattenAssets(`${folderName}_${key}`, value));
    }
  });
  return imports;
}

const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(f => f.isDirectory() && !ignoreFolders.includes(f.name))
  .sort((a, b) => {
    const numA = parseInt(a.name.match(/^\d+/)?.[0] ?? "0", 10);
    const numB = parseInt(b.name.match(/^\d+/)?.[0] ?? "0", 10);
    return numA - numB;
  });

let content = `// Auto-generated module of images and GLBs\n\n`;

const allImports = [];
const imagesArray = [];

folders.forEach((folder) => {
  const folderData = readFolder(path.join(imagesDir, folder.name));
  const imports = flattenAssets(folder.name, folderData);
  allImports.push(...imports);

  const modelObj = { name: folder.name, meta: folderData.meta };

  Object.entries(folderData).forEach(([key, value]) => {
    if (key === "meta") return;
    if (Array.isArray(value)) {
      modelObj[key] = value.map((_, idx) => makeValidIdentifier(`${folder.name}_${key}_${idx}`));
    } else if (typeof value === "object") {
      const nestedKeys = flattenAssets(`${folder.name}_${key}`, value);
      const nestedObj = {};
      nestedKeys.forEach(({ importName, type }) => {
        if (!nestedObj[type]) nestedObj[type] = [];
        nestedObj[type].push(importName);
      });
      modelObj[key] = nestedObj;
    }
  });

  imagesArray.push(modelObj);
});

allImports.forEach(({ importName, filePath }) => {
  content += `import ${importName} from "${filePath}";\n`;
});

content += `\nexport const projs = ${JSON.stringify(imagesArray, null, 2)};\n`;

allImports.forEach(({ importName }) => {
  const regex = new RegExp(`"${importName}"`, "g");
  content = content.replace(regex, importName);
});

fs.writeFileSync(outputFile, content);
console.log("images.ts array module generated successfully!");
