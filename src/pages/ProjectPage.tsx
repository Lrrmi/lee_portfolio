import { useParams } from "@tanstack/react-router";
import { ModelViewer } from "@/components/ModelViewer";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { projectRoute } from "@/router";
import images from "../images.json";

const createProject = () => ({
	folder: "",
	meta: {
		title: "",
		description: "",
	},
	jpg: [],
	glb: [],
	png: [],
});

export const ProjectPage = () => {
	const { project } = useParams({ from: projectRoute.id });

	const projectImages =
		images.find((image) => image.meta.title === project) || createProject();

	return (
		<Carousel
			opts={{ align: "center", watchDrag: false, loop: true }}
			className="w-full relative"
		>
			<CarouselContent className="gap-4">
				<CarouselItem className="basis-auto max-w-[90vw] sm:max-w-xs md:max-w-md">
					<div className="h-[70vh] flex justify-center px-4">
						<div className="max-w-sm space-y-1">
							<h2 className="text-[#dfdedf] md:text-left text-4xl">
								{projectImages.meta.title}
							</h2>
							<p className="text-[#dfdedf]">{projectImages.meta.description}</p>
						</div>
					</div>
				</CarouselItem>
				<CarouselItem className="basis-auto">
					<div className="h-[70vh] flex flex-col justify-between px-4 gap-4">
						{projectImages.png.map((src) => (
							<img
								key={src}
								src={src}
								alt={src}
								className="h-1/2 w-auto rounded-lg object-contain"
							/>
						))}
						{projectImages.glb.map((src) => (
							<ModelViewer
								key={src}
								url={src}
								className="h-1/2 w-auto rounded-lg object-contain "
							/>
						))}
					</div>
				</CarouselItem>
				{projectImages.jpg.map((src) => (
					<CarouselItem key={src} className="basis-auto">
						<div className="h-[70vh] flex items-center justify-center px-4">
							<img
								src={src}
								alt={src}
								className="w-screen sm:h-full sm:w-auto rounded-lg object-contain sm:object-cover"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2" />
			<CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2" />
			<Separator className="mt-8" />
		</Carousel>
	);
};
