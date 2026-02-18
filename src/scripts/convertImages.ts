type Module = {
	default: string;
};

const potpourriFiles = import.meta.glob<Module>(
	"/src/assets/images/potpourri/**/*.{png,jpg,jpeg,webp,svg}",
	{ eager: true },
);

export const galleryImages = Object.entries(potpourriFiles).map(
	([path, module]) => {
		const parts = path.split("/");
		const folder = parts[parts.length - 2];
		const filename = parts[parts.length - 1];

		return {
			folder,
			src: module.default,
			alt: filename,
		};
	},
);

const modelsFiles = import.meta.glob<string>("/src/assets/models/**/*.glb", {
	eager: true,
	as: "url",
});

export const modelPaths = Object.values(modelsFiles);
