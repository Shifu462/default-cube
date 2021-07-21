import { Object3D } from 'three';

export interface IInteractableObject {
    object: Object3D;
    hoverIn(): void;
    hoverOut(): void;
    interact(): void;
}
