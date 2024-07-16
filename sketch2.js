var trees = [];

var ground, treeTop;

let treelayer1;

let treelayer2;

let layer1;

let layer2;

let layer3;

let layerFractal; 

let layerFractal2; 

let layerGrass; 

let firstClick = true;

let currentRect = null;

let rects = [];

let nf = 4;

let nm; 

let hG1 = 80; 

let hG2 = 300; 

let bgTowers = []

let rectCount = 0; // Flag to track if a rectangle is being drawn

const depth = 4;

function setup() {

    createCanvas(1480, 720);

    // Background color of layer2

    layer3 = createGraphics(width, height);

    layer3.background(255, 0, 0);

layerFractal = createGraphics(width, height); //Fractal Layer on the red layer

layerFractal.background(255, 255, 255, 0); // Transparent background

    layer2 = createGraphics(width, height);

    layer2.background(0, 0, 255);

    layer2.noStroke();

    // Create the bottom layer (layer1)

layerFractal2 = createGraphics(width, height); //Fractal layeron the blue layer

layerFractal.background(255, 255, 255, 0); //Transparent Background

layerGrass = createGraphics(width, height); //Grass Fractal Layer

layerGrass.background(255, 255, 255, 0)

layerGrass.clear(); 

layerGrass.blendMode(BLEND); 

    layer1 = createGraphics(width, height);

    layer1.background(0);

    layer1.textSize(50);

    layer1.textAlign(CENTER);

    layer1.fill(255); // Text color (white)

    layer1.text("Draw 5 Rectangles", width / 2, height / 2);


    layer1.noStroke();

    treelayer1 = createGraphics(width, height);

    treelayer2 = createGraphics(width, height);

    ground = height - 30;

    treeTop = height - 600;

// Create grass blades
for (let i = 0; i < width; i += 10) {
    let alpha = random(5);
    bgTowers.push(new Tower(i, height - 40, alpha));
}

for (let tower of bgTowers) {
    tower.display(layerGrass);
}

const input = document.getElementById('fractalInput');
            input.addEventListener('input', () => {
                nm = parseInt(input.value) || 3; // Default to 3 if the input is invalid
                
            }); 
}


function draw() {

layerFractal.clear(); 

layerFractal.blendMode(BLEND);

drawFractal(layerFractal, width / 2, height / 2, 320, depth); 

drawFractal(layerFractal, 100, 300, 300, depth); 

drawFractal(layerFractal, 500, 500, 320, depth); 


    image(layer3, 0, 0);

image(layerFractal, 0, 0);

layerFractal2.clear(); 

layerFractal2.blendMode(BLEND);

drawFractal2(layerFractal2, width / 2, height / 2, 500, depth); 

drawFractal2(layerFractal2, 100, 300, 100, depth); 

drawFractal2(layerFractal2, 1200, 500, 120, depth); 



    image(layer2, 0, 0);    //Draw Layers 

    image(treelayer2, 0, 0);

image(layerFractal2, 0, 0);

image(layerGrass, 0, 0);

    image(layer1, 0, 0);

    image(treelayer1, 0, 0);


    if (rectCount < 5) {

        layer1.blendMode(REMOVE);

        layer2.blendMode(REMOVE);

        createRectangles();

        for (let rect of rects) {

            rect.display();

        }

        fill(255);

        textSize(20);

        text("Rectangles: " + rectCount, 20, 30);


        if (currentRect != null) {

            currentRect.updateSize(mouseX, mouseY);

            currentRect.display();

        }

    } else {

        displayRectangles();

        drawingContext.shadowBlur = 0;




        TreeGrowing1();

    }

}

class Tower {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.height = random(hG1, hG2);
        this.width = random(2, 5); 
    }

    display(layer) {
        layer.stroke(0, 255,0); // Set the color and alpha of the grass blades
        layer.strokeWeight(this.width); 
        layer.line(this.x, this.y, this.x, this.y - this.height);
    }

    draw() {
        fill(120, 100, 50, this.alpha)
        stroke(this.x, this.y - this.height, this.width, this,height); 
    }
}


function polar(angle, radius) {
    return {
        x: cos(angle * TWO_PI) * radius,
        y: sin(angle * TWO_PI) * radius,
    }
}


function drawFractal(layer, x, y, size, depth) {

    layerFractal.stroke(0, 0, 255);
    for (let i = 0; i < nf; i++) {
        const f = i / nf;
        const angle = f + 0.25;

        if (depth > 0) {
            const scale = 0.5;
            const s = size * scale;
            const p = polar(angle, s);
            drawFractal(layer, x + p.x, y + p.y, s, depth - 1);
        } else {
            const p1 = polar(angle, size);
            const p2 = polar(angle + 1 / nf, size);
            layer.line(x + p1.x, y + p1.y, x + p2.x, y + p2.y);
        }
    }
}

function drawFractal2(layer, x, y, size, depth) {

    layerFractal2.stroke(255, 255, 0);
    for (let i = 0; i < nm; i++) {
        const f = i / nm;
        const angle = f + 0.25;

        if (depth > 0) {
            const scale = 0.5;
            const s = size * scale;
            const p = polar(angle, s);
            drawFractal2(layer, x + p.x, y + p.y, s, depth - 1);
        } else {
            const p1 = polar(angle, size);
            const p2 = polar(angle + 1 / nm, size);
            layer.line(x + p1.x, y + p1.y, x + p2.x, y + p2.y);
        }
    }
}


function mousePressed() {

    // Check if mouse is within canvas bounds

    if (rectCount < 5 && currentRect == null) {

        currentRect = new Rect(mouseX, mouseY); // Start drawing a new rectangle

    } else if (rectCount >= 5) {

        if (firstClick) {

            firstClick = false;

        }

        trees.push(createTree(mouseX, mouseY));

        lapse = frameCount;

    }

}


function mouseReleased() {

    if (rectCount < 5 && currentRect != null) {

        rects.push(currentRect.copy());

        currentRect = null;

        rectCount++; // Reset flag

    }

}


class Rect {

    constructor(x, y) {

        this.x = x;

        this.y = y;

        this.w = 0;

        this.h = 0;

    }


    updateSize(mx, my) {

        this.w = mx - this.x;

        this.h = my - this.y;

    }


    display() {

        // Draw rectangle as a shape on layer1

        layer1.noStroke();

        layer1.fill(255);

        layer1.rect(this.x, this.y, this.w, this.h);

    }


    copy() {

        let newRect = new Rect(this.x, this.y);

        newRect.w = this.w;

        newRect.h = this.h;

        return newRect;

    }


    checkOverlap(other) {

        // calculate the normalized coordinates of this rectangle

        let x1 = min(this.x, this.x + this.w);

        let x2 = max(this.x, this.x + this.w);

        let y1 = min(this.y, this.y + this.h);

        let y2 = max(this.y, this.y + this.h);


        // calculate the normalized coordinates of the other rectangle

        let ox1 = min(other.x, other.x + other.w);

        let ox2 = max(other.x, other.x + other.w);

        let oy1 = min(other.y, other.y + other.h);

        let oy2 = max(other.y, other.y + other.h);


        // calculate the overlap region

        let overlapX = max(x1, ox1);

        let overlapY = max(y1, oy1);

        let overlapW = min(x2, ox2) - overlapX;

        let overlapH = min(y2, oy2) - overlapY;


        // if there is an overlap, draw it on layer2

        if (overlapW > 0 && overlapH > 0) {

            layer2.fill(0, 0, 255); // change the color to red for overlap areas

            layer2.rect(overlapX, overlapY, overlapW, overlapH);

        }

    }




    overlapsPoint(px, py) {
        let x1 = min(this.x, this.x + this.w);
        let x2 = max(this.x, this.x + this.w);
        let y1 = min(this.y, this.y + this.h);
        let y2 = max(this.y, this.y + this.h);
        
        return (px >= x1 && px <= x2 && py >= y1 && py <= y2);
    }

}


function createRectangles() {

    for (let sq of rects) {

        sq.display();

    }


    fill(0);

    textSize(20);

    text("Rectangles: " + rectCount, 20, 30);


    if (currentRect != null) {

        currentRect.updateSize(mouseX, mouseY);

        currentRect.display();

    }


    for (let i = 0; i < rects.length; i++) {

        for (let j = i + 1; j < rects.length; j++) {

            rects[i].checkOverlap(rects[j]);

        }

    }


    if (currentRect != null) {

        for (let sq of rects) {

            currentRect.checkOverlap(sq);

        }

    }

}


function TreeGrowing1() {

    treelayer1.noStroke(); // Ensure no stroke for treelayer1

    trees.forEach((tree, index, arr) => {
        tree.dir += (noise(tree.phase + millis() / 100) - 0.5) / 3;
        tree.dir += (PI - tree.dir) * 0.09 / (tree.generation + 1); // point north
        tree.pos.x += sin(tree.dir) * 2;
        tree.pos.y += cos(tree.dir) * 2;

        // Check if the tree overlaps with any rectangle
        let overlapping = rects.some(rect => rect.overlapsPoint(tree.pos.x, tree.pos.y));

        // Check if the tree is in any overlapping (red) region
        let inRedRectangle = false;
        for (let i = 0; i < rects.length; i++) {
            for (let j = i + 1; j < rects.length; j++) {
                let x1 = min(rects[i].x, rects[i].x + rects[i].w);
                let x2 = max(rects[i].x, rects[i].x + rects[i].w);
                let y1 = min(rects[i].y, rects[i].y + rects[i].h);
                let y2 = max(rects[i].y, rects[i].y + rects[i].h);

                let ox1 = min(rects[j].x, rects[j].x + rects[j].w);
                let ox2 = max(rects[j].x, rects[j].x + rects[j].w);
                let oy1 = min(rects[j].y, rects[j].y + rects[j].h);
                let oy2 = max(rects[j].y, rects[j].y + rects[j].h);

                let overlapX = max(x1, ox1);
                let overlapY = max(y1, oy1);
                let overlapW = min(x2, ox2) - overlapX;
                let overlapH = min(y2, oy2) - overlapY;

                if (overlapW > 0 && overlapH > 0) {
                    if (tree.pos.x > overlapX && tree.pos.x < overlapX + overlapW &&
                        tree.pos.y > overlapY && tree.pos.y < overlapY + overlapH) {
                        inRedRectangle = true;
                        break;
                    }
                }
            }
            if (inRedRectangle) break;
        }

        // Draw tree and shadows only if not overlapping with any rectangle
        if (!overlapping) {
            if (inRedRectangle && index % 3 === 0) {
                treelayer1.fill(0, 0, 255); // Dark blue color for every 3rd ellipse
            } else {
                treelayer1.fill(255); // White color for other ellipses
            }

            treelayer1.ellipse(tree.pos.x, tree.pos.y, tree.radius * 2, tree.radius * 2);
            drawShadows(treelayer1, tree); // Draw shadows inside the tree layer
        } else {
            treelayer1.fill(255);
            treelayer1.ellipse(tree.pos.x, tree.pos.y, tree.radius * 2, tree.radius * 2);
        }

        // Modify radius, life, and branching logic
        tree.radius *= 0.9985 / (tree.generation / 300 + 1);
        tree.life--;
        if (tree.life < 0) {
            arr.splice(index, 1);
            if (tree.radius > 2) {
                // Transform root into branches
                trees.push(createTree(tree.pos.x, tree.pos.y, tree));
                trees.push(createTree(tree.pos.x, tree.pos.y, tree));
            }
        }
    });
}




function drawShadows(layer, tree) {

    layer.fill(255, 0, 0, 50); // Red shadow with some transparency

    for (let i = 0; i < PI; i += PI / 20) {

        let x = cos(i) * tree.radius;

        let y = sin(i) * tree.radius;

        layer.ellipse(tree.pos.x + x, tree.pos.y + y, i, i);

    }


    layer.fill(0, 255, 0, 50); // Green shadow with some transparency

    for (let i = 0; i < PI; i += PI / 20) {

        let x = cos(i + PI / 2) * tree.radius;

        let y = sin(i + PI / 2) * tree.radius;

        layer.ellipse(tree.pos.x + x, tree.pos.y + y, i, i);

    }


    layer.fill(0, 0, 255, 50); // Blue shadow with some transparency

    for (let i = 0; i < PI; i += PI / 20) {

        let x = cos(i + PI) * tree.radius;

        let y = sin(i + PI) * tree.radius;

        layer.ellipse(tree.pos.x + x, tree.pos.y + y, i, i);

    }

}



function createTree(x, y, root) {

    if (!root) {

        root = {

            pos: createVector(x, y),

            dir: PI,

            radius: random(7, 20),

            generation: 0

        };

    }

    var tree = {

        pos: root.pos.copy(),

        phase: random(1000),

        dir: root.dir,

        radius: root.radius,

        life: random(30, 120) / (root.generation / 10 + 1),

        generation: root.generation + 1

    };

    return tree;

}


function displayRectangles() {

    for (let sq of rects) {

        sq.display();

    }

}


function mod(m, n) {

    return ((m % n) + n) % n;

}