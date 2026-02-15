import type { RefObject } from "react";
import furnitures from "../../images.json";
import { Furniture } from "./Furniture";
import { getRandomIntInclusive } from "./TestScene";

const RANDOMMIN = -50;
const RANDOMMAX = 50;

export const Furnitures = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLDivElement | null>;
}) => {
	const projects = furnitures.map(({ glb: [glb] }) => glb);

	return projects.map((project) => {
		return (
			<Furniture
				key={project}
				initialPosition={[getRandomIntInclusive(RANDOMMIN, RANDOMMAX), 250, 0]}
				canvasRef={canvasRef}
				glbPath={project}
			/>
		);
	});
};
