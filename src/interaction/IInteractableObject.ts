import { Object3D } from 'three';

export interface IInteractableObject {
    isHovered: boolean;
    object: Object3D;
    onHoverChange(isHovered: boolean): void;
    interact(): void;
}
