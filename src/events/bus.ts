import { Disposable } from "../interfaces/disposable";
import { Event } from "../interfaces/event";
import { EventHandler } from "../interfaces/eventhandler";

export class EventStore implements Disposable {

    handlers: EventHandler[] = []

    subscribe(handler: EventHandler) {
        this.handlers.push(handler)
    }

    unsubscribe(handler: EventHandler) {
        this.handlers = this.handlers.filter(e => e != handler)
    }

    broadcast(event: Event) {
        for(const handler of this.handlers) {
            if(handler.mask == event.layer) 
                handler.handle(event)
        }
    }

    dispose(): void {
        this.handlers.forEach(e => e.dispose())
    }

}