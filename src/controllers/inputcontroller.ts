import { IDisposable } from "../interfaces/disposable"

type EventListener = {
    type: string
    listener: (e: any) => any
}

export class InputController implements IDisposable {

    keys: Map<string, string>

    domEventListeners: EventListener[]

    constructor(private element: HTMLCanvasElement) {
        this.keys = new Map()

        this.domEventListeners = [
            { type: "keydown", listener: e => this.keyDown(e) },
            { type: "keyup", listener: e => this.keyUp(e) },
            { type: "mousedown", listener: e => this.mouseDown(e) },
            { type: "mouseup",   listener: e => this.mouseUp(e) }
        ]

        for(const { type, listener } of this.domEventListeners) {
            this.element.addEventListener(type, listener)
        }
    }

    keyDown(e: KeyboardEvent) {}

    keyUp(e: KeyboardEvent) {}

    mouseDown(e: MouseEvent) {}

    mouseUp(e: MouseEvent) {}

    mouseMove(e: MouseEvent) {}

    update(): void {
        
    }

    dispose() {
        for(const { type, listener } of this.domEventListeners) {
            this.element.removeEventListener(type, listener)
        }
    }
}