import { Vector2 } from "three"
import { Component } from "../ecs/component"

export enum MouseButton {
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 4,
}

export class MouseState {
    private _vecBuff = new Vector2()
    private _position = new Vector2()

    private _lastButtonState = 0
    buttonState = 0
    
    private _delta = new Vector2()
    private _wheelDelta = new Vector2()

    constructor() {}

    get position() {
        return this._vecBuff.set(this._position.x, this._position.y)
    }

    get delta() {
        return this._vecBuff.set(this._delta.x, this._delta.y)
    }

    get wheelDelta() {
        return this._vecBuff.set(this._wheelDelta.x, this._wheelDelta.y)
    }

    isButtonPressed(button: MouseButton) {
        return this.buttonState & button
    }

    isButtonJustPressed(button: MouseButton) {
        return (this.buttonState & button) && !(this._lastButtonState & button) 
    }

    updateFromEvent(e: MouseEvent) {
        this._position.set(e.clientX, e.clientY)
        this._delta.set(e.movementX, e.movementY)
        this.buttonState = e.buttons
    }

    updateWheelFromEvent(e: WheelEvent) {
        this._wheelDelta.set(e.deltaX, e.deltaY)
    }

    refresh() {
        this._delta.set(0, 0)
        this._wheelDelta.set(0, 0)

        this._lastButtonState = this.buttonState
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