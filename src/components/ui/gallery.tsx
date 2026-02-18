import { type Dispatch, type SetStateAction, useState } from "react";
import { Spinner } from "../Spinner";
import { Button } from "./button";

type GalleryImage = {
	src: string;
	alt: string;
};

const Gallery = ({
	images,
	setIndex,
}: {
	images: GalleryImage[];
	setIndex: Dispatch<SetStateAction<number>>;
}) => {
	const [loadedCount, setLoadedCount] = useState(0);

	const isAllLoaded = loadedCount === images.length;

	return (
		<section className="py-8">
			{!isAllLoaded ? <Spinner /> : null}
			<div
				className={`flex flex-wrap justify-center gap-6 ${isAllLoaded ? "opacity-100" : "opacity-0"}`}
			>
				{images.map((image, i) => (
					<Button
						key={image.alt}
						onClick={() => setIndex(i)}
						className="h-32 md:h-64 w-auto bg-transparent hover:bg-transparent"
					>
						<img
							key={image.alt}
							src={image.src}
							alt={image.alt}
							className="h-32 md:h-64 w-auto object-contain"
							onLoad={() => setLoadedCount((c) => c + 1)}
							onError={() => setLoadedCount((c) => c + 1)}
						/>
					</Button>
				))}
			</div>
		</section>
	);
};

export default Gallery;
