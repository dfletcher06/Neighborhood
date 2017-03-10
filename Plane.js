/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Plane {
    constructor (gl) {
        let col1 = vec3.fromValues((77/256), (168/256), (45/256));

        this.plane = new Cube(gl, 2, 4, col1, col1, col1);
        this.tmp = mat4.create();
        this.planeTransform = mat4.create();
        this.scaleTransform = mat4.create();

        let myScale = vec3.fromValues (2, 2, .01);

        mat4.fromScaling(this.scaleTransform, myScale);
    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.multiply(this.tmp, this.scaleTransform, this.planeTransform);
        this.plane.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}