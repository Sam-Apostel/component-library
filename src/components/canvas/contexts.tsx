import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useState,
} from 'react';

export type Parameter = {
	id: string;
	name: string;
};

export type NodeDefinition = {
	id: string;
	name: string;
	parameters: Array<Parameter>;
	version: number;
};

export type Node = {
	id: string;
	definition: NodeDefinition;
	position: [number, number];
	parameters: Array<{ id: string; value: string }>;
};

export const zoomContext = createContext(100);
export const setZoomContext = createContext<Dispatch<SetStateAction<number>>>(
	// biome-ignore lint/suspicious/noEmptyBlockStatements: this noop as a default value
	() => {},
);
export const selectedNodeContext = createContext<string | null>(null);
export const setSelectedNodeContext = createContext<
	Dispatch<SetStateAction<string | null>>
	// biome-ignore lint/suspicious/noEmptyBlockStatements: this noop as a default value
>(() => {});

export const nodesContext = createContext<{
	nodes?: Array<Node>;
	setNodes?: Dispatch<SetStateAction<Array<Node>>>;
}>({});

export function CanvasProvider({ children }: PropsWithChildren) {
	const [zoom, setZoom] = useState(100);
	const [selectedNode, setSelectedNode] = useState<string | null>(null);
	const [nodes, setNodes] = useState<Array<Node>>([
		{
			id: '1',
			definition: {
				id: '1',
				name: 'Node 1',
				parameters: [
					{
						id: 'b',
						name: 'Parameter B',
					},
					{
						id: 'a',
						name: 'Prameter A',
					},
				],
				version: 1,
			},
			position: [100, 100],
			parameters: [
				{ id: 'b', value: 'value b' },
				{ id: 'a', value: 'value a' },
			],
		},
	]);
	return (
		<nodesContext.Provider value={{ nodes, setNodes }}>
			<zoomContext.Provider value={zoom}>
				<setZoomContext.Provider value={setZoom}>
					<selectedNodeContext.Provider value={selectedNode}>
						<setSelectedNodeContext.Provider
							value={setSelectedNode}
						>
							{children}
						</setSelectedNodeContext.Provider>
					</selectedNodeContext.Provider>
				</setZoomContext.Provider>
			</zoomContext.Provider>
		</nodesContext.Provider>
	);
}
