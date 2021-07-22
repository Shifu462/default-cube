import { BoxGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial } from 'three';

export function createPlate() {
    const plateMesh = new Mesh(
        new BoxGeometry(200, 250, 3),
        // new MeshBasicMaterial({ color: 0x68009c, dithering: true })
        new MeshPhongMaterial({ color: 0x68009c, dithering: true })
    );
    plateMesh.rotateX(Math.PI / 2);
    plateMesh.receiveShadow = true;

    return plateMesh;
}
