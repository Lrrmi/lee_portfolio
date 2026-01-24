type ImageModule = {
	default: string;
};

const images = import.meta.glob<ImageModule>(
	"/src/assets/images/potpourri/**/*.{png,jpg,jpeg,webp,svg}",
	{ eager: true },
);

export const galleryImages = Object.entries(images).map(([path, module]) => {
	const parts = path.split("/");
	const folder = parts[parts.length - 2];
	const filename = parts[parts.length - 1];

	return {
		folder,
		src: module.default,
		alt: filename,
	};
});
