const mathematicians = ['Riemann', 'Ramanujan', 'Euler', 'Carl Gauss', 'Jacob Bernoulli', 'Mathologer', 'Niccolò Tartaglia', 'Terence Tao', 'Blaise Pascal', 'Henri Poincaré', 'Édouard Lucas', 'Pierre de Fermat', 'Diophantus', 'Grigori Perelman', 'René Descartes', 'Joseph Fourier', 'G. H. Hardy', 'Alan Turing'];
const quotes = [
    ['The most incomprehensible thing about the world is that it is at all comprehensible.', 'Albert Einstein'],
    ['We cannot solve our problems with the same thinking we used when we created them.', 'Albert Einstein'],
    ["He who cannot pause to wonder and stand rapt in awe is as good as dead; his eyes are closed.", 'Albert Einstein'],
    ["Mathematical equations are a poetry of logical ideas.", 'Albert Einstein'],
    ["An equation is to considered understood when you can predict the properties of its solutions without solving it.", 'Paul Dirac'],
    ["Life is good for only two things - discovering mathematics and teaching mathematics.", 'Siméon-Denis Poisson'],
    ["Young man, in mathematics you don't understand things. You just get used to them.", 'John von Neumann'],
    ['A mathematician may say anything he pleases but a physicist must be at least partially sane.', 'Josiah Willard Gibbs']
];
const textFaces = ['&#xaf;&#x5c;&#x5f;&#x28;&#x30c4;&#x29;&#x5f;&#x2f;&#xaf;', '&#x28;&#x2580;&#x33f;&#x139;&#x32f;&#x2580;&#x33f;&#x20;&#x33f;&#x29;', '&#x28;&#x7e;&#x2d8;&#x25be;&#x2d8;&#x29;&#x7e;', '&#xf3c;&#x298;&#x31a;&#x644;&#x35c;&#x298;&#x31a;&#xf3d;', '&#x1aa;&#x28;&#x2d8;&#x2323;&#x2d8;&#x29;&#x283;', '&#x28;&#x5e;&#x32e;&#x5e;&#x29;', '&#x30fd;&#x28;&#x25d5;&#x30ee;&#x25d5;&#x29;&#xff89;', '&#x30fe;&#x28;&#x2310;&#x25a0;&#x5f;&#x25a0;&#x29;&#x30ce;&#x266a;', '&#x28;&#x2609;&#x2323;&#x2609;&#x29;', '&#x28;&#x360;&#x2256;&#x20;&#x35c;&#x296;&#x360;&#x2256;&#x29;', '&#xff08;&#x3063;&#xff3e;&#x25bf;&#xff3e;&#xff09;'];
const randomNum2 = Math.floor(Math.random() * quotes.length);
document.querySelector('#quote').innerHTML = `"${quotes[randomNum2][0]}"<div id='quoteBy'>${quotes[randomNum2][1]}</div>`;

const numInputs = document.querySelectorAll('input[type=number');

for (i = 0; i < numInputs.length; i++) {
    numInputs[i].addEventListener('keydown', inpHandler)
}
const doNotBlock = ['Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', "Control", 'Meta', 'v', 'a', 'c'];

function inpHandler(e) {
    if ((['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '.', ...doNotBlock].indexOf(e.key) < 0)) {
        e.preventDefault();
        console.log('block')
    }
}

const input = document.querySelector("#genExpFormD")
input.addEventListener('keydown', function(e) {
    if ((input.value.length >= 1 || ['0', '-', '.'].indexOf(e.key) > -1) && (
            doNotBlock.indexOf(e.key) < 0
        )) {
        e.preventDefault();
    }
})



//const textFaces = ['¯\\_(ツ)_/¯', '(▀̿Ĺ̯▀̿ ̿)', '(~˘▾˘)~', '༼ʘ̚ل͜ʘ̚༽', 'ƪ(˘⌣˘)ʃ', '(^̮^)', 'ヽ(◕ヮ◕)ﾉ', 'ヾ(⌐■_■)ノ♪', '(⊙.⊙(☉⌣☉)⊙.⊙)', '(͠≖ ͜ʖ͠≖)', '（っ＾▿＾）'];


ASCIIloading = {
    loadingIntervalNo: 0,
    delay: 100,
    currentSpinner: 0,
    el: '',
    counter: 0,
    spinners: [
        ["—", "\\", " | ", '/'],
        ".oO@*",
        '▖▘▝▗',
        "__\\|/____/|\\__",
        "-≻›⟩|⟨‹≺-≺‹⟨|⟩›≻",
        "-≻›⟩›≻-", "◟◜◝◞",
        "◌○⊙●⊙○",
        "'°º¤ø,¸¸,ø¤º°'",
        "−=≡",
        "█▓▒░▒▓",
        "▏▎▍▋▊▉▉▊▋▍▎▏",
        "_▂▃▅▆▇█▇▆▅▃▂_",
        '←↖↑↗→↘↓↙',
        '|X——X',
        '◐◓◑◒',
        "⠀⡀⠄⠂⠁⠈⠐⠠⢀⣀⢄⢂⢁⢈⢐⢠⣠⢤⢢⢡⢨⢰⣰⢴⢲⢱⢸⣸⢼⢺⢹⣹⢽⢻⣻⢿⣿⣶⣤⣀",
        '┤┘┴├┌┬┐', ['(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(o.o)', '(-.-)', '(o.o)', '(-.-)', '(o.o)', '(o.o)'],
        ['(~˘▾˘)~', '(~˘▾˘)~', '(~˘▾˘)~', '(~˘▾˘)~', '(~˘▾˘)~', '(~˘▾˘)~', '~(˘▾˘~)', '~(˘▾˘~)', '~(˘▾˘~)', '~(˘▾˘~)', '~(˘▾˘~)', '~(˘▾˘~)']
    ],
    playLoadingAnim(selector) {
        this.el = document.querySelector(selector);
        this.currentSpinner = Math.floor((Math.random() * this.spinners.length));
        this.counter = 0;
        this.loadingIntervalNo = setInterval(() => {
            try {
                this.el.innerText = this.spinners[this.currentSpinner][this.counter];
            } catch {
                console.log('something went wrong, removing interval function...')
                clearInterval(this.loadingIntervalNo);
            }
            if (this.counter >= this.spinners[this.currentSpinner].length - 1) {
                this.counter = 0;
            } else {
                this.counter++;
            }
        }, this.delay);
    },
    stopLoadingAnim() {
        clearInterval(this.loadingIntervalNo);
    }
}

function toast(msg1, msg2, overflow) {
    let toast = document.createElement("div");
    toast.setAttribute("class", "toastAlert");
    toast.innerHTML = `<h2>${msg1}</h2><div class = 'toastExp ${overflow ? '':'toastNoOverflow'}'>${msg2}</div>`
    document.body.appendChild(toast);
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 4000)
}

function copyAnything(str) {
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = str;
    dummy.select();
    navigator.clipboard.writeText(dummy.value);
    document.body.removeChild(dummy);
    toast('Copied!', str);
}

///////////////////////////////////////////////////////////////////////
//init functions of all option menus

function genExpressionInit() {
    document.querySelector('#level').value = GEuserConfig.min;
    console.log(GEuserConfig.min)
    document.querySelector('#concatLimit').value = GEuserConfig.concatLimit;
    document.querySelector('#add').checked = GEuserConfig.add;
    document.querySelector('#sub').checked = GEuserConfig.sub;
    document.querySelector('#mul').checked = GEuserConfig.mul;
    document.querySelector('#div').checked = GEuserConfig.div;
    document.querySelector('#pow').checked = GEuserConfig.pow;
    document.querySelector('#conc').checked = GEuserConfig.conc;
    document.querySelector('#notAsterisk').checked = GEuserConfig.notAsterisk;
}

function primeNUmberCalculatorInit() {
    document.querySelector("#graphIt").checked = PUserConfig.graphIt;
}
///////////////////////////////////////////////////////////////////////
//the option menu code

const menus = {
    genExpression: {
        wrapper: '#genExpression .optMenuWrapper',
        optMenuEl: '#genExpression .optMenu',
        cogWheel: '#genExpression .gear',
        init: genExpressionInit,
        width: '500px',
        height: '370px',
        menuClosed: true,
        mouseOverMenu: false
    },
    primeNumberCalculator: {
        wrapper: '#primeNumberCalculator .optMenuWrapper',
        optMenuEl: '#primeNumberCalculator .optMenu',
        cogWheel: '#primeNumberCalculator .gear',
        init: primeNUmberCalculatorInit,
        width: '150px',
        height: '110px',
        menuClosed: true,
        mouseOverMenu: false
    }
}

//add event listeners for mouseover and mouse leave
for (let menu in menus) {
    document.querySelector(menus[menu].optMenuEl).addEventListener("mouseleave", () => {
        menus[menu].mouseOverMenu = false;
        console.log(menu, menus[menu].mouseOverMenu)
    });
    document.querySelector(menus[menu].optMenuEl).addEventListener("mouseover", () => {
        menus[menu].mouseOverMenu = true;
        console.log(menu, menus[menu].mouseOverMenu)
    });
}

//called whenever the user clicks on a gear
function toggleMenu(menuName) {
    if (menus[menuName].menuClosed) {
        setTimeout(() => {
            menus[menuName].menuClosed = false;
            document.querySelector(menus[menuName].optMenuEl).style.display = 'block';
        }, 200);
        document.querySelector(menus[menuName].cogWheel).classList.add('gearRot')
        document.querySelector(menus[menuName].wrapper).style.height = menus[menuName].height;
        document.querySelector(menus[menuName].wrapper).style.width = menus[menuName].width;
        document.querySelector(menus[menuName].wrapper).style.zIndex = 500;
        for (let menu in menus) {
            if (menu !== menuName) {
                document.querySelector(menus[menu].wrapper).style.zIndex = 499;
            }
        }
        menus[menuName].init();
    }
}

//called whenever the user clicks on the body
function considerClosingMenu() {
    for (let menu in menus) {
        if (!menus[menu].mouseOverMenu && !menus[menu].menuClosed) {
            console.log("t")
            closeMenu(menu)
        }
    }
}

//closes the menu
function closeMenu(menuName) {
    // console.log(menus[menuName])
    document.querySelector(menus[menuName].cogWheel).classList.remove('gearRot')
    document.querySelector(menus[menuName].wrapper).style.height = '32px';
    document.querySelector(menus[menuName].wrapper).style.width = '32px';
    document.querySelector(menus[menuName].optMenuEl).style.display = 'none';
    setTimeout(() => { menus[menuName].menuClosed = true }, 200);
}

///////////////////////////////////////////////////////////////////////

// math stuff

function gcd_f2(...arr) {
    let gcd = Math.abs(arr[0]);
    for (let i = 1; i < (arr.length); i++) {
        let x = Math.abs(arr[i]);
        let y = gcd;
        while (y) {
            let t = y;
            y = x % y;
            x = t;
        }
        gcd = x;
    }
    return gcd;
}

function gcd_f3(a, b, arr) {
    if (b === 0) {
        arr[0] = 1;
        arr[1] = 0;
        return a;
    }
    const g = gcd_f3(b, a % b, arr)
    const tmpy = arr[0] - Math.floor(a / b) * arr[1];
    arr[0] = arr[1];
    arr[1] = tmpy;
    return g;
}


class frac {
    //data structure
    /////////////////////////////////////////////

    // let x = new frac([
    //      numerator here
    //     [(number or reduced number), isImaginary?(bool), isReduced?(pass the string "reduced" if yes)] // numerator term1
    //     [(number or reduced number), isImaginary?(bool), isReduced?(pass the string "reduced" if yes)] // numerator term2
    //      you can have as many terms as you like
    // ], [
    //      denominator here
    //     [(number or reduced number), isImaginary?(bool), isReduced?(pass the string "reduced" if yes)] // denominator term1
    //     [(number or reduced number), isImaginary?(bool), isReduced?(pass the string "reduced" if yes)] // denominator term2
    //      you can have as many terms as you like
    // ], (Do you more than 1 term in the numerator or denominator?)(bool));

    //reduced numbers are in the form of an array: [whole part, part inside the radical]
    /////////////////////////////////////////////

    constructor(arr1, arr2, multiTerm = false) {
        if (!multiTerm) {
            //simple fraction
            //!!! do not choose this if you have reduced terms!!! inconsistent, i know. deal with it.

            this.simplify = function() {
                let n = arr1[0];
                let d = arr2[0];

                //eliminate decimals, if any
                if (!Number.isInteger(n)) {
                    let t = Math.pow(10, n.toString().split('.')[1].length);
                    n *= t;
                    d *= t;
                }
                if (!Number.isInteger(d)) {
                    let t = Math.pow(10, d.toString().split('.')[1].length);
                    n *= t;
                    d *= t;
                }

                //reduce fraction to lowest terms
                const gcd = gcd_f2(n, d);
                n /= gcd;
                d /= gcd;
                this.n = n;
                this.d = d;
            }
            this.simplify();


            this.stringify = function() {
                return (this.n + (this.d == 1 ? '' : `/${this.d}`));
            }

            this.value = function() {
                return (this.n / this.d);
            }

            this.multiply = function(x) {
                let a = new frac([this.n * x.n], [this.d * x.d])
                this.n = a.n;
                this.d = a.d;
            }

            this.reciprocal = function() {
                const a = this.n;
                this.n = this.d;
                this.d = a;
            }
        } else {
            //multiple terms exist, in the numerator, or denominator, or both.

            this.n = arr1;
            this.d = arr2;

            //removes common factors from the numerator and denominator
            this.simplify = function() {
                const coefficients = []; // store coeffs here
                let ndArray = [this.n, this.d];
                for (let i in ndArray) {
                    for (let term in ndArray[i]) { // for each term in n or d
                        //set any absent args to def
                        if (ndArray[i][term][1] === undefined) ndArray[i][term][1] = false; // the second argument specifies if the term is complex or not. Ex. [n, true]. here, the number is "n" and it is imaginary.

                        //collect all coefficients
                        if (ndArray[i][term][2] === 'reduced') {
                            coefficients.push(ndArray[i][term][0][0]) // a reduced term is an array in itself, consider its whole number part as the coefficient
                        } else {
                            coefficients.push(ndArray[i][term][0])
                        }
                    }
                }

                //compute the gcd of the coefficients
                const gcd = gcd_f2(...coefficients);

                // reduce term by term
                for (let i in ndArray) {
                    for (let term in ndArray[i]) {
                        if (ndArray[i][term][2] === 'reduced') {
                            ndArray[i][term][0][0] /= gcd;
                        } else {
                            ndArray[i][term][0] /= gcd;
                        }
                    }
                }
            }
            this.simplify();

            //represents the fraction as ASCII Math text
            this.stringify = function() {
                let n = this.n;
                let d = this.d;
                console.log(n, d);
                let out = '';
                if (d[0][0] !== 1 || d.length > 1) { out += '(' } // enclose the numerator in parenthesis if the denominator is not 1
                for (let term in n) {
                    // cycle through each term in the numerator
                    if (n[term][2] === 'reduced') {
                        // if the term is reduced
                        out += ((n[term][0][0] == 1 ? '' : n[term][0][0]) + 'sqrt(' + n[term][0][1]) + ')' + (n[term][1] ? 'i' : '') + '+';
                    } else if (n[term][0]) {
                        out += (n[term][0]) + (n[term][1] ? 'i' : '') + '+';
                    }
                }
                out = out.slice(0, -1); // cut off the hanging "+"
                if (d[0][0] !== 1 || d.length > 1) { out += ')' } // enclose the numerator in parenthesis if the denominator is not 1

                if (d[0][0] !== 1 || d.length > 1) {
                    out += '/'; // add the division symbol; dividing by the denominator
                    if (d.length > 1) { out += '(' } //enclose the denominator in parenthesis if its length is greater then 1
                    for (let term in d) {
                        //similar to what I did in the numerator
                        if (d[term][2] === 'reduced') {
                            out += '(' + ((d[term][0][0] == 1 ? '' : d[term][0][0]) + 'sqrt(' + d[term][0][1]) + '))' + (d[term][1] ? 'i' : '') + ' + ';
                        } else {
                            out += d[term][0] + (d[term][1] ? 'i' : '') + ' + '; // decided to pad the "+" with spaces here... dunno why
                        }
                    }
                    out = out.slice(0, -3); // cut off the hanging "+"
                    if (d.length > 1) { out += ')' } //enclose the denominator in parenthesis if its length is greater then 1
                }
                out = out.replace(/\+\-/g, '-') //if +- appear together successively, replace them with just a -
                return out; //done!!
            }

            //computes the actual value of the fraction
            this.value = function() {
                //DONT pass fractions which have complex numbers in them, js doesn't natively support complex numbers.
                let total = [0, 0];
                let ndArray = [this.n, this.d];
                for (let k in ndArray) {
                    let l = ndArray[k];
                    for (let term in l) {
                        if (l[term][2] === 'reduced') {
                            total[k] += l[term][0][0] * Math.sqrt(l[term][0][1]);
                        } else if (l[term][0]) {
                            total[k] += l[term][0]
                        }
                    }
                }
                return total[0] / total[1];
            }

            //multiplies the fraction by another simple fraction object
            this.multiply = function(x) {
                //currently only simple fractions can be passed in for x;
                console.log(x.n, x.d, this.n, this.d);
                let ndArray = [this.n, this.d];
                let ndArrayX = [x.n, x.d];
                for (const i in ndArray) {
                    for (const term in ndArray[i]) {
                        if (ndArray[i][term][2] === 'reduced') {
                            ndArray[i][term][0][0] *= ndArrayX[i];
                        } else if (this.n[term][0]) {
                            ndArray[i][term][0] *= ndArrayX[i];
                        }
                    }
                }
                this.simplify();
            }

            //inverts the fraction
            this.reciprocal = function() {
                const a = [...this.n];
                this.n = [...this.d];
                this.d = a;
            }
        }
    }
}

//find all prefect squares till a number n
function perfsq(n) {
    const l = [1];
    let i = 0;
    let x = 3;
    while (l[l.length - 1] + x <= n) {
        l.push(l[i] + x);
        i++;
        x = 2 * i + 3;
    }
    return l;
}

//reduces radicals to simplest terms
function reduceSqrt(n) {
    if (n < 0) {
        return 'x001';
    }
    if (Number.isInteger(Math.sqrt(n))) {
        return 'x002';
    }
    const l = [];
    let perfsqs = perfsq(n / 2)
    for (i in perfsqs) {
        if (n % perfsqs[i] === 0) {
            l.push(perfsqs[i]);
        }
    }
    if (l.length === 0) {
        //the radical is irreducible
        return 'x003'
    }
    let a = Math.sqrt(l[l.length - 1])
    let b = n / l[l.length - 1]
    return ([a, b]);
}

function parseErrorsSqrt(a, b) {
    //handles errors from the reduceSqrt function
    if (a === 'x002') {
        // the number is a perfect square, safe to take its square root and return it
        return Math.sqrt(b);
    }
    if (a === 'x003') {
        // the radical is irreducible. Return the number under the radical
        return ([1, b]);
    }
    return a;
}

function isReduced(a) {
    if (typeof(a) === 'object') return 'reduced';
    return '';
}



if (typeof(Storage) !== "undefined") {
    const a = localStorage.getItem("visited");
    console.log(a)
    if (!a) {
        localStorage.setItem("visited", 'notified');
        toast('Hard refresh required', "Our website's been updated! We suggest you hard refresh.", true)
    } else {
        if (a == 'notified') {
            toast('Heya!', "Our website just got a new face! How'd you like it?", true)
        }
        localStorage.setItem("visited", 'ok');
    }
} else {
    console.log('no webstorage support')
}