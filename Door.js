class Door{

    constructor(gl){

        let col1 = vec3.fromValues(51/256, 25/256, 0/256);

        this.door = new Cube(gl, .1, 1, col1, col1, col1);
        this.door2 = new Cube(gl, .1, 1, col1, col1, col1);
        this.door3 = new Cube(gl, .1, 1, col1, col1, col1);
        this.tmp = mat4.create();
        this.doorTransform = mat4.create();
        this.doorTransform2 = mat4.create();
        this.doorTransform3 = mat4.create();

        mat4.translate(this.doorTransform, this.doorTransform, vec3.fromValues (.22, 0, .1));
        mat4.translate(this.doorTransform2, this.doorTransform2, vec3.fromValues(.22, 0, .2));
        mat4.translate(this.doorTransform3, this.doorTransform3, vec3.fromValues(.22, 0, .3));

    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.doorTransform);
        this.door.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.doorTransform2);
        this.door2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.doorTransform3);
        this.door3.draw(vertexAttr, colorAttr, modelUniform, this.tmp);


    }
}