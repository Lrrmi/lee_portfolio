import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { projectRoute } from "@/router";
import projImages from "../images.json";

type Meta = {
	title: string;
	description: string;
}

type ImageMeta = {
	folder: string;
	meta: Meta;
	png?: string[];
	jpg?: string[];
};

export const ProjectsPage = () => {
	const modules = import.meta.glob<{ default: string }>(
		"/src/assets/images/**/*.{png,jpg,jpeg,webp,svg}",
		{ eager: true },
	);

	const projs = projImages.map((folder: ImageMeta) => {
		const allFiles: string[] = [];

		["png"].forEach((ext) => {
			const files = (folder as any)[ext];
			if (!files) return;

			files.forEach((file: string) => {
				const pathKey = `/src/assets/images/${folder.folder}/${file}`;

				const mod = (modules as Record<string, { default: string }>)[pathKey];
				if (mod) allFiles.push(mod.default);
			});
		});

		return {
			folder: folder.folder,
			meta: folder.meta,
			images: allFiles,
		};
	});

	return (
		<div className="flex">
			<div className="hidden md:flex md:flex-col w-1/8 gap-2 mt-20 text-[#dfdedf]">
				{projs.map((proj) => (
					<Link
						key={proj.meta.title}
						to={projectRoute.to}
						params={{ project: proj.meta.title }}
					>
						{proj.meta.title}
					</Link>
				))}
			</div>
			<div className="flex-1 flex justify-center">
				<div className="w-full max-w-6xl">
					<div className="mx-auto w-fit">
				<Separator className="mb-8" />
				<div className="grid grid-cols-2 gap-x-4 lg:gap-x-50 lg:gap-y-4 justify-items-center items-center">
					{projs.map((proj) =>
						proj.images.map((src) => (
							<div key={src} className="inline-block">
								<Link
									key={src}
									to={projectRoute.to}
									params={{ project: proj.meta.title }}
									className="inline-block"
								>
									<div className="md:w-70 aspect-[4/5] overflow-hidden">
									<img
										src={src}
										alt={proj.meta.title}
										className="w-full h-full object-contain"
									/>
									</div>
								</Link>
							</div>
						)),
					)}
				</div>
				</div>
				</div>
			</div>
		</div>
	);
};
