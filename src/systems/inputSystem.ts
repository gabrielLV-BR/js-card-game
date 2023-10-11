import { IRefreshable, System } from "../ecs/system"
import { World } from "../ecs/world"
import { InputResource } from "../resources/inputResource"

export class InputSystem extends System implements IRefreshable {

    resource = this.getResource(InputResource)
    
    element : HTMLCanvasElement
    events = [
        { type: "mouseup", listener: (e: any) => this.resource.mouseEvent(e) },
        { type: "mousedown", listener: (e: any) => this.resource.mouseEvent(e) },
        { type: "mousemove", listener: (e: any) => this.resource.mouseEvent(e) },
        { type: "keydown", listener: (e: any) => this.resource.keyDown(e) },
        { type: "keyup", listener: (e: any) => this.resource.keyUp(e) },
        { type: "wheel", listener: (e: any) => this.resource.wheel(e) },
    ]

    constructor(
        world: World,
        [element] : [HTMLCanvasElement]
    ) {
        super(world)
        
        this.element = element

        for(const { type, listener } of this.events) {
            this.element.addEventListener(type, listener)
        }
    }

    run(_delta: number): void {}

    refresh(): void {
        this.resource.mouse.refresh()
    }

    dispose() {
        for(const { type, listener } of this.events) {
            this.element.removeEventListener(type, listener)
        }
    }
}