/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class House {
    constructor (gl) {let col1 = vec3.fromValues(0, 0, 0);

        let col2 = vec3.fromValues((130/256), (58/256), (45/256));

        let col3 = vec3.fromValues((193/256), (27/256), (35/256));
        let col4 = vec3.fromValues((140/256), (27/256), (35/256));
        let doorColor = vec3.fromValues(51/256, 25/256, 0/256);

        this.house = new Cube(gl, .5, 4, col3, col4, col3);
        this.roof = new Cone(gl, .4, .5, 4, col1, col2);
        this.door = new Rectangle(gl, .1, .3, .005, 1, doorColor, doorColor, doorColor);
        this.tmp = mat4.create();
        this.houseTransform = mat4.create();
        this.roofTransform = mat4.create();
        this.doorTransform = mat4.create();

        mat4.translate(this.houseTransform, this.houseTransform, vec3.fromValues (0, 0, .25));
        mat4.translate(this.doorTransform, this.doorTransform, vec3.fromValues(.25, 0, .17));

        mat4.translate(this.roofTransform, this.roofTransform, vec3.fromValues (0, 0, .5));
        mat4.rotateZ(this.roofTransform, this.roofTransform, Math.PI/4);
        this.tmp = mat4.create();
    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.houseTransform);
        this.house.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.roofTransform);
        this.roof.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.doorTransform);
        this.door.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}