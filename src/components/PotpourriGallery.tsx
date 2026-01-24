import Gallery from "@/components/ui/gallery";
import { galleryImages } from "@/scripts/convertImages";

export const PotpourriGallery = () => {
	return <Gallery images={galleryImages} />;
};
