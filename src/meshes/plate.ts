import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export function createPlate() {
    const plateMesh = new Mesh(
        new BoxGeometry(200, 250, 3),
        new MeshBasicMaterial({ color: 0x68009c })
    );
    plateMesh.rotateX(Math.PI / 2);
    plateMesh.receiveShadow = true;

    return plateMesh;
}
