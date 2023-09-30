import * as THREE from "three"
import { OrbitController } from "./controllers/orbitcontroller"
import { EventHandler } from "./interfaces/eventhandler"
import { Card } from "./objects/card"
import { Player } from "./entities/player"

export class App {

  running: boolean = true
  clock: THREE.Clock = new THREE.Clock()

  renderer: THREE.WebGLRenderer
  scene: THREE.Scene

  player: Player

  //

  eventBus: Event[] = []
  eventHandlers: EventHandler[] = []

  constructor() {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(innerWidth, innerHeight)

    document.body.appendChild(this.renderer.domElement)

    // this.eventHandlers.push(new Resizer(this.camera, this.renderer))
    
    this.player = new Player(this)
  }

  Start() {
    for(let i = 0; i < 10; i++) {
      const card = new Card()
      card.mesh.position.x = Math.random() * 5
      card.mesh.position.z = Math.random() * 5

      card.mesh.rotateY(Math.random() * Math.PI)

      this.scene.add(card.mesh)
    }

    //

    const mesh = new THREE.BoxGeometry(10, 1, 10)
    const material = new THREE.MeshBasicMaterial({ color: "rgb(120, 120, 40)" })
    const model = new THREE.Mesh(mesh, material)

    model.position.set(0, -0.5, 0)

    this.scene.add(model)

    this.clock.start()
    this.renderer.setAnimationLoop(() => this.Loop())
  }

  Dispose() {
    this.clock.stop()

    this.player.dispose()

    this.eventHandlers.forEach(e => e.dispose())
  }

  Loop() {
    const delta = this.clock.getDelta()
    //

    this.player.update(delta)

    //
    this.renderer.render(this.scene, this.player.camera)
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