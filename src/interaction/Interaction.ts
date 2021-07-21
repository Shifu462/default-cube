import { Camera, Intersection, Object3D, Raycaster, Vector2, Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { IInteractableObject } from './IInteractableObject';

export class Interaction {
    private readonly _raycaster = new Raycaster();
    private readonly _direction = new Vector3();
    private readonly _interactableObjects3D: Object3D[];

    private _intersections: Intersection[] = [];

    constructor(
        private readonly _camera: Camera,
        private readonly _pointerLockControls: PointerLockControls,
        private readonly _interactableObjects: IInteractableObject[],
    ) {
        this._interactableObjects3D = this._interactableObjects.map(x => x.object);
    }

    findInteractable(object3D: Object3D): IInteractableObject {
        return this._interactableObjects.find(obj => obj.object === object3D);
    }

    initEvents() {
        document.addEventListener('mousedown', () => {
            this._interactableObjects.filter(x => x.isHovered).forEach(x => x.interact());
        }, false);

        document.addEventListener('mousemove', _event => {
            this._pointerLockControls.getDirection(this._direction);
            this._raycaster.set(this._camera.position, this._direction)

            const previousIntersectionObjects = this._intersections.map(x => x.object);
            this._intersections = this._raycaster.intersectObjects(this._interactableObjects3D);
            const intersectionObjects = this._intersections.map(i => i.object);

            const newHoveredIntersectionObjects = intersectionObjects.filter(x => !previousIntersectionObjects.includes(x));
            const oldUnhoveredIntersections = previousIntersectionObjects.filter(x => !intersectionObjects.includes(x));

            newHoveredIntersectionObjects.map(i => this.findInteractable(i)).forEach(i => {
                i.isHovered = true;
                i.onHoverChange(true);
            });
            oldUnhoveredIntersections.map(i => this.findInteractable(i)).forEach(i => {
                i.isHovered = false;
                i.onHoverChange(false);
            });
        }, false);
    }
}
