import { Object3D, Vector3 } from "three";
import { Component } from "../ecs/component";

export class SelectedComponent extends Component {

    offset = new Vector3()

    constructor(
        public readonly object: Object3D,
    ) {
        super(SelectedComponent.name)
    }
}