import { Link } from "@tanstack/react-router";
import { MoveDown, MoveUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { projectRoute } from "@/router";

import projs from "../images.json";
import { Button } from "@/components/ui/button";

export const ProjectsPage = () => {
	const scrollAmount = 1500;

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
								proj.png.map((src) => (
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
			<Button
					className="hover:bg-transparent fixed bottom-11 right-12 -translate-x-1/2 bg-transparent p-3 hidden sm:block"
					onClick={() =>
						window.scrollBy({ top: -scrollAmount, behavior: "smooth" })
					}
				>
					<MoveUp className="!w-6 !h-6" />
				</Button>
				<Button
					className="hover:bg-transparent fixed bottom-4 right-12 -translate-x-1/2 bg-transparent p-3 hidden sm:block"
					onClick={() =>
						window.scrollBy({ top: scrollAmount, behavior: "smooth" })
					}
				>
					<MoveDown className="!w-6 !h-6" />
				</Button>
		</div>
	);
};
