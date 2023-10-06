import { BufferGeometry, Material, Mesh } from "three";
import { Component } from "../ecs/component";

export class MeshComponent extends Component {

    mesh: Mesh

    constructor(
        geometry: BufferGeometry,
        material: Material
    ) {
        super(MeshComponent.name)

        this.mesh = new Mesh(geometry, material)
    }
}