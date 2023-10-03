import { Camera } from "three";
import { Component } from "../ecs/component";

export class CameraComponent extends Component {
    constructor(public camera: Camera) {
        super(CameraComponent.name)
    }
}