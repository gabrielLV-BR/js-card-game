import { IRefreshable, System } from "../ecs/system"
import { World } from "../ecs/world"
import { InputResource } from "../resources/inputResource"

export class InputSystem extends System implements IRefreshable {

    resource = this.getResource(InputResource)
    
    element : HTMLCanvasElement
    events = [
        { type: "mousedown", listener: (e: any) => this.resource.mouseDown(e) },
        { type: "mouseup", listener: (e: any) => this.resource.mouseUp(e) },
        { type: "mousemove", listener: (e: any) => this.resource.mouseMove(e) },
        { type: "keydown", listener: (e: any) => this.resource.keyDown(e) },
        { type: "keyup", listener: (e: any) => this.resource.keyUp(e) },
        { type: "wheel", listener: (e: any) => this.resource.wheel(e) },
    ]

    constructor(
        world: World,
        [element] : [HTMLCanvasElement]
    ) {
        super(world)

        console.log(world);
        
        this.element = element

        for(const { type, listener } of this.events) {
            this.element.addEventListener(type, listener)
        }
    }

    run(_delta: number): void {}

    refresh(): void {
        this.resource.mouse.clearMovement()
    }

    dispose() {
        for(const { type, listener } of this.events) {
            this.element.removeEventListener(type, listener)
        }
    }
}