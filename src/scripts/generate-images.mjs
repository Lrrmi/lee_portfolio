import fs from "node:fs";
import path from "node:path";

const imagesDir = path.resolve("src/assets/images");
const outputFile = path.resolve("src/images.json");
const ignoreFolders = ["potpourri"];

const readFolder = (folderPath) => {
	const result = {};

	const items = fs.readdirSync(folderPath, { withFileTypes: true });

	const metaFile = items.find(
		(item) => item.isFile() && item.name === "meta.json",
	);
	if (metaFile) {
		const metaPath = path.join(folderPath, "meta.json");
		result.meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
	} else {
		result.meta = {};
	}

	for (const item of items) {
		const itemPath = path.join(folderPath, item.name);

		if (item.isDirectory()) {
			if (ignoreFolders.includes(item.name)) continue;
			result[item.name] = readFolder(itemPath);
		} else if (item.isFile()) {
			if (item.name === "meta.json") continue;
			const ext = path.extname(item.name).toLowerCase().replace(".", "");
			if (!["png", "jpg", "jpeg", "webp", "svg"].includes(ext)) continue;

			if (!result[ext]) result[ext] = [];

			const relativePath = path
				.relative(imagesDir, itemPath)
				.replace(/\\/g, "/");
			result[ext].push(`/src/assets/images/${relativePath}`);
		}
	}

	return result;
};

const folders = fs
	.readdirSync(imagesDir, { withFileTypes: true })
	.filter((f) => f.isDirectory() && !ignoreFolders.includes(f.name))
	.sort((a, b) => {
		const numA = parseInt(a.name.match(/^\d+/)?.[0] ?? 0, 10);
		const numB = parseInt(b.name.match(/^\d+/)?.[0] ?? 0, 10);
		return numA - numB;
	});

const imagesArray = [];

for (const folder of folders) {
	const folderPath = path.join(imagesDir, folder.name);
	const folderData = readFolder(folderPath);

	const folderObj = { folder: folder.name, ...folderData };

	if (!ignoreFolders.includes(folder.name)) {
		imagesArray.push(folderObj);
	}
}

fs.writeFileSync(outputFile, JSON.stringify(imagesArray, null, 2));

console.log("images.json generated, ignoring folders:", ignoreFolders);
