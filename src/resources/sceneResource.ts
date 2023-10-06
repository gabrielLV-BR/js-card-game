import { Scene } from "three";
import { Component } from "../ecs/component";

export class SceneResource extends Component {

    public scene: Scene

    constructor(
        scene: Scene
    ) {
        super(SceneResource.name)
        this.scene = scene
    }
}