import {
    Mesh, Geometry,
    BufferGeometry
} from 'three';

export function mergeMeshes(meshes: Mesh[], toBufferGeometry = false) {
    const materials = [];
    const mergedGeometry = new Geometry();

    meshes.forEach((mesh, index) => {
        mesh.updateMatrix();
        (mesh.geometry as any).faces.forEach((face) => face.materialIndex = 0);
        mergedGeometry.merge(mesh.geometry as any, mesh.matrix, index);
        materials.push(mesh.material);
    });

    mergedGeometry.groupsNeedUpdate = true;

    const finalGeometry = !toBufferGeometry
        ? mergedGeometry
        : new BufferGeometry().fromGeometry(mergedGeometry);

    const mergedMesh = new Mesh(finalGeometry, materials);
    (mergedMesh.geometry as Geometry).computeFaceNormals();
    mergedMesh.geometry.computeVertexNormals();

    return mergedMesh;
}
