/**
 * Created by fletcher on 2/24/17.
 */

class Pool{

    constructor(gl){

        let col1 = vec3.fromValues(30/256, 144/256, 255/256);
        let col2 = vec3.fromValues(255/256, 222/256, 173/256);
        let col3 = vec3.fromValues(255/255, 255/255, 255/255);
        let col4 = vec3.fromValues(255/255, 255/255, 0/255);
        let grey1 = vec3.fromValues(220/255, 220/255, 220/255);
        let grey2 = vec3.fromValues(128/255, 128/255, 128/255);
        let grey3 = vec3.fromValues(192/255, 192/255, 192, 255);

        this.pool = new Rectangle(gl, 1.3, .1, .8, 1, col1, col1, col1);
        this.stand = new Rectangle(gl, .1, .5, .1, 1, col2, col2, col2);
        this.divingBoard = new Rectangle(gl, .3, .05, .1, 1, col3, col3, col3);
        this.tube = new Torus(gl, .1, .03, 30, 70, col4, col4);
        this.pavement = new Rectangle(gl, 2, .1, 1, 1, grey1, grey1, grey1);

        this.tmp = mat4.create();
        this.poolTransform = mat4.create();
        this.standTransform = mat4.create();
        this.divingBoardTransform = mat4.create();
        this.tubeTransform = mat4.create();
        this.pavementTransform = mat4.create();

        mat4.translate(this.poolTransform, this.poolTransform, vec3.fromValues (-.8, 0, .001));
        mat4.translate(this.standTransform, this.standTransform, vec3.fromValues(-.8, .70, .001));
        mat4.translate(this.divingBoardTransform, this.divingBoardTransform, vec3.fromValues(-.8, .6, .27));
        mat4.translate(this.tubeTransform, this.tubeTransform, vec3.fromValues(-.9, .1, .1));
        mat4.translate(this.pavementTransform, this.pavementTransform, vec3.fromValues(-.8, 0, 0));

    }

    draw (vertexAttr, colorAttr, modelUniform, coordFrame) {
        mat4.mul (this.tmp, coordFrame, this.poolTransform);
        this.pool.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.standTransform);
        this.stand.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul (this.tmp, coordFrame, this.divingBoardTransform);
        this.divingBoard.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.tubeTransform);
        this.tube.draw(vertexAttr, colorAttr, modelUniform, this.tmp);

        mat4.mul(this.tmp, coordFrame, this.pavementTransform);
        this.pavement.draw(vertexAttr, colorAttr, modelUniform, this.tmp);
    }
}