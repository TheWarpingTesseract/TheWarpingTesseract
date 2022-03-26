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
const triangleForm = document.querySelector('#triangleForm');

const numFields = triangleCalcFields.length
const userProvided = [];
const computed = [];
const parseError = [];
const parseErrorCount = [];

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

const givenSides = [];
const givenAngles = [];
const givenMedians = [];
const givenHeights = [];
const givenAngleBisectors = [];
const givenExRadii = [];

const paramOrder = [
    [sides, 3, givenSides, 'sides'],
    [angles, 3, givenAngles, 'angles'],
    [medians, 3, givenMedians, 'medians'],
    [heights, 3, givenHeights, 'heights'],
    [angleBisectors, 3, givenAngleBisectors, 'angleBisectors'],
    [exRadii, 3, givenExRadii, 'exRadii'],
    [perimeter, 1, null, 'perimeter'],
    [inRadius, 1, null, 'inRadius'],
    [circumRadius, 1, null, 'circumRadius'],
    [area, 1, null, 'area']
]

const lastSubParamIndex = 17 //the index of the last ex radius parameter. 

const triangleUserConfig = {
    useDeg: true,
    useDec: true
}

//the "main" guy
function triangleCalc(editedField) {
    // console.log('---------------------------------------------');
    // console.log(editedField);
    const form = triangleForm;

    const editedValue = form[triangleCalcFields[editedField]].value
    // console.log(editedValue)
    userProvided[editedField] = Boolean(editedValue.length)
    if (!Boolean(editedValue.length)) parseError[editedField] = false

    let fieldCounter = 0;
    if (userProvided[editedField]) {
        for (let param of paramOrder) {
            fieldCounter += param[1]
            if (fieldCounter > editedField) {
                const parsed = parseExp(editedValue)
                if (parsed) {
                    parseError[editedField] = false;
                    if (editedField <= lastSubParamIndex) {
                        param[0][editedField % 3] = parsed;
                    } else {
                        param[0][0] = parsed;
                    }
                } else {
                    parseError[editedField] = true;
                    colorFields();
                    return;
                }
                break;
            }
        }
    }
    colorFields();
}

function colorFields() {
    for (let i = 0; i < numFields; i++) {
        const label = document.querySelector(`#${triangleCalcFields[i]} + label`)
        if (parseError[i]) {
            parseErrorCount[i]++;
            const confirm = parseErrorCount[i];
            setTimeout(() => {
                if (parseError[i] && parseErrorCount[i] == confirm) {
                    label.classList.remove('userProvided');
                    label.classList.add('warn');
                }
            }, 2000);
        } else {
            parseErrorCount[i] = 0;
            label.classList.remove('warn');
            if (userProvided[i]) {
                label.classList.remove('computed');
                label.classList.add('userProvided');
            } else
                if (computed[i]) {
                    label.classList.remove('userProvided');
                    label.classList.add('computed');
                } else {
                    label.classList.remove('userProvided');
                    label.classList.remove('computed');
                }
        }
    }
}

function degRadSwitch() {
    triangleUserConfig.useDeg = !triangleUserConfig.useDeg;
    flipSwitch(triangleUserConfig.useDeg,
        '#triangleAppWrapper .Switcher:nth-child(1) span:nth-child(1)',
        '#triangleAppWrapper .Switcher:nth-child(1) span:nth-child(2)')
}

function decimalExpSwitch() {
    triangleUserConfig.useDec = !triangleUserConfig.useDec;
    flipSwitch(triangleUserConfig.useDec,
        '#triangleAppWrapper .Switcher:nth-child(2) span:nth-child(1)',
        '#triangleAppWrapper .Switcher:nth-child(2) span:nth-child(2)')
}

function triangleCalcReset() {
    let a = Math.floor(Math.random() * textFaces.length)
    document.querySelector('#triangleTextFace').innerHTML = textFaces[a]
    document.querySelector('.triangleWelcomeMessageWrapper').style.display = 'flex';
    const form = triangleForm;
    for (let field in triangleCalcFields) {
        form[triangleCalcFields[field]].value = '';
        document.querySelector(`#${triangleCalcFields[field]} + label`).setAttribute('class', '');
        document.querySelector(`#${triangleCalcFields[field]}`).disabled = false;
    }

    for (let i = 0; i < numFields; i++) {
        userProvided[i] = false;
        computed[i] = false;
        parseError[i] = false;
        parseErrorCount[i] = 0;
    }

    for (let param of paramOrder) {
        param[0].splice(0, param[0].length)
        if (param[2]) param[2].splice(0, param[2].length)
    }
    // clearTriangleGraph();
    // hideTriangleErr();
}
triangleCalcReset()