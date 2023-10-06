import { Component } from "../ecs/component";

export enum CardType {
    WHITE = "white", BLACK = "black"
}

export class CardComponent extends Component {
    constructor(
        public type: CardType,
        public text: string
    ){
        super(CardComponent.name)
    }
}