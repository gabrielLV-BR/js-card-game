import * as THREE from "three"
import { EventHandler } from "./interfaces/eventhandler"
import { Card } from "./objects/card"
import { Player } from "./entities/player"
import { GameObject, RenderableObject } from "./objects/object"
import { Event } from "./interfaces/event"
import { ClickEvent, ClickEventHandler, MouseAction, MouseButton } from "./events/ClickEvent"
import { SelectEventHandler } from "./events/SelectEvent"



type EventListener = {
  type: string
  listener: (e: any) => any
}

export class App {

  running: boolean = true
  clock: THREE.Clock = new THREE.Clock()

  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene

  objects: GameObject[]
  eventHandlers: EventHandler[]

  domEventListeners: EventListener[]

  constructor() {
    const fov = 90
    const near = 0.1
    const far = 1000

    this.camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, near, far)

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(innerWidth, innerHeight)

    document.body.appendChild(this.renderer.domElement)

    //

    this.objects = []
    this.objects.push(new Player(this))

    this.eventHandlers = []
    this.eventHandlers.push(new ClickEventHandler(this))
    this.eventHandlers.push(new SelectEventHandler(this))

    //


    this.domEventListeners = [
      { type: "mousedown", listener: e => this.MouseDown(e) },
      { type: "mouseup",   listener: e => this.MouseUp(e) }
    ]
  }

  MouseDown(e: MouseEvent) {
    this.Broadcast(
      new ClickEvent(
        MouseAction.DOWN, 
        e.button as MouseButton, 
        new THREE.Vector2(e.clientX, e.clientY)
      )
    )
  }

  MouseUp(e: MouseEvent) {
    this.Broadcast(
      new ClickEvent(
        MouseAction.UP, 
        e.button as MouseButton, 
        new THREE.Vector2(e.clientX, e.clientY)
      )
    )
  }

  AddObject(obj: GameObject) {
    this.objects.push(obj)

    if(obj instanceof RenderableObject) {
      this.scene.add(obj.mesh)
    }
  }

  Broadcast(event: Event) {
    for(const handler of this.eventHandlers) {
      if(event.layer == handler.mask) {
        handler.handle(event)
      }
    }
  }

  Start() {
    for(let i = 0; i < 10; i++) {
      const card = new Card()
      card.mesh.position.x = Math.random() * 5
      card.mesh.position.z = Math.random() * 5

      card.mesh.rotateY(Math.random() * Math.PI)

      this.AddObject(card)
    }

    //

    const mesh = new THREE.BoxGeometry(10, 1, 10)
    const material = new THREE.MeshBasicMaterial({ color: "rgb(120, 120, 40)" })
    const model = new THREE.Mesh(mesh, material)

    model.position.set(0, -0.5, 0)

    this.scene.add(model)

    //

    this.clock.start()
    this.renderer.setAnimationLoop(() => this.Loop())

    const element = this.renderer.domElement

    for(const e of this.domEventListeners) {
      element.addEventListener(e.type, e.listener)
    }
  }

  Dispose() {
    this.clock.stop()

    this.objects.forEach(x => x.dispose)
    this.eventHandlers.forEach(x => x.dispose())

    const element = this.renderer.domElement

    for(const e of this.domEventListeners) {
      element.removeEventListener(e.type, e.listener)
    }
  }

  Loop() {
    const delta = this.clock.getDelta()

    for(const obj of this.objects) {
      obj.update(delta)
    }

    this.renderer.render(this.scene, this.camera)
  }

  Resize() {
    this.renderer.setSize(innerWidth, innerHeight)
  }
}

window.oncontextmenu = () => {
  // cancels right mouse button menu
  return false
}

window.onload = () => {
  new App().Start()
}