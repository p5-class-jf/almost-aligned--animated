var gui = new dat.GUI();
var params = {
    N: 59,
    Random_Seed: 61,
    Download_Image: function () { return save(); },
};
gui.add(params, "N", 0, 100, 1);
gui.add(params, "Random_Seed", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    randomSeed(params.Random_Seed);
    fill(0, 30);
    rect(0, 0, width, height);
    noFill();
    stroke('white');
    strokeWeight(0.11);
    var w = width / params.N;
    var dispersion = pow(sin(frameCount * 0.01) * 0.5 + 0.5, 3) * 1000;
    for (var i = 0; i < params.N; ++i) {
        for (var j = 0; j < params.N; ++j) {
            if (random() < 0.8) {
                ellipse((i + 0.5) * w + random(-dispersion, dispersion), (j + 0.5) * w + random(-dispersion, dispersion), w);
            }
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map