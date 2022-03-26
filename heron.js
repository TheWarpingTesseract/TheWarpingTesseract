const triangleCalcFields = [
    'triangleForma', 'triangleFormb', 'triangleFormc',
    'triangleFormA', 'triangleFormB', 'triangleFormC',
    'triangleFormma', 'triangleFormmb', 'triangleFormmc',
    'triangleFormha', 'triangleFormhb', 'triangleFormhc',
    'triangleFormia', 'triangleFormib', 'triangleFormic',
    'triangleFormea', 'triangleFormeb', 'triangleFormec',
    'triangleFormpm', 'triangleFormir', 'triangleFormcr',
    'triangleFormarea'
];
const sigDigits = 5;
const userInputTriCalc = {};
const triangleGraphDimensions = [600, 400];
// const triangleGraph = document.querySelector('#triangleAppWrapper svg');
// triangleGraph.setAttribute('width', triangleGraphDimensions[0]);
// triangleGraph.setAttribute('height', triangleGraphDimensions[1]);
// triangleGraph.setAttribute('viewBox', `0 0 ${triangleGraphDimensions[0]} ${triangleGraphDimensions[1]}`);


//the "main" guy
function triangleCalc(form, editedField) {
    hideTriangleErr();
    console.log('---------------------------------------------')
    const el = document.querySelector('#triangleCalcOut');
    el.innerHTML = "";

    const sides = [];
    const angles = [];
    const medians = [];
    const heights = [];
    const angleBisectors = [];
    const exRadii = [];
    const perimeter = [];
    const inRadius = [];
    const circumRadius = [];
    const area = [];

    let givenSides;
    let givenAngles;
    let givenMedians;
    let givenHeights;
    let givenAngleBisectors;
    let givenExRadii;

    let foundTriangle = false;

    //keep a record of user given fields
    if (form[triangleCalcFields[editedField]].value) {
        userInputTriCalc[`${editedField}`] = true;
    } else {
        userInputTriCalc[`${editedField}`] = false;
    }
    const available = []; //keeps a record of the indices of every available value

    //organize parameters
    const paramOrder = [
        [sides, 3, 'givenSides'],
        [angles, 3, 'givenAngles'],
        [medians, 3, 'givenMedians'],
        [heights, 3, 'givenHeights'],
        [angleBisectors, 3, 'givenAngleBisectors'],
        [exRadii, 3, 'givenExRadii'],
        [perimeter, 1],
        [inRadius, 1],
        [circumRadius, 1],
        [area, 1]
    ]

    //quick function to calculate the base index of any param set
    function calcBaseIndex(el) {
        let counter = 0;
        for (i = 0; i < el; i++) {
            counter += paramOrder[i][1]
        }
        return counter;
    }

    //fetch values from the form and assign them to local variables
    let triangleCalcFieldsIndex = 0;
    for (let i = 0; i < paramOrder.length; i++) {
        const param = paramOrder[i][0];
        const subParams = paramOrder[i][1];
        for (let j = 0; j < subParams; j++) {
            param[j] = parseFloat(form[triangleCalcFields[triangleCalcFieldsIndex]].value);
            if (param[j]) {
                //collect the indices of all given fields
                available.push(triangleCalcFieldsIndex);
            }
            triangleCalcFieldsIndex++;
        }

        // collect all the sides and angles given by the user(not computed)
        if (subParams > 1) {
            let givenParams = paramOrder[i][2];
            eval(`${givenParams} = anyXFinite(1, ${JSON.stringify(param)})`);
            eval(`if(${givenParams}){${givenParams} = ${givenParams}.filter(x => !isComputed(x + (${triangleCalcFieldsIndex - subParams})))}`);

            //////////Basic eval template//////////
            // let givenAngles = anyXFinite(1, angles);
            // if (givenAngles)
            // givenAngles = givenAngles.filter(x => !isComputed(x + 3));
        }
    }

    //color the user provided inputs 
    for (let field in triangleCalcFields) {
        if (parseFloat(form[triangleCalcFields[field]].value)) {
            if (!document.querySelector(`#${triangleCalcFields[field]} + label`).classList.contains("computed")) {
                document.querySelector(`#${triangleCalcFields[field]} + label`).classList.add("userProvided")
            } else {
                document.querySelector(`#${triangleCalcFields[field]} + label`).classList.remove("userProvided");
            }
        } else {
            document.querySelector(`#${triangleCalcFields[field]} + label`).classList.remove("userProvided");
        }
    }


    //perform basic checks
    if ([...sides, ...angles].indexOf(0) > -1) {
        showTriangleErr("A side or angle can't have a magnitude of zero.");
        return;
    }
    if (givenAngles) {
        for (i = 0; i < givenAngles.length; i++) {
            if (angles[givenAngles[i]] >= 180) {
                showTriangleErr("No angle can be greater than 180 degrees.");
                return;
            }
            if (givenAngles.length > 1 && angles[givenAngles[i]] + angles[givenAngles[(i + 1) % givenAngles.length]] >= 180) {
                showTriangleErr("No two angles can have a sum of 180 degrees or more.");
                return;
            }
        }
    }
    if (givenExRadii && inRadius) {
        for (let i in givenExRadii) {
            if (inRadius >= exRadii[givenExRadii[i]]) {
                showTriangleErr("An ex-radius must be greater then the in-radius.");
                return;
            }
        }
    }



    //start to check for the applicability of formulae
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //hero's formula
    if (givenSides.length === 3) {
        console.log("Trying hero")
        const status = calcTriangleProperties(0, 1, 2);
        if (status == 'OK') {
            foundTriangle = true;
            updForm();
        } else {
            showTriangleErr(status);
            return;
        }
    }

    //ASA. Also computes the third angle given two.
    if (!foundTriangle && givenAngles.length >= 2) {
        console.log("calculating third angle");
        angles[[0, 1, 2].filter(x => !givenAngles.includes(x))] = 180 - angles[givenAngles[0]] - angles[givenAngles[1]];
        updForm(3, 4, 5)
        if (givenSides && givenSides.length) {
            //calculate the two unknown sides using the sine rule
            sides[(givenSides[0] + 1) % 3] = sineRuleSide(angles[givenSides[0]], angles[(givenSides[0] + 1) % 3], sides[givenSides[0]])
            sides[(givenSides[0] + 2) % 3] = sineRuleSide(angles[(givenSides[0] + 1) % 3], angles[(givenSides[0] + 2) % 3], sides[(givenSides[0] + 1) % 3])
            calcTriangleProperties(0, 1, 2, 3, 4, 5);
            foundTriangle = true;
            updForm();
        }
    }

    //RHS
    if (!foundTriangle && angles.indexOf(90) > -1 && givenSides.length >= 2) {
        const hyp = angles.indexOf(90); //the same index can be used to refer to the right angle and the hypotenuse
        console.log("trying RHS");
        if (sides[hyp] && !isComputed(hyp) && ((Math.max(sides[givenSides[0]], sides[givenSides[1]]) !== sides[hyp]) || sides[givenSides[0]] == sides[givenSides[1]])) {
            showTriangleErr('The hypotenuse has to be the greatest side in a right triangle.');
            return;
        }
        const legs = [];
        if (sides[hyp] && !isComputed(hyp)) {
            legs[0] = givenSides.filter(x => ![hyp].includes(x))[0]; //index of the known leg
            legs[1] = [0, 1, 2].filter(x => !givenSides.includes(x))[0]; //index of the unknown leg
            sides[legs[1]] = Math.sqrt(Math.pow(sides[hyp], 2) - Math.pow(sides[legs[0]], 2))
        } else {
            legs[0] = givenSides[0]
            legs[1] = givenSides[1]
            sides[hyp] = Math.sqrt(Math.pow(sides[legs[0]], 2) + Math.pow(sides[legs[1]], 2));
        }
        calcTriangleProperties(0, 1, 2, (hyp + 3));
        foundTriangle = true;
        updForm();
    }

    //SAS
    if (!foundTriangle && givenSides.length === 2 && givenAngles.length === 1) {
        console.log("trying SAS");
        for (let angle in givenAngles) {
            //calculate the indices of the sides which include the angle
            const difference = [0, 1, 2].filter(x => ![givenAngles[angle]].includes(x));
            //if the two required sides exits, use SAS
            if (sides[difference[0]] && sides[difference[1]] && JSON.stringify(difference.sort()) === JSON.stringify(givenSides.sort())) {
                sides[givenAngles[angle]] = cosineRuleSide(sides[difference[0]], sides[difference[1]], angles[givenAngles[angle]]);
                calcTriangleProperties(0, 1, 2, givenAngles[angle] + 3);
                foundTriangle = true;
                updForm();
                break;
            }
        }
    }

    //3 ex-radii are given
    if (!foundTriangle && givenExRadii.length === 3) {
        console.log("giving exradii a shot");
        inRadius[0] = (1 / ((1 / exRadii[0]) + (1 / exRadii[1]) + (1 / exRadii[2])));
        area[0] = new frac([Math.sqrt(inRadius[0] * exRadii[0] * exRadii[1] * exRadii[2])], [1]);
        perimeter[0] = (exRadii[0] * exRadii[1] * exRadii[2]) / area[0].value() * 2;
        for (let i = 0; i < 3; i++)
            sides[i] = (exRadii[i] * (perimeter[0] / 2) - area[0].value()) / exRadii[i];
        if (!(sides[0] > 0 && sides[1] > 0 && sides[2] > 0)) {
            showTriangleErr("A triangle cannot be constructed with the given values.");
            return;
        } else {
            calcTriangleProperties(0, 1, 2, 15, 16, 17, 18, 19, 21);
            foundTriangle = true;
            updForm();
        }
    }

    //3 medians formula
    if (!foundTriangle && givenMedians.length === 3) {
        console.log("three medians? you definitely cant make anything out of that...")
        area[0] = heron(...medians);
        if (typeof(area[0]) === "object") {
            area[0].multiply(new frac(
                [4], [3]
            ));
            const midAngle = [];
            console.log(area[0].stringify());
            for (let i = 0; i < 3; i++) {
                midAngle[i] = 180 - Math.asin((3 * area[0].value()) / (2 * medians[(i + 1) % 3] * medians[(i + 2) % 3])) * 180 / Math.PI
            }
            for (let i = 0; i < 3; i++) {
                sides[i] = cosineRuleSide(medians[(i + 1) % 3] * 2 / 3, medians[(i + 2) % 3] * 2 / 3, midAngle[i]);
            }
            calcTriangleProperties(0, 1, 2, 6, 7, 8, 21);
            foundTriangle = true;
            updForm();
        } else {
            showTriangleErr(area[0]);
            return;
        }
    }

    //3 heights given
    if (!foundTriangle && givenHeights.length === 3) {
        console.log(heights, "whoa! 3 heights!")
        const heightsInv = [(1 / heights[0]), (1 / heights[1]), (1 / heights[2])]
        area[0] = heron(...heightsInv);
        if (typeof(area[0]) === "object") {
            area[0].reciprocal();
            area[0].multiply(new frac([1], [4]));
            for (let i = 0; i < 3; i++) {
                sides[i] = (2 * area[0].value()) / heights[i];
            }
            calcTriangleProperties(0, 1, 2, 9, 10, 11, 21);
            foundTriangle = true;
            updForm();
        } else {
            showTriangleErr(area[0]);
            return;
        }
    }

    //3 angle bisectors given
    ///////////////////////////////////

    //2 heights and the remaining angle are given
    if (!foundTriangle && givenHeights.length === 2 && givenAngles.length > 0) {
        console.log("Captured 2 heights and an angle.")
        for (let angle in givenAngles) {
            angle = givenAngles[angle];
            console.log(angles);
            const difference = [0, 1, 2].filter(x => ![angle].includes(x));
            console.log(difference);
            if (heights[difference[0]] && heights[difference[1]] && JSON.stringify(difference.sort()) === JSON.stringify(givenHeights.sort())) {
                area[0] = new frac([(heights[difference[0]] * heights[difference[1]]) / (2 * Math.sin(angles[angle] * Math.PI / 180))], [1]);
                heights[angle] = (1 / (Math.sqrt((1 / Math.pow(heights[difference[0]], 2)) + (1 / Math.pow(heights[difference[1]], 2)) - (2 * Math.cos(angles[angle] * Math.PI / 180) / (Math.pow(heights[difference[1]], 2) * Math.pow(heights[difference[0]], 2))))))
                for (let i = 0; i < 3; i++) {
                    sides[i] = (2 * area[0].value()) / heights[i];
                }
                calcTriangleProperties(0, 1, 2, (angle + 3), 9, 10, 11, 21);
                foundTriangle = true;
                updForm();
            }
        }
    }


    //add more triangle completion methods here!


    //show the area in a fancy form
    if (foundTriangle) {
        el.innerHTML = `Area: \`${area[0].stringify()}\``;
        hideTriangleErr();
        MathJax.typeset();
    }

    //update the form
    function updForm(...toUpdateIndices) {
        //determine which fields are to be updated.
        const toUpdate = []
        let updAll = false;
        if (toUpdateIndices.length == 0) updAll = true
        for (i = 0; i < triangleCalcFields.length; i++) {
            if (updAll || toUpdateIndices.indexOf(i) > -1) {
                toUpdate[i] = true;
            } else {
                toUpdate[i] = false;
            }
        }

        // the userInputTriCalc object contains the indices of the inputs provided by the user. the rest can be marked as computer generated
        for (let field = 0; field < triangleCalcFields.length; field++) {
            if (toUpdate[field]) {
                if (field < 3) {
                    form[triangleCalcFields[field]].value = sides[field];
                } else if (field < 6) {
                    form[triangleCalcFields[field]].value = angles[field % 3];
                } else if (field < 9) {
                    form[triangleCalcFields[field]].value = medians[field % 3]
                } else if (field < 12) {
                    form[triangleCalcFields[field]].value = heights[field % 3]
                } else if (field < 15) {
                    form[triangleCalcFields[field]].value = angleBisectors[field % 3]
                } else if (field < 18) {
                    form[triangleCalcFields[field]].value = exRadii[field % 3]
                }
                if (field == 18)
                    form[triangleCalcFields[field]].value = perimeter[0];
                if (field == 19)
                    form[triangleCalcFields[field]].value = inRadius[0];
                if (field == 20)
                    form[triangleCalcFields[field]].value = circumRadius[0];
                if (field == 21)
                    form[triangleCalcFields[field]].value = area[0].value();
                if (!userInputTriCalc[`${field}`]) {
                    document.querySelector(`#${triangleCalcFields[field]} + label`).classList.add('computed');
                    document.querySelector(`#${triangleCalcFields[field]}`).disabled = true;
                } else {
                    document.querySelector(`#${triangleCalcFields[field]} + label`).classList.remove('computed');
                    document.querySelector(`#${triangleCalcFields[field]}`).disabled = false;
                }
            }
        }

        if (toUpdate.indexOf(false) < 0) {
            // if the entire triangle is known, plot it.
            document.querySelector('.triangleWelcomeMessageWrapper').style.display = 'none';
            calcTriangleCoordinates([...sides], [...angles], area[0].value());
        }
    }

    //calculate triangle properties
    function calcTriangleProperties(...ignore) {
        //determine what is to be calculated
        const toCalc = []
        for (let i = 0; i < triangleCalcFields.length; i++) {
            if (ignore.indexOf(i) > -1) {
                toCalc[i] = false;
            } else {
                toCalc[i] = true;
            }
        }

        //calculate the area first, since it is useful in calculating a bunch of other stuff
        if (toCalc[21]) {
            area[0] = heron(...sides);
            console.log(area[0], typeof(area[0]))
            if (typeof(area[0]) !== "object") {
                return area[0];
            }
        }
        const area1 = area[0].value();

        for (let i = 0; i < 3; i++) {
            if (toCalc[i + 3])
                angles[i] = cosineRuleAngle(sides[i], sides[(i + 1) % 3], sides[(i + 2) % 3]);
            if (toCalc[i + 6])
                medians[i] = Math.sqrt((Math.pow(sides[(i + 1) % 3], 2) + Math.pow(sides[(i + 2) % 3], 2) - (Math.pow(sides[i], 2) / 2)) / 2);
            if (toCalc[i + 9])
                heights[i] = 2 * area1 / sides[i];
            if (toCalc[i + 12])
                angleBisectors[i] = Math.sqrt(sides[(i + 1) % 3] * sides[(i + 2) % 3] * (1 - Math.pow((sides[i] / (sides[(i + 1) % 3] + sides[(i + 2) % 3])), 2)));
            if (toCalc[i + 15])
                exRadii[i] = area1 / ((sides[0] + sides[1] + sides[2]) / 2 - sides[i]);
        }
        if (toCalc[18])
            perimeter[0] = sides[0] + sides[1] + sides[2];
        if (toCalc[19])
            inRadius[0] = 2 * area1 / perimeter;
        if (toCalc[20])
            circumRadius[0] = sides[0] * sides[1] * sides[2] / (4 * area1);
        console.log(angles);
        return "OK";
    }
}



//graph functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//calculates the coordinates of a triangle which can be plotted given the sides, angles, and area.
function calcTriangleCoordinates(sides, angles, area) {
    const graphD = [6, 4];
    const scaleFactor = 0.9;
    const pixelScaleFactor = 100;
    const A = [];
    const B = [];
    const C = [];

    //record the longest side, and the height from that side.
    // the longest side will be placed parallel to the X axis
    // the longest side and the height along with the other sides should be scaled down to fit within the canvas, if required
    let lSide = sides.indexOf(Math.max(...sides));
    console.log(lSide);
    let lSideHeight = 2 * area / sides[lSide];

    //scale small triangles up until they take up an appreciable amount of space. 

    while (sides[lSide] / scaleFactor < (graphD[0] - 0.6) && lSideHeight / scaleFactor < (graphD[1] - 0.6)) {
        lSideHeight /= scaleFactor;
        sides[lSide] /= scaleFactor;
        sides[(lSide + 2) % 3] /= scaleFactor;
    }
    //downsize large triangles until they fit within the dimensions of the canvas
    while (sides[lSide] >= (graphD[0] - 0.6) || lSideHeight >= (graphD[1] - 0.6)) {
        lSideHeight *= scaleFactor;
        sides[lSide] *= scaleFactor;
        sides[(lSide + 2) % 3] *= scaleFactor;
    }

    baseHeight = (graphD[1] - lSideHeight) / 2

    B[0] = -sides[lSide] / 2 * pixelScaleFactor;
    B[1] = baseHeight * pixelScaleFactor

    C[0] = sides[lSide] / 2 * pixelScaleFactor;
    C[1] = baseHeight * pixelScaleFactor

    A[0] = sides[(lSide + 2) % 3] * Math.cos(angles[(lSide + 1) % 3] * Math.PI / 180) * pixelScaleFactor + B[0];
    A[1] = lSideHeight * pixelScaleFactor + baseHeight * pixelScaleFactor;


    const ACxDist = Math.abs(A[0] - C[0]);
    const ABxDist = Math.abs(A[0] - B[0]);
    console.log(ACxDist, ABxDist);


    const maxAngleIndex = angles.indexOf(Math.max(...angles))
    let finalOrder = [0, 0, 0];
    finalOrder[maxAngleIndex] = A;
    const otherAngles = [0, 1, 2].filter(x => ![maxAngleIndex].includes(x))
    let newMaxAngle = Math.max(angles[otherAngles[0]], angles[otherAngles[1]]);
    for (let i = 0; i < angles.length; i++) {
        if (angles[i] === newMaxAngle && i !== maxAngleIndex) {
            maxAngleIndex2 = i;
        }
    }
    if (ACxDist > ABxDist) {
        finalOrder[maxAngleIndex2] = B;
        finalOrder[[0, 1, 2].filter(x => ![maxAngleIndex, maxAngleIndex2].includes(x))] = C;
    } else {
        finalOrder[maxAngleIndex2] = C;
        finalOrder[[0, 1, 2].filter(x => ![maxAngleIndex, maxAngleIndex2].includes(x))] = B;
    }
    plotTriFromCo(...finalOrder);
}

//plot triangle on the graph
function plotTriFromCo(A, B, C, name = "ABC") {
    let order = [A, B, C, A]
    clearTriangleGraph();
    for (i = 0; i <= 2; i++) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("stroke", "red");
        line.setAttribute("stroke-width", "2px");
        line.setAttribute("x1", `${order[i][0]}`);
        line.setAttribute("y1", `${order[i][1]}`);
        line.setAttribute("x2", `${order[i+1][0]}`);
        line.setAttribute("y2", `${order[i+1][1]}`);
        document.querySelector("#triangleContainer").appendChild(line);
    }
    labelPoints(A, B, C, name);
}

//label the points of the triangle
function labelPoints(A, B, C, name) {
    name = name.slice(1) + name[0];
    const distance = 15;
    const points = [A, B, C];
    const slopes = [];
    const bisectorSlope = [];
    const equations = [];
    const centroid = findCentroid(...points);
    const labels = []
    for (let i = 0; i < points.length; i++) {
        slopes[i] = (points[(i + 1) % 3][1] - points[i][1]) / (points[(i + 1) % 3][0] - points[i][0])
        if (Number.isFinite(slopes[i])) {
            equations.push([slopes[i], -1, (points[i][1] - slopes[i] * points[i][0])])
        } else {
            equations.push([1, 0, -points[i][0]])
        }
    }
    for (let i = 0; i < slopes.length; i++) {
        const A1 = equations[i][0];
        const B1 = equations[i][1];
        const C1 = equations[i][2];
        const const1 = Math.sqrt(Math.pow(A1, 2) + Math.pow(B1, 2));

        const A2 = equations[(i + 1) % 3][0];
        const B2 = equations[(i + 1) % 3][1];
        const C2 = equations[(i + 1) % 3][2];
        const const2 = Math.sqrt(Math.pow(A2, 2) + Math.pow(B2, 2));

        const A3 = equations[(i + 2) % 3][0];
        const B3 = equations[(i + 2) % 3][1];
        const C3 = equations[(i + 2) % 3][2];

        // console.log(A1, B1, C1, A2, B2, C2);
        // console.log(const1, const2, "const")
        const Ab1 = (A1 / const1 + A2 / const2);
        const Bb1 = (B1 / const1 + B2 / const2);
        const Cb1 = (C1 / const1 + C2 / const2);
        const Ab2 = (A1 / const1 - A2 / const2);
        const Bb2 = (B1 / const1 - B2 / const2);
        const Cb2 = (C1 / const1 - C2 / const2); // there are two possible angle bisectors

        // console.log(Ab1, Bb1, Cb1, Ab2, Bb2, Cb2, "####")
        const slope1 = (-Ab1 / Bb1);
        const slope2 = (-Ab2 / Bb2);
        const slopesb = [slope1, slope2];
        // console.log(slope1, slope2, "slope");

        let sol1 = solveLinear(A3, B3, C3, Ab1, Bb1, Cb1);
        let use = 1
        if (checkBetween(points[i][0], sol1[0], points[(i + 2) % 3][0]) && checkBetween(points[i][1], sol1[1], points[(i + 2) % 3][1])) {
            // console.log("sol1 ok");
            use = 0;
        }

        //test
        let testx1, testy1, testx2, testy2;
        if (Number.isFinite(slope1) && Number.isFinite(slope2)) {
            testx1 = points[(i + 1) % 3][0] + (distance / Math.sqrt(1 + Math.pow(slopesb[use], 2)));
            testy1 = points[(i + 1) % 3][1] + (distance * slopesb[use] / Math.sqrt(1 + Math.pow(slopesb[use], 2)));
            testx2 = points[(i + 1) % 3][0] - (distance / Math.sqrt(1 + Math.pow(slopesb[use], 2)));
            testy2 = points[(i + 1) % 3][1] - (distance * slopesb[use] / Math.sqrt(1 + Math.pow(slopesb[use], 2)));
        } else { // to handle the exception of one of the slopes being infinity, or the line being vertically straight
            testx1 = points[(i + 1) % 3][0]; // x value stays the same for both points, as the line is vertical
            testy1 = points[(i + 1) % 3][1] + distance;
            testx2 = points[(i + 1) % 3][0];
            testy2 = points[(i + 1) % 3][1] - distance;
        }
        if (computeDistance(centroid, [testx1, testy1]) < computeDistance(centroid, [testx2, testy2])) {
            testx1 = testx2;
            testy1 = testy2;
        }

        // let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        // line.setAttribute("stroke", "red");
        // line.setAttribute("stroke-width", "2px");
        // line.setAttribute("x1", `${testx1}`);
        // line.setAttribute("y1", `${testy1}`);
        // line.setAttribute("x2", `${points[(i + 1) % 3][0]}`);
        // line.setAttribute("y2", `${points[(i + 1) % 3][1]}`);
        // document.querySelector("#triangleContainer").appendChild(line);

        labels[i] = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labels[i].classList.add('triangleLabel');
        labels[i].setAttribute('x', testx1 - 7);
        labels[i].setAttribute('y', -testy1 + 6);
        labels[i].innerHTML = name[i];
        document.querySelector("#triangleContainer").appendChild(labels[i]);
    }
}



//Special formulae
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//apply the heron's formula
function heron(a, b, c) {
    let s = ((a + b + c) / 2);
    let area = s * (s - a) * (s - b) * (s - c); // actual area is this ^1/2
    console.log(s, area);
    if (area <= 0) {
        return 'This triangle cannot exist on a two dimensional plane.'; // return error message
    } else {
        if (Number.isInteger(area)) { // if the area(squared) is an integer
            let area1 = reduceSqrt(area); // attempt to take its root and reduce it
            if (area1 === 'x002') {
                //the number happens to be a prefect square. yay!
                return new frac([
                    Math.sqrt(area)
                ], [1]);
            } else if (area1 === 'x003') {
                //the radical is irreducible, just display it under a root as you cant do anything else
                el.innerHTML += `sqrt(${area}) sq. units`;
                return new frac([
                    [
                        [1, Math.sqrt(area)], false, "reduced"
                    ]
                ], [
                    [1]
                ], true);
            } else {
                //the radical was reduced
                return new frac([
                    [area1, false, "reduced"]
                ], [
                    [1]
                ], true);
            }
        } else {
            // if the area(squared) is not integer
            //build a new fraction with the number as the numerator and 1 as the denominator. the constructor function will automatically remove decimal places and reduce the fraction
            let areaF = new frac([
                [area]
            ], [
                [1]
            ]);

            if (areaF.n < 123123123123) {
                const n = parseErrorsSqrt(reduceSqrt(areaF.n), areaF.n);
                const d = parseErrorsSqrt(reduceSqrt(areaF.d), areaF.d);
                let areaF2 = new frac([
                    [n, false, isReduced(n)]
                ], [
                    [d, false, isReduced(d)]
                ], true);
                return areaF2;
            }
            return new frac([
                [Math.sqrt(area).toPrecision(5)]
            ], [1], false);
        }
    }
}

function absinx(a, b, C) {
    return (0.5 * a * b * Math.sin(Math.PI * C / 180));
}

function findCentroid(A, B, C) {
    return ([(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]);
}

function computeDistance(A, B) {
    return (Math.sqrt(Math.pow((A[0] - B[0]), 2) + Math.pow((A[1] - B[1]), 2)));
}

function solveLinear(a1, b1, c1, a2, b2, c2) {
    return [(b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1), (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1)];
}

function cosineRuleAngle(a, b, c) {
    return (Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)) * 180 / Math.PI)
}

function cosineRuleSide(a, b, C) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * Math.cos(C * Math.PI / 180))
}

function sineRuleAngle(a, b, A) {
    return (Math.asin(b * Math.sin(A * Math.PI / 180) / a))
}

function sineRuleSide(A, B, a) {
    return (Math.sin(B * Math.PI / 180) * a / Math.sin(A * Math.PI / 180))
}

function checkBetween(a, b, c) {
    if (a <= b && b <= c) {
        return true
    }
    if (c <= b && b <= a) {
        return true
    }
    return false;
}



//reset and cleanup functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//resets the form
function triangleCalcReset() {
    const el = document.querySelector('#triangleCalcOut');
    let a = Math.floor(Math.random() * textFaces.length)
    document.querySelector('#triangleTextFace').innerHTML = textFaces[a]
    document.querySelector('.triangleWelcomeMessageWrapper').style.display = 'flex';
    el.innerHTML = "";
    form = document.querySelector('#triangleForm');
    for (let field in triangleCalcFields) {
        form[triangleCalcFields[field]].value = '';
        document.querySelector(`#${triangleCalcFields[field]} + label`).setAttribute('class', '');
        document.querySelector(`#${triangleCalcFields[field]}`).disabled = false;
    }
    for (let i = 0; i < triangleCalcFields.length; i++) {
        userInputTriCalc[`${i}`] = false;
    }
    clearTriangleGraph();
    hideTriangleErr();
}
triangleCalcReset();

//clear all computed feilds
function triangleCalcComputedReset() {
    el.innerHTML = "";
    for (let field in triangleCalcFields) {
        if (document.querySelector(`#${triangleCalcFields[field]} + label`).classList.contains("computed")) {
            form[triangleCalcFields[field]].value = '';
            document.querySelector(`#${triangleCalcFields[field]} + label`).classList.remove("computed");
        }
    }
}

//clear the graph
function clearTriangleGraph() {
    document.querySelector("#triangleContainer").innerHTML = '';
}



//Error handling 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//display an error
function showTriangleErr(err) {
    document.querySelector('.triangleWelcomeMessageWrapper').style.display = 'none';
    document.querySelector('#triangleContainer').classList.add('triangleBlur');
    document.querySelector('.triangleErrorMessage').innerHTML = err;
    document.querySelector('.triangleError').classList.add('triangleErrorVisible');
    triangleCalcComputedReset()
}

//hide any error
function hideTriangleErr() {
    document.querySelector('#triangleContainer').classList.remove('triangleBlur');
    document.querySelector('.triangleError').classList.remove('triangleErrorVisible');
}



//misc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function anyXFinite(noFinite, args) {
    const finite = []
    for (let i = 0; i < args.length; i++) {
        if (args[i]) {
            finite.push(i);
        }
    }
    if (finite.length >= noFinite) {
        return finite
    }
    return false;
}

function isComputed(...args) {
    for (let field = 0; field < args.length; field++) {
        if (document.querySelector(`#${triangleCalcFields[args[field]]} + label`).classList.contains("computed")) {
            return true;
        }
    }
    return false;
}

function sigFigs(n) {
    return parseFloat(n.toFixed(sigDigits));
}

document.querySelector('#triangleContainer').classList.add('blur');

//switching between degrees and radians
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let useDeg = true

function degRadSwitch() {
    const degSw = document.querySelector('.triangleDegRadSwitcher span:first-of-type');
    const radSw = document.querySelector('.triangleDegRadSwitcher span:last-of-type');
    const form = document.querySelector('#triangleForm');
    const angles = [form[triangleCalcFields[3]].value, form[triangleCalcFields[4]].value, form[triangleCalcFields[5]].value];
    useDeg = !useDeg;
    if (useDeg) {
        degSw.classList.add('active');
        radSw.classList.remove('active');
    } else {
        radSw.classList.add('active');
        degSw.classList.remove('active');
    }
    for (angle in angles) {
        if (angles[angle]) {
            form[triangleCalcFields[3 + parseInt(angle)]].value = `${angles[angle]/180}`
        }
    }
}