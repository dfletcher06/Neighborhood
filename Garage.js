/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Garage {
    constructor (gl) {let col1 = vec3.fromValues(0, 0, 0);

        let col2 = vec3.fromValues((130/256), (58/256), (45/256));

        let col3 = vec3.fromValues((193/256), (27/256), (35/256));
        let col4 = vec3.fromValues((140/256), (27/256), (35/256));
        let doorColor = vec3.fromValues(210/256, 180/256, 140/256);

        this.garage = new Cube(gl, .4, 4, col3, col4, col3);
        this.roof = new Cone(gl, .3, .4, 4, col1, col2);
        this.garageDoor = new Cube(gl, .3, 1, doorColor, doorColor, doorColor);
        this.tmp = mat4.create();
        this.garageTransform = mat4.create();
        this.roofTransform = mat4.create();
        this.garageDoorTransform = mat4.create();

        mat4.translate(this.garageTransform, this.garageTransform, vec3.fromValues (0, .5, .25));
        mat4.translate(this.roofTransform, this.roofTransform, vec3.fromValues (0, .5, .45));
        mat4.translate(this.garageDoorTransform, this.garageDoorTransform, vec3.fromValues(.06, .5, .20));

        mat4.rotateZ(this.roofTransform, this.roofTransform, Math.PI/4);
        this.tmp = mat4.create();
    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.garageTransform);
        this.garage.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.roofTransform);
        this.roof.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.garageDoorTransform);
        this.garageDoor.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}
