import { Vector2 } from "three"
import { Component } from "../ecs/component"

export type KeyState = "up" | "down"

export class MouseState {
    position = new Vector2()
    delta = new Vector2()
    wheelDelta = new Vector2()

    state: KeyState = "down"

    constructor() {}

    updateFromEvent(e: MouseEvent, action: KeyState | null = null) {
        this.position.set(e.clientX, e.clientY)
        this.delta.set(e.movementX, e.movementY)

        if (action != null) {
            this.state = action
        } 
    }

    updateWheelFromEvent(e: WheelEvent) {
        this.wheelDelta.set(e.deltaX, e.deltaY)
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
        console.log("Refreshing");
        
        this.mouse.wheelDelta.set(0, 0)
    }

    wheel(e: WheelEvent) {
        console.log(e);
        
        this.mouse.updateWheelFromEvent(e)
    }

    keyDown(e: KeyboardEvent) {
        this.keys.set(e.key.toLowerCase(), 1.0)
    }

    keyUp(e: KeyboardEvent) {
        this.keys.set(e.key.toLowerCase(), 0.0)
    }

    mouseMove(event: MouseEvent) {
        this.mouse.updateFromEvent(event)
    }

    mouseDown(event: MouseEvent) {
        this.mouse.updateFromEvent(event, "down")
    }

    mouseUp(event: MouseEvent) {
        this.mouse.updateFromEvent(event, "up")
    }
}