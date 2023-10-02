import { isUnionTypeNode } from "typescript";
import { HexNode } from "./HexNode";
import { NodeType, NodeDescription, isUnreachable} from "./template";

const neighborsMap: { [index: number]: number[] } = {
    0: [1,3,4],
    1: [0,2,4,5],
    2: [1,5,6],
    3: [0,4,7,8],
    4: [0,1,3,5,8,9],
    5: [1,2,4,6,9,10],
    6: [2,5,10,11],
    7: [3,8,12],
    8: [3,4,7,9,12,13],
    9: [4,5,8,10,13,14],
    10: [5,6,9,11,14,15],
    11: [6,10,15],
    12: [7,8,13,16],
    13: [8,9,12,14,16,17],
    14: [9,10,13,15,17,18],
    15: [10,11,14,18],
    16: [12,13,17],
    17: [13,14,16,18],
    18: [14,15,17]
};

const edgesMap: { [index: number]: number[] } = {
    0: [0, 1, 2],
    1: [2, 6, 11],
    2: [11, 15, 18],
    3: [18, 17, 16],
    4: [16, 12, 7],
    5: [7, 3, 0],
}

export const rotationLookup: { [index: number]: number[] } = {
    
    // Clockwise table
    0:[0, 2, 11, 18, 16, 7],
    1:[1, 6, 15, 17, 12, 3],
    2:[2, 11, 18, 16, 7, 0],
    3:[3, 1, 6, 15, 17, 12],
    4:[4, 5, 10, 14, 13, 8],
    5:[5, 10, 14, 13, 8, 4],
    6:[6, 15, 17, 12, 3, 1],
    7:[7, 0, 2, 11, 18, 16],
    8:[8, 4, 5, 10, 14, 13],
    9:[9, 9, 9, 9, 9, 9, 9],
    10:[10, 14, 13, 8, 4, 5],
    11:[11, 18, 16, 7, 0, 2],
    12:[12, 3, 1, 6, 15, 17],
    13:[13, 8, 4, 5, 10, 14],
    14:[14, 13, 8, 4, 5, 10],
    15:[15, 17, 12, 3, 1, 6],
    16:[16, 7, 0, 2, 11, 18],
    17:[17, 12, 3, 1, 6, 15],
    18:[18, 16, 7, 0, 2, 11]
    
    /*
    // Counter-clockwise table
    0:[7, 16, 18, 11, 2, 0],
    1:[3, 12, 17, 15, 6, 1],
    2:[0, 7, 16, 18, 11, 2],
    3:[12, 17, 15, 6, 1, 3],
    4:[8, 13, 14, 10, 5, 4],
    5:[4, 8, 13, 14, 10, 5],
    6:[1, 3, 12, 17, 15, 6],
    7:[16, 18, 11, 2, 0, 7],
    8:[13, 14, 10, 5, 4, 8],
    9:[9, 9, 9, 9, 9, 9, 9],
    10:[5,4,8,13,14,10],
    11:[2,0,7,16,18,11],
    12:[17,15,6,1,3,12],
    13:[14,10,5,4,8,13],
    14:[10,5,4,8,13,14],
    15:[6,1,3,12,17,15],
    16:[18,11,2,0,7,16],
    17:[15,6,1,3,12,17],
    18:[11,2,0,7,16,18]
    */
}

export class BoardPiece{
    private id: number;
    private nodes: HexNode [] = [];
    private _rotation: number;
    private templateIndex: number;

    constructor(id: number, templateIndex: number, nodes: NodeDescription[], rotation: number) {
        this.id = id;
        this._rotation = rotation;
        this.templateIndex = templateIndex;
        this.nodes = nodes.map((nodeDescription, index) => {
            return new HexNode(index, nodeDescription.type, nodeDescription.name);
        
        })
        this.setNeighbors();
    }
    
    public get rotation(): number {
        return this._rotation;
    }
    
    edgeAtIndex = (requestedEdgeIndex: number): HexNode[] => {
        const actualEdgeIndex = (requestedEdgeIndex + this._rotation) % 6;
        return edgesMap[actualEdgeIndex].map((index) => this.nodes[index]);
    }
    
    getId = () => { return this.id;}

    getNodes = () => { return this.nodes;}

    getRotation = () => { return this._rotation;}

    getTemplateIndex = () => { return this.templateIndex }
    
    rotate = (): void => {
        this._rotation = (this._rotation + 1) % 6;
    }

    private setNeighbors(){ 
        this.nodes.forEach((node, index) =>{
            const neighborIndicies = neighborsMap[index];
            const mappedIndicies = neighborIndicies.map((neighborIndex) => {
                return this.nodes[neighborIndex]
            });

            const reachableNeighbors = mappedIndicies.filter((hexNode) => {
                return !isUnreachable(hexNode.getNodeType());
            });

            node.setNeighbors(reachableNeighbors);
    })};

}
