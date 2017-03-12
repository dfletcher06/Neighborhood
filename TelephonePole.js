/**
 * Created by fletcher on 3/11/17.
 */
class TelephonePole{

    constructor(gl){

        let brown = vec3.fromValues(139/256, 69/256, 19/256);

        this.pole = new Cylinder(gl, .025, .025, 1.5, 30, brown, brown);
        this.block = new rectangle(gl, .1, .1, .1, 1, brown, brown, brown);

        this.tmp = mat4.create();
        this.poleTransform = mat4.create();
        this.pole3 = mat4.create();
        this.pole4 = mat4.create();
        this.block1 = mat4.create();
        this.block2 = mat4.create();

        mat4.translate(this.poleTransform, this.poleTransform, vec3.fromValues (1.03, 1.5, .25));
        mat4.translate(this.pole3, this.pole3, vec3.fromValues(1.03, -1.5, .25));
        mat4.translate(this.pole4, this.pole4, vec3.fromValues(1.03, -.5, .25));
        mat4.translate(this.block1, this.block1, vec.fromValues())

    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {

        mat4.mul (this.tmp, coordFrame, this.poleTransform);
        this.pole.draw(vertexAttr, colorAttr, modelUniform, this.tmp);


        mat4.mul(this.tmp, coordFrame, this.pole3);
        this.pole.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.pole4);
        this.pole.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}