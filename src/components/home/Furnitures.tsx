import type { RefObject } from "react";
import furnitures from "../../images.json";
import { Furniture } from "./Furniture";
import { modelPaths } from "../../scripts/convertImages";

const MAXNUMPROJECTS = 8;
// Fisher-yates shuffle algo
function shuffle(arr: string[]) {
	const copy = [...arr];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
}

export const Furnitures = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLDivElement | null>;
}) => {
	const projects = furnitures.map(({ glb: [glb] }) => glb).concat(modelPaths);
	const randomProjects = shuffle(projects).slice(0, MAXNUMPROJECTS);

	return randomProjects.map((project, index) => {
		return (
			<Furniture
				key={project}
				index={index}
				canvasRef={canvasRef}
				glbPath={project}
			/>
		);
	});
};
