import { Vector2 } from "three"
import { System } from "../ecs/system"
import { World } from "../ecs/world"
import { InputResource } from "../resources/inputResource"

export type KeyState = "up" | "down"

export class MouseState {
    position = new Vector2()
    delta = new Vector2()
    state: KeyState = "down"

    constructor() {}

    updateFromEvent(e: MouseEvent, action: KeyState | null = null) {
        this.position.set(e.clientX, e.clientY)
        this.delta.set(e.movementX, e.movementY)

        if (action != null) {
            this.state = action
        } 
    }
}

export class InputSystem extends System {

    inputResource = this.getResource(InputResource)

    events = [
        { type: "mousedown", listener: (e: any) => this.mouseDown(e) },
        { type: "mouseup", listener: (e: any) => this.mouseUp(e) },
        { type: "mousemove", listener: (e: any) => this.mouseMove(e) },
        { type: "keydown", listener: (e: any) => this.keyDown(e) },
        { type: "keyup", listener: (e: any) => this.keyUp(e) },
    ]

    keys : Map<string, number> = new Map()

    mouse = new MouseState() 

    constructor(
        world: World,
        private element: HTMLCanvasElement
    ) {
        super(world)

        for(const { type, listener } of this.events) {
            this.element.addEventListener(type, listener)
        }
    }

    run(_delta: number): void {}

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

    dispose() {
        for(const { type, listener } of this.events) {
            this.element.removeEventListener(type, listener)
        }
    }
}