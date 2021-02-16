// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    N: 59,
    Random_Seed: 61,
    Download_Image: () => save(),
}
gui.add(params, "N", 0, 100, 1)
gui.add(params, "Random_Seed", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    randomSeed(params.Random_Seed)
    // Clear background (only partially so that we get a motion blur effect)
    fill(0, 30)
    rect(0, 0, width, height)
    //
    noFill()
    stroke('white')
    strokeWeight(0.11)
    const w = width / params.N
    const dispersion = pow(sin(frameCount * 0.01) * 0.5 + 0.5, 3) * 1000
    for (let i = 0; i < params.N; ++i) {
        for (let j = 0; j < params.N; ++j) {
            if (random() < 0.8) {
                ellipse(
                    (i+0.5) * w + random(-dispersion, dispersion),
                    (j+0.5) * w + random(-dispersion, dispersion),
                    w
                )
            }
        }
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}