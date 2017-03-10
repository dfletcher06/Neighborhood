class Fence{

    constructor(gl){

        let col1 = vec3.fromValues(10/256, 16/256, 169/256);

        this.fence = new Cube(gl, .2, .1, col1, col1, col1);
        this.tmp = mat4.create();
        this.fenceTransform = mat4.create();

        mat4.rotateX(this.fenceTransform, this.fenceTransform, Math.PI/3);
        mat4.translate(this.fenceTransform, this.fenceTransform, vec3.fromValues (1, .8, -.001));

    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.fenceTransform);
        this.fence.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

    }
}