import { Mesh, MeshBasicMaterial, BoxGeometry } from "three"
import { RenderableObject } from "./object"

export class Card extends RenderableObject {
    static NAME = "CARD"

    constructor() {
        const geometry = new BoxGeometry(1, 0.2, 0.6)
        const material = new MeshBasicMaterial({ color: "white" })
        const mesh = new Mesh(geometry, material)

        super(mesh)
    }

    update(delta: number): void {
        
    }

    dispose(): void {
        
    }
}