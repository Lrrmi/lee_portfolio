import type { RefObject } from "react";
import furnitures from "../../images.json";
import { Furniture } from "./Furniture";

export const Furnitures = ({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLDivElement | null>;
}) => {
	const projects = furnitures.map(({ glb: [glb] }) => glb);

	return projects.map((project, index) => {
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
