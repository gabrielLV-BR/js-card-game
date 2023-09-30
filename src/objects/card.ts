import { Mesh, MeshBasicMaterial, BoxGeometry } from "three"
import { UserData } from "./userdata"

export class Card {
    static NAME = "CARD"

    mesh: Mesh

    constructor() {
        const geometry = new BoxGeometry(1, 0.2, 0.6)
        const material = new MeshBasicMaterial({ color: "white" })

        this.mesh = new Mesh(geometry, material)

        this.mesh.userData = {
            name: Card.NAME,
            object: this
        } as UserData
    }
}