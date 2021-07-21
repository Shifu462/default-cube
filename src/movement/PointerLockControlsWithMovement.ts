import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

export type PointerLockControlsWithMovement = PointerLockControls & { moveForward: Function; moveRight: Function; };
