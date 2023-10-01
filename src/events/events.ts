import { Vector2 } from "three";
import { Event } from "../interfaces/event";
import { EventHandler } from "../interfaces/eventHandler";
import { App } from "../main";

import { Raycaster } from "three";
import { UserData } from "../objects/userData";
import { RenderableObject } from "../objects/object";

const CLICK_LAYER = "Click"
const SELECTION_LAYER = "Select"

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
        super(CLICK_LAYER)
    }
}

export class ClickEventHandler extends EventHandler {
    constructor(private app: App) {
        super(CLICK_LAYER)
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

export enum SelectionType {
    REPLACE,
    ADD,
    SUBTRACT
}

export class SelectEvent extends Event {
    constructor(
        public ids: number[],
        public selectionType: SelectionType
    ) {
        super(SELECTION_LAYER)
    }
}

export class SelectEventHandler extends EventHandler {
    clickInteractButton = 0

    raycaster = new Raycaster()
    pointer = new Vector2()

    selection : number[] = []

    constructor(
        private app: App
    ) {
        super(SELECTION_LAYER)
    }

    handle(event: SelectEvent): void {
        switch (event.selectionType) {
            
            case SelectionType.REPLACE:
                this.selection = event.ids
                break;

            case SelectionType.ADD:
                this.selection = this.selection.concat(event.ids)
                break;

            case SelectionType.SUBTRACT:
                this.selection =
                    this.selection.filter(x => !event.ids.some(y => y == x))
        }

        this.updateVisualSelection()
    }

    updateVisualSelection() {
        for(const id of this.selection) {
            const obj = this.app.objects.find(x => x.id == id)

            if(obj instanceof RenderableObject) {
                obj.mesh.scale.x = 2
            }
        }
    }

    dispose(): void {
    }
}