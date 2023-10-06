import { Mesh, Vector3 } from "three";
import { Component } from "../ecs/component";

export class SelectedComponent extends Component {

    offset = new Vector3()

    constructor(
        public readonly mesh: Mesh,
    ) {
        super(SelectedComponent.name)
    }
}