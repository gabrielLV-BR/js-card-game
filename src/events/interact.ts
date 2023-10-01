import { Event } from "../interfaces/event";
import { EventHandler } from "../interfaces/eventHandler";

const InteractEventLayer = "ACTION"

export class InteractEvent extends Event {
    constructor() {
        super(InteractEventLayer)
    }
}

export class InteractEventHandler extends EventHandler {
    constructor() {
        super(InteractEventLayer)
    }

    handle(event: InteractEvent): void {
    }

    dispose(): void {
        
    }
}