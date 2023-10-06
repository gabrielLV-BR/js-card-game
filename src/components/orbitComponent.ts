import { degToRad } from "three/src/math/MathUtils.js"
import { Component } from "../ecs/component"

export class OrbitComponent extends Component {
    yaw = 0
    pitch = 0
    maxPitchAngle = degToRad(85)

    mouseSensitivity = 0.1
    scrollSensitivity = 0.01
    
    distance = 0
    minimumDistance = 1.0
    maximumDistance = 100.0

    constructor() {
        super(OrbitComponent.name)
    }
}