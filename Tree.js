/**
 * Created by Hans Dulimarta on 2/16/17.
 */
class Tree {
    constructor (gl) {
        let col1 = vec3.fromValues((37/256), (61/256), (34/256));
        let col2 = vec3.fromValues((60/256), (109/256), (55/256));

        let col3 = vec3.fromValues((112/256), (60/256), (14/256));
        let col4 = vec3.fromValues((158/256), (84/256), (20/256));

        this.leaves1 = new Torus(gl, 0, .2, 32, 32, col1, col2);
        this.leaves2 = new Torus(gl, 0, .2, 32, 32, col1, col2);
        this.leaves3 = new Torus(gl, 0, .2, 32, 32, col1, col2);

        this.trunk = new Cylinder(gl, .01, .02, .5, 32, col3, col4);

        this.tmp = mat4.create();

        this.leaves1Transform = mat4.create();
        this.leaves2Transform = mat4.create();
        this.leaves3Transform = mat4.create();

        this.trunkTransform = mat4.create();

        this.scaleLeavesTransform = mat4.create();

        let leavesScale = vec3.fromValues (.5, .5, .75);

        mat4.fromScaling(this.scaleLeavesTransform, leavesScale);

        let sign1 = Math.floor(Math.random() * 2);
        let sign2 = Math.floor(Math.random() * 2);
        let padding = .25;

        if (sign1 === 1) {
            sign1 = -1;
        } else {
            sign1 = 1;
        }

        if (sign2 === 1) {
            sign2 = -1;
        } else {
            sign2 = 1;
        }
        let ranX = (Math.random()* 1.5) * sign1 + (padding * sign1);
        console.log(ranX);
        let ranY = (Math.random() * 1.5) * sign2 + (padding * sign2);

        mat4.translate(this.leaves1Transform, this.leaves1Transform, vec3.fromValues (ranX, ranY+.05, .5));
        mat4.translate(this.leaves2Transform, this.leaves2Transform, vec3.fromValues (ranX, ranY-.05, .5));
        mat4.translate(this.leaves3Transform, this.leaves3Transform, vec3.fromValues (ranX, ranY, .65));

        mat4.translate(this.trunkTransform, this.trunkTransform, vec3.fromValues (ranX, ranY, .25));

        this.tmp = mat4.create();
    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, this.leaves1Transform, this.scaleLeavesTransform);
        this.leaves1.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, this.leaves2Transform, this.scaleLeavesTransform);
        this.leaves2.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, this.leaves3Transform, this.scaleLeavesTransform);
        this.leaves3.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.trunkTransform);
        this.trunk.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}