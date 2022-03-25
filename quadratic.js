function solveQuadratic(a, b, c) {
    const D = (Math.pow(b, 2)) - (4 * a * c);
    console.log(D, 'discriminant')
    if (D < 0) {
        //complex roots
        const rD = Math.sqrt(-D);
        let r1 = [];
        let r2 = [];
        if (Number.isInteger(rD)) {
            //D is a perfsq
            r1 = new frac([
                [-b, false],
                [rD, true]
            ], [
                [(2 * a)]
            ], true);
            r2 = new frac([
                [-b, false],
                [-rD, true]
            ], [
                [(2 * a)]
            ], true);
        } else if (Number.isInteger(D)) {
            // D is an integer
            let redD = reduceSqrt(-D);
            r1 = new frac([
                [-b],
                [redD, true, 'reduced']
            ], [
                [(2 * a)]
            ], true);
            let negRedD = [...redD];
            negRedD[0] = -negRedD[0];
            r2 = new frac([
                [-b],
                [negRedD, true, 'reduced']
            ], [
                [(2 * a)]
            ], true);
        } else {
            //discriminant is not an integer
            r1 = new frac([
                [-b],
                [rD, true]
            ], [
                [(2 * a)]
            ], true);
            r2 = new frac([
                [-b],
                [-rD, true]
            ], [
                [(2 * a)]
            ], true);
        }
        return ([r1, r2]);
    } else if (D === 0) {
        //roots are real and equal
        const tmp = new frac([-b / (2 * a)], [
            1
        ]);
        return ([tmp, 'equal roots']);
    } else {
        //roots are real and distinct
        const rD = Math.sqrt(D);
        if (Number.isInteger(rD)) {
            r1 = new frac([(-b + rD)], [(2 * a)]);
            r2 = new frac([(-b - rD)], [(2 * a)]);
        } else if (Number.isInteger(D)) {
            //D is an integer, but D^1/2 is not
            let redD = reduceSqrt(D);
            r1 = new frac([
                [-b],
                [
                    [...redD], false, 'reduced'
                ]
            ], [
                [(2 * a)]
            ], true);
            let negRedD = [...redD]
            negRedD[0] = -negRedD[0];
            r2 = new frac([
                [-b],
                [negRedD, false, 'reduced']
            ], [
                [(2 * a)]
            ], true);
        } else {
            //the discriminant is a decimal
            r1 = new frac([(-b + rD)], [(2 * a)]);
            r2 = new frac([(-b - rD)], [(2 * a)]);
        }
        return ([r1, r2]);
    }
}

function quadraticParse(form) {
    a = form.quadinp1.value;
    b = form.quadinp2.value;
    c = form.quadinp3.value;
    console.log(a, b, c)
    if (a == 0) {
        document.querySelector('#quadraticOut').innerHTML = "The coefficient of x<sup>2</sup> can't be 0!"
        return;
    }
    const roots = solveQuadratic(a, b, c);
    if (roots[1] === 'equal roots') {
        document.querySelector('#quadraticOut').innerHTML = `<div class = 'result'><h3>Root:</h3><strong class = 'root' data-ascii-math='${roots[0].stringify()}'>\`${roots[0].stringify()}\`</strong><br></div>`;
    } else {
        document.querySelector('#quadraticOut').innerHTML = `<div class = 'result'><h3>Roots:</h3><strong class = 'root' data-ascii-math='${roots[0].stringify()}'>\`${roots[0].stringify()}\`</strong>,<strong class = 'root' data-ascii-math='${roots[1].stringify()}'>\`${roots[1].stringify()}\`</strong><br></div>`;
    }

    document.querySelector('#quadraticOut').innerHTML += `<div class = 'result'><h3>Vertex:</h3><strong> \`(${-b/(2*a)} , ${-(b*b - 4*a*c) / (4 * a)})\`</strong></div>`
    document.querySelector('#quadraticOut').innerHTML += `<div class = 'result'><h3>Discriminant:</h3><strong> \`${(b*b - 4*a*c)}\`</strong></div>`
    addCtx('.root', 'data-ascii-math')
    let scale = graphQuadratic(a, b, c);
    MathJax.typeset();
}

function dynamicTyper(e, form) {
    if (e.key === 'Enter') { quadraticParse(form); return false; }
}


const viewBoxD = 398;
let totalD = 2000;

let id = [];
let mousePos = [];
let currViewBox = [totalD / 2 - viewBoxD / 2, totalD / 2 - viewBoxD / 2];
let limits = [0, totalD - viewBoxD]
const interval = 15;
let s = true;
let prevPos = [];
onmousemove = (e) => { mousePos = [e.clientX, e.clientY] }



function svgPanAbort() {
    while (id.length) {
        clearInterval(id.pop());
    }
    s = true;
}

function svgPanIni() {
    id.push(setInterval(svgPan, interval));
}

function svgPan() {

    if (s) {
        prevPos = [...mousePos]
    } else {
        currViewBox = [currViewBox[0] - 2 * (mousePos[0] - prevPos[0]), currViewBox[1] - 2 * (mousePos[1] - prevPos[1])];
        checkLimits();
        document.querySelector('#quadraticGraph').setAttribute("viewBox", `${currViewBox[0]} ${currViewBox[1]} ${viewBoxD} ${viewBoxD}`);
    }
    s = !s;
}

function checkLimits() {
    if (currViewBox[0] > limits[1]) {
        currViewBox[0] = limits[1];
    }
    if (currViewBox[0] < limits[0]) {
        currViewBox[0] = limits[0];
    }
    if (currViewBox[1] > limits[1]) {
        currViewBox[1] = limits[1];
    }
    if (currViewBox[1] < limits[0]) {
        currViewBox[1] = limits[0];
    }
    if (currViewBox[0] === NaN || currViewBox[1] === NaN) {
        currViewBox = [totalD / 2 - viewBoxD / 2, totalD / 2 - viewBoxD / 2];
    }
}

let aBak, bBak, cBak;

function graphQuadratic(a, b, c, GSF = null) {
    //get the curve element
    const curveEl = document.querySelector('#quadCurve');
    const label1 = document.querySelector('.graphLabel:nth-of-type(1)');
    const label2 = document.querySelector('.graphLabel:nth-of-type(2)');
    const marker1 = document.querySelector('.intersection:nth-of-type(1)');
    const marker2 = document.querySelector('.intersection:nth-of-type(2)');
    document.querySelector('#quadCurve').style.display = 'initial';
    label1.innerHTML = '';
    label2.innerHTML = '';
    marker1.style.display = 'none';
    marker2.style.display = 'none';
    const maxAbsY = totalD / 2;

    //if no values are specifies, use backup values
    if (a === null) {
        a = aBak;
        b = bBak;
        c = cBak;
    } else {
        aBak = a;
        bBak = b;
        cBak = c;
    }

    //compute the GSF if not specified
    if (GSF === null) {
        GSF = 100 //global scale factor
            //for my future self: the graph is 400*400px. For the initial scale, i choose 1 unit = 100px. that is where the GSF value came from. 
        if ((b * b - 4 * a * c) >= 0) {
            let dist = Math.abs(Math.sqrt(b * b - 4 * a * c) / a);
            if (dist === 0) {
                dist = Math.abs(-b / (2 * a)); //if the distance between the roots is 0, i.e, the vortex lies on the x axis, use the distance between the origin and the vortex to scale the parabola.
            }
            while (dist > 4) {
                // while the distance between the roots is greater than 4, reduce the size of the parabola
                GSF /= 10;
                dist /= 10;
            }
        } else {
            let test_vortex = [-b / (2 * a), -(b * b - 4 * a * c) / (4 * a)];
            while (test_vortex[0] >= 10 || test_vortex[0] <= -10 || test_vortex[1] >= 10 || test_vortex[1] <= -10) {
                GSF /= 10;
                test_vortex[0] /= 10;
                test_vortex[1] /= 10;
            }
        }
    }


    //scale the parabola using the GSF. took a while to figure this out.
    a /= GSF;
    c *= GSF;

    //calc the discriminant
    const D = b * b - 4 * a * c;

    //calc the vortex
    const vortex = [-b / (2 * a), -D / (4 * a)];


    //graph the parabola
    if (a > 0) {
        const c2 = c - maxAbsY;
        const point1 = (-b - Math.sqrt(b * b - 4 * a * c2)) / (2 * a);
        const point2 = (-b + Math.sqrt(b * b - 4 * a * c2)) / (2 * a);
        const ctx = vortex[0];
        const cty = -(2 * (maxAbsY - vortex[1]) - maxAbsY);
        // console.log(c2, point1, point2, ctx, cty);
        curveEl.setAttribute('d', `M${point1},${maxAbsY} Q${ctx},${cty} ${point2},${maxAbsY}`);
        if (D > 0) {
            const roots = [((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF)), (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF)];

            if (`${roots[0]}`.length > 4) {
                roots[0] = roots[0].toPrecision(4);
            }
            if (`${roots[1]}`.length > 4) {
                roots[1] = roots[1].toPrecision(4);
            }
            label1.innerHTML = Math.min(...roots);
            label1.setAttribute('x', Math.min(...roots) * GSF - 15);
            label1.setAttribute('y', 20);


            label2.innerHTML = Math.max(...roots);
            label2.setAttribute('x', Math.max(...roots) * GSF + 5);
            label2.setAttribute('y', -5);

        } else
        if (D === 0) {
            label1.innerHTML = vortex[0] / GSF;
            label1.setAttribute('x', vortex[0] + 5);
            label1.setAttribute('y', 20);
        } else {
            const vortex2 = [vortex[0] / GSF, vortex[1] / GSF]
            label1.innerHTML = `(${`${vortex2[0]}`.length > 4 ? (vortex2[0]).toPrecision(4) : vortex2[0]}, ${`${vortex2[1]}`.length > 4 ? (vortex2[1]).toPrecision(4) : vortex2[1]})`;
            label1.setAttribute('x', vortex[0] + 10);
            label1.setAttribute('y', -vortex[1] + 20);
        }
    } else if (a < 0) {
        const c2 = c + maxAbsY;
        //compute the bezier control points
        const point1 = (-b - Math.sqrt(b * b - 4 * a * c2)) / (2 * a);
        const point2 = (-b + Math.sqrt(b * b - 4 * a * c2)) / (2 * a);
        const ctx = vortex[0];
        const cty = 2 * (maxAbsY + vortex[1]) - maxAbsY;
        curveEl.setAttribute('d', `M${point1},${-maxAbsY} Q${ctx},${cty} ${point2},${-maxAbsY}`);
        if (D > 0) {
            const roots = [(-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF), (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF)];
            if (`${roots[0]}`.length > 4) {
                roots[0] = roots[0].toPrecision(4);
            }
            if (`${roots[1]}`.length > 4) {
                roots[1] = roots[1].toPrecision(4);
            }
            label1.innerHTML = Math.min(...roots);
            label1.setAttribute('x', Math.min(...roots) * GSF - 20);
            label1.setAttribute('y', 20);
            label2.innerHTML = Math.max(...roots);
            label2.setAttribute('x', Math.max(...roots) * GSF + 5);
            label2.setAttribute('y', -5);
        } else
        if (D === 0) {
            label1.innerHTML = vortex[0] / GSF;
            label1.setAttribute('x', vortex[0] + 5);
            label1.setAttribute('y', -5);
            label2.innerHTML = '';
        }else {
            const vortex2 = [vortex[0] / GSF, vortex[1] / GSF]
            label1.innerHTML = `(${`${vortex2[0]}`.length > 4 ? (vortex2[0]).toPrecision(4) : vortex2[0]}, ${`${vortex2[1]}`.length > 4 ? (vortex2[1]).toPrecision(4) : vortex2[1]})`;
            label1.setAttribute('x', vortex[0] + 10);
            label1.setAttribute('y', -vortex[1] -10);
        }
    }


    //place the point markers
    if (D > 0) {
        const roots = [((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF)), (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a * GSF)];
        marker1.setAttribute('cx', Math.min(...roots) * GSF);
        marker1.setAttribute('cy', 0);
        marker1.style.display = 'initial';
        marker2.setAttribute('cx', Math.max(...roots) * GSF);
        marker2.setAttribute('cy', 0);
        marker2.style.display = 'initial';
    } else if (D === 0) {
        marker1.setAttribute('cx', vortex[0]);
        marker1.setAttribute('cy', 0);
        marker1.style.display = 'initial';
    } else {
        marker1.setAttribute('cx', vortex[0]);
        marker1.setAttribute('cy', vortex[1]);
        marker1.style.display = 'initial';
    }

    //adjust the viewbox to focus on the parabola
    if (D >= 0) {
        currViewBox = [totalD / 2 + vortex[0] - viewBoxD / 2, totalD / 2 - viewBoxD / 2];
    } else {
        currViewBox = [totalD / 2 + vortex[0] - viewBoxD / 2, totalD / 2 - vortex[1] - viewBoxD / 2];
    }

    //check if the viewbox is going beyond the graph
    checkLimits();

    document.querySelector('#quadraticGraph').setAttribute("viewBox", `${currViewBox[0]} ${currViewBox[1]} ${viewBoxD} ${viewBoxD}`);
    document.querySelector('#quadScaleValue').innerHTML = ` = ${(1/GSF * 100)/10}`;
    document.querySelector('#quadScale').style.display = 'initial';
    return GSF;
}




function quadraticReset() {
    document.querySelector("#quadraticOut").innerHTML = "";
    document.querySelector('#quadScale').style.display = 'none';
    document.querySelector('#quadCurve').style.display = 'none';
    document.querySelector('.graphLabel:nth-of-type(1)').innerHTML = '';
    document.querySelector('.graphLabel:nth-of-type(2)').innerHTML = '';
    document.querySelector('.intersection:nth-of-type(1)').style.display = 'none';
    document.querySelector('.intersection:nth-of-type(2)').style.display = 'none';
}