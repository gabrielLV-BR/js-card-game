import { Vector2 } from "three";
import { Event } from "../interfaces/event";
import { EventHandler } from "../interfaces/eventhandler";
import { App } from "../main";

import { Raycaster } from "three";
import { UserData } from "../objects/userdata";
import { SelectEvent, SelectionType } from "./selectevent";

const LAYER = "Click"

export enum MouseAction {
    DOWN, 
    UP
}

export enum MouseButton {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export class ClickEvent extends Event {
    constructor(
        public action: MouseAction,
        public button: MouseButton,
        public position: Vector2,
    ) {
        super(LAYER)
    }
}

export class ClickEventHandler extends EventHandler {
    constructor(private app: App) {
        super(LAYER)
    }

    handle(event: ClickEvent): void {
        
        // check if objects were selected
        if(event.action == MouseAction.DOWN && event.button == MouseButton.LEFT) {
            const pointer = new Vector2()
            pointer.x = (event.position.x / innerWidth) * 2 - 1
            pointer.y = - (event.position.y / innerHeight) * 2 + 1

            this.raycastClick(pointer)
        }
    }

    raycastClick(pointer: Vector2) {
        const raycaster = new Raycaster()

        raycaster.setFromCamera(pointer, this.app.camera)

        const intersections = raycaster.intersectObjects(this.app.scene.children)

        if (intersections.length == 0) {
            this.app.Broadcast(new SelectEvent([], SelectionType.REPLACE))
        }

        for (const obj of intersections) {
            const { id } = obj.object.userData as UserData
            this.app.Broadcast(new SelectEvent([ id ], SelectionType.ADD))
        }
    }


    dispose(): void {
        
    }
}