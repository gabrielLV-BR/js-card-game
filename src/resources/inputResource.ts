import { Vector2 } from "three"
import { Component } from "../ecs/component"

export enum MouseButton {
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 4,
}

export class MouseState {
    position = new Vector2()
    buttonState = 0
    delta = new Vector2()
    wheelDelta = new Vector2()

    constructor() {}

    isButtonPressed(button: MouseButton) {
        return this.buttonState & button
    }

    updateFromEvent(e: MouseEvent) {
        this.position.set(e.clientX, e.clientY)
        this.delta.set(e.movementX, e.movementY)
        this.buttonState = e.buttons
    }

    updateWheelFromEvent(e: WheelEvent) {
        this.wheelDelta.set(e.deltaX, e.deltaY)
    }

    clearMovement() {
        this.delta.set(0, 0)
        this.wheelDelta.set(0, 0)
    }
}

export type InputSystemContructorType = {
    element: HTMLCanvasElement,
    [index: string]: any
}


export class InputResource extends Component {
    keys : Map<string, number> = new Map()
    mouse = new MouseState() 

    constructor() {
        super(InputResource.name)
    }
    
    refresh() {
        // called every end of update
        this.mouse.wheelDelta.set(0, 0)
    }

    wheel(e: WheelEvent) {
        this.mouse.updateWheelFromEvent(e)
    }

    keyDown(e: KeyboardEvent) {
        this.keys.set(e.key.toLowerCase(), 1.0)
    }

    keyUp(e: KeyboardEvent) {
        this.keys.set(e.key.toLowerCase(), 0.0)
    }

    mouseEvent(event: MouseEvent) {
        this.mouse.updateFromEvent(event)
    }
}