const quotes = [
    [
        "The most incomprehensible thing about the world is that it is at all comprehensible.",
        "Albert Einstein",
    ],
    [
        "We cannot solve our problems with the same thinking we used when we created them.",
        "Albert Einstein",
    ],
    [
        "He who cannot pause to wonder and stand rapt in awe is as good as dead; his eyes are closed.",
        "Albert Einstein",
    ],
    [
        "Life is good for only two things - discovering mathematics and teaching mathematics.",
        "Siméon-Denis Poisson",
    ],
    [
        "Young man, in mathematics you don't understand things. You just get used to them.",
        "John von Neumann",
    ],
    [
        "A mathematician may say anything he pleases but a physicist must be at least partially sane.",
        "Josiah Willard Gibbs",
    ],
    [
        "As far as the laws of mathematics refer to reality, they are not certain, and as far as they are certain, they do not refer to reality.",
        "Albert Einstein",
    ],
    ["‘Obvious’ is the most dangerous word in mathematics.", "Eric Temple Bell"],
    [
        "Somehow it’s okay for people to chuckle about not being good at math. Yet, if I said “I never learned to read,” they’d say I was an illiterate dolt.",
        "Neil deGrasse Tyson",
    ],
];
const textFaces = [
    "&#x28;&#x2580;&#x33f;&#x139;&#x32f;&#x2580;&#x33f;&#x20;&#x33f;&#x29;",
    "&#x28;&#x7e;&#x2d8;&#x25be;&#x2d8;&#x29;&#x7e;",
    "&#xf3c;&#x298;&#x31a;&#x644;&#x35c;&#x298;&#x31a;&#xf3d;",
    "&#x1aa;&#x28;&#x2d8;&#x2323;&#x2d8;&#x29;&#x283;",
    "&#x28;&#x5e;&#x32e;&#x5e;&#x29;",
    "&#x30fd;&#x28;&#x25d5;&#x30ee;&#x25d5;&#x29;&#xff89;",
    "&#x30fe;&#x28;&#x2310;&#x25a0;&#x5f;&#x25a0;&#x29;&#x30ce;&#x266a;",
    "&#x28;&#x2609;&#x2323;&#x2609;&#x29;",
    "&#x28;&#x360;&#x2256;&#x20;&#x35c;&#x296;&#x360;&#x2256;&#x29;",
    "&#xff08;&#x3063;&#xff3e;&#x25bf;&#xff3e;&#xff09;",
    "&#9685;&#8255;&#8636;",
    "&#40;&#94;&#94;&#41;&#47;"
];
const randomNum2 = Math.floor(Math.random() * quotes.length);
document.querySelector(
    "#quote"
).innerHTML = `${quotes[randomNum2][0]}<div id='quoteBy'>${quotes[randomNum2][1]}</div>`



//inp handlers 
{
    const numInputs = document.querySelectorAll("input[type=number");

    // for (i = 0; i < numInputs.length; i++) {
    //     numInputs[i].addEventListener("keydown", inpHandler);
    // }
    const doNotBlock = [
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Backspace",
        "Control",
        "Meta",
        "v",
        "a",
        "c",
    ];

    function inpHandler(e) {
        if (
            [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "-",
                ".",
                ...doNotBlock,
            ].indexOf(e.key) < 0
        ) {
            e.preventDefault();
            // console.log('block')
        }
    }

    const input = document.querySelector("#genExpFormD");
    input.addEventListener("keydown", function (e) {
        if (
            (input.value.length >= 1 || ["0", "-", "."].indexOf(e.key) > -1) &&
            doNotBlock.indexOf(e.key) < 0
        ) {
            e.preventDefault();
        }
    });
}

//fancy ASCII loading anim
ASCIIloading = {
    loadingIntervalNo: 0,
    delay: 100,
    currentSpinner: 0,
    el: "",
    counter: 0,
    spinners: [
        ["—", "\\", " | ", "/"],
        ".oO@*",
        "▖▘▝▗",
        "__\\|/____/|\\__",
        "-≻›⟩|⟨‹≺-≺‹⟨|⟩›≻",
        "-≻›⟩›≻-",
        "◟◜◝◞",
        "◌○⊙●⊙○",
        "'°º¤ø,¸¸,ø¤º°'",
        "−=≡",
        "█▓▒░▒▓",
        "▏▎▍▋▊▉▉▊▋▍▎▏",
        "_▂▃▅▆▇█▇▆▅▃▂_",
        "←↖↑↗→↘↓↙",
        "|X——X",
        "◐◓◑◒",
        "⠀⡀⠄⠂⠁⠈⠐⠠⢀⣀⢄⢂⢁⢈⢐⢠⣠⢤⢢⢡⢨⢰⣰⢴⢲⢱⢸⣸⢼⢺⢹⣹⢽⢻⣻⢿⣿⣶⣤⣀",
        "┤┘┴├┌┬┐", [
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(o.o)",
            "(-.-)",
            "(o.o)",
            "(-.-)",
            "(o.o)",
            "(o.o)",
        ],
        [
            "(~˘▾˘)~",
            "(~˘▾˘)~",
            "(~˘▾˘)~",
            "(~˘▾˘)~",
            "(~˘▾˘)~",
            "(~˘▾˘)~",
            "~(˘▾˘~)",
            "~(˘▾˘~)",
            "~(˘▾˘~)",
            "~(˘▾˘~)",
            "~(˘▾˘~)",
            "~(˘▾˘~)",
        ],
    ],
    playLoadingAnim(selector) {
        this.el = document.querySelector(selector);
        this.currentSpinner = Math.floor(Math.random() * this.spinners.length);
        this.counter = 0;
        this.loadingIntervalNo = setInterval(() => {
            try {
                this.el.innerText = this.spinners[this.currentSpinner][this.counter];
            } catch {
                console.log("something went wrong, removing interval function...");
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
    },
};

//utility
{
    //toast message
    function toast(msg1, msg2, overflow) {
        let toast = document.createElement("div");
        toast.setAttribute("class", "toastAlert");
        toast.innerHTML = `<h2>${msg1}</h2><div class = 'toastExp ${overflow ? "" : "toastNoOverflow"
            }'>${msg2}</div>`;
        document.body.appendChild(toast);
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 4000);
    }

    //copy stuff
    function copyAnything(str) {
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value = str;
        dummy.select();
        navigator.clipboard.writeText(dummy.value);
        document.body.removeChild(dummy);
        toast("Copied!", str);
    }

    //flip a switch
    function flipSwitch(arg, Sw1, Sw2) {
        Sw1 = document.querySelector(Sw1);
        Sw2 = document.querySelector(Sw2);
        if (arg) {
            Sw1.classList.add('active');
            Sw2.classList.remove('active');
        } else {
            Sw2.classList.add('active');
            Sw1.classList.remove('active');
        }
    }
}

// math stuff
{
    Number.prototype.countDecimals = function () {

        if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

        var str = this.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }

    function gcd_f2(...arr) {
        let gcd = Math.abs(arr[0]);
        for (let i = 1; i < arr.length; i++) {
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
        const g = gcd_f3(b, a % b, arr);
        const tmpy = arr[0] - Math.floor(a / b) * arr[1];
        arr[0] = arr[1];
        arr[1] = tmpy;
        return g;
    }

    function lcm(a, b) {
        let facA = primeFactorize(a);
        const facB = primeFactorize(b);


        // obtain the prime factorization of the lcm
        for (let factor of facB) {
            let isCommon = undefined;
            for (let factor2 in facA) {
                if (facA[factor2][0] == factor[0]) {
                    isCommon = factor2;
                    break;
                }
            }
            if (isCommon != undefined) {
                facA.splice(isCommon, 1, [factor[0], facA[isCommon][1] > factor[1] ? facA[isCommon][1] : factor[1]])
            } else {
                facA.push(factor);
            }
        }

        // evaluate the lcm
        let output = 1;
        for (let factor of facA) {
            output *= Math.pow(factor[0], factor[1])
        }
        return output;
    }

    function calcFactors(num, PF) {
        //PF = possible factors
        const factors = [];
        for (let i = 0; i <= PF.length; i++) {
            if (num % PF[i] === 0) {
                factors.push(PF[i])
            }
        }
        return factors;
    }

    function calculateCrap(num) {
        let start = performance.now();
        let Prime = true;
        // let finalString = '2, ';
        let finalArray = [2];
        for (let i = 3; i <= num; i += 2) {
            if (
                (i % 2 === 0 && i !== 2) ||
                (i % 3 === 0 && i !== 3) ||
                (i % 5 === 0 && i !== 5) ||
                (i % 7 === 0 && i !== 7) ||
                (i % 11 === 0 && i !== 11) ||
                (i % 13 === 0 && i !== 13) ||
                (i % 17 === 0 && i !== 17) ||
                (i % 19 === 0 && i !== 19) ||
                (i % 23 === 0 && i !== 23) ||
                (i % 29 === 0 && i !== 29) ||
                (i % 31 === 0 && i !== 31) ||
                (i % 37 === 0 && i !== 37) ||
                (i % 41 === 0 && i !== 41) ||
                (i % 43 === 0 && i !== 43) ||
                (i % 47 === 0 && i !== 47) ||
                (i % 53 === 0 && i !== 53) ||
                (i % 59 === 0 && i !== 59) ||
                (i % 61 === 0 && i !== 61) ||
                (i % 67 === 0 && i !== 67) ||
                (i % 71 === 0 && i !== 71) ||
                (i % 73 === 0 && i !== 73) ||
                (i % 79 === 0 && i !== 79) ||
                (i % 83 === 0 && i !== 83) ||
                (i % 89 === 0 && i !== 89) ||
                (i % 97 === 0 && i !== 97) ||
                (i % 101 === 0 && i !== 101) ||
                (i % 103 === 0 && i !== 103) ||
                (i % 107 === 0 && i !== 107) ||
                (i % 109 === 0 && i !== 109) ||
                (i % 113 === 0 && i !== 113) ||
                (i % 127 === 0 && i !== 127) ||
                (i % 131 === 0 && i !== 131) ||
                (i % 137 === 0 && i !== 137) ||
                (i % 139 === 0 && i !== 139) ||
                (i % 149 === 0 && i !== 149) ||
                (i % 151 === 0 && i !== 151) ||
                (i % 157 === 0 && i !== 157) ||
                (i % 163 === 0 && i !== 163) ||
                (i % 167 === 0 && i !== 167) ||
                (i % 173 === 0 && i !== 173) ||
                (i % 179 === 0 && i !== 179) ||
                (i % 181 === 0 && i !== 181) ||
                (i % 191 === 0 && i !== 191) ||
                (i % 193 === 0 && i !== 193) ||
                (i % 197 === 0 && i !== 197) ||
                (i % 199 === 0 && i !== 199) ||
                (i % 211 === 0 && i !== 211) ||
                (i % 223 === 0 && i !== 223) ||
                (i % 227 === 0 && i !== 227) ||
                (i % 229 === 0 && i !== 229) ||
                (i % 233 === 0 && i !== 233) ||
                (i % 239 === 0 && i !== 239) ||
                (i % 241 === 0 && i !== 241) ||
                (i % 251 === 0 && i !== 251) ||
                (i % 257 === 0 && i !== 257) ||
                (i % 263 === 0 && i !== 263) ||
                (i % 269 === 0 && i !== 269) ||
                (i % 271 === 0 && i !== 271) ||
                (i % 277 === 0 && i !== 277) ||
                (i % 281 === 0 && i !== 281) ||
                (i % 283 === 0 && i !== 283) ||
                (i % 293 === 0 && i !== 293) ||
                (i % 307 === 0 && i !== 307) ||
                (i % 311 === 0 && i !== 311) ||
                (i % 313 === 0 && i !== 313) ||
                (i % 317 === 0 && i !== 317) ||
                (i % 331 === 0 && i !== 331) ||
                (i % 337 === 0 && i !== 337) ||
                (i % 347 === 0 && i !== 347) ||
                (i % 349 === 0 && i !== 349) ||
                (i % 353 === 0 && i !== 353) ||
                (i % 359 === 0 && i !== 359) ||
                (i % 367 === 0 && i !== 367) ||
                (i % 373 === 0 && i !== 373) ||
                (i % 379 === 0 && i !== 379) ||
                (i % 383 === 0 && i !== 383) ||
                (i % 389 === 0 && i !== 389) ||
                (i % 397 === 0 && i !== 397) ||
                (i % 401 === 0 && i !== 401) ||
                (i % 409 === 0 && i !== 409) ||
                (i % 419 === 0 && i !== 419) ||
                (i % 421 === 0 && i !== 421) ||
                (i % 431 === 0 && i !== 431) ||
                (i % 433 === 0 && i !== 433) ||
                (i % 439 === 0 && i !== 439) ||
                (i % 443 === 0 && i !== 443) ||
                (i % 449 === 0 && i !== 449) ||
                (i % 457 === 0 && i !== 457) ||
                (i % 461 === 0 && i !== 461) ||
                (i % 463 === 0 && i !== 463) ||
                (i % 467 === 0 && i !== 467) ||
                (i % 479 === 0 && i !== 479) ||
                (i % 487 === 0 && i !== 487) ||
                (i % 491 === 0 && i !== 491) ||
                (i % 499 === 0 && i !== 499) ||
                (i % 503 === 0 && i !== 503) ||
                (i % 509 === 0 && i !== 509) ||
                (i % 521 === 0 && i !== 521) ||
                (i % 523 === 0 && i !== 523) ||
                (i % 541 === 0 && i !== 541) ||
                (i % 547 === 0 && i !== 547) ||
                (i % 557 === 0 && i !== 557) ||
                (i % 563 === 0 && i !== 563) ||
                (i % 569 === 0 && i !== 569) ||
                (i % 571 === 0 && i !== 571) ||
                (i % 577 === 0 && i !== 577) ||
                (i % 587 === 0 && i !== 587) ||
                (i % 593 === 0 && i !== 593) ||
                (i % 599 === 0 && i !== 599) ||
                (i % 601 === 0 && i !== 601) ||
                (i % 607 === 0 && i !== 607) ||
                (i % 613 === 0 && i !== 613) ||
                (i % 617 === 0 && i !== 617) ||
                (i % 619 === 0 && i !== 619) ||
                (i % 631 === 0 && i !== 631) ||
                (i % 641 === 0 && i !== 641) ||
                (i % 643 === 0 && i !== 643) ||
                (i % 647 === 0 && i !== 647) ||
                (i % 653 === 0 && i !== 653) ||
                (i % 659 === 0 && i !== 659) ||
                (i % 661 === 0 && i !== 661) ||
                (i % 673 === 0 && i !== 673) ||
                (i % 677 === 0 && i !== 677) ||
                (i % 683 === 0 && i !== 683) ||
                (i % 691 === 0 && i !== 691) ||
                (i % 701 === 0 && i !== 701) ||
                (i % 709 === 0 && i !== 709) ||
                (i % 719 === 0 && i !== 719) ||
                (i % 727 === 0 && i !== 727) ||
                (i % 733 === 0 && i !== 733) ||
                (i % 739 === 0 && i !== 739) ||
                (i % 743 === 0 && i !== 743) ||
                (i % 751 === 0 && i !== 751) ||
                (i % 757 === 0 && i !== 757) ||
                (i % 761 === 0 && i !== 761) ||
                (i % 769 === 0 && i !== 769) ||
                (i % 773 === 0 && i !== 773) ||
                (i % 787 === 0 && i !== 787) ||
                (i % 797 === 0 && i !== 797) ||
                (i % 809 === 0 && i !== 809) ||
                (i % 811 === 0 && i !== 811) ||
                (i % 821 === 0 && i !== 821) ||
                (i % 823 === 0 && i !== 823) ||
                (i % 827 === 0 && i !== 827) ||
                (i % 829 === 0 && i !== 829) ||
                (i % 839 === 0 && i !== 839) ||
                (i % 853 === 0 && i !== 853) ||
                (i % 857 === 0 && i !== 857) ||
                (i % 859 === 0 && i !== 859) ||
                (i % 863 === 0 && i !== 863) ||
                (i % 877 === 0 && i !== 877) ||
                (i % 881 === 0 && i !== 881) ||
                (i % 883 === 0 && i !== 883) ||
                (i % 887 === 0 && i !== 887) ||
                (i % 907 === 0 && i !== 907) ||
                (i % 911 === 0 && i !== 911) ||
                (i % 919 === 0 && i !== 919) ||
                (i % 929 === 0 && i !== 929) ||
                (i % 937 === 0 && i !== 937) ||
                (i % 941 === 0 && i !== 941) ||
                (i % 947 === 0 && i !== 947) ||
                (i % 953 === 0 && i !== 953) ||
                (i % 967 === 0 && i !== 967) ||
                (i % 971 === 0 && i !== 971) ||
                (i % 977 === 0 && i !== 977) ||
                (i % 983 === 0 && i !== 983) ||
                (i % 991 === 0 && i !== 991) ||
                (i % 997 === 0 && i !== 997)
            ) {
                continue;
            }
            Prime = true;
            let ul = i / 2;
            for (let j = 2; j <= ul; j++) {
                if ((i % j) === 0) {
                    Prime = false;
                }
            }
            if (Prime) {
                finalArray.push(i);
                // finalString += i + ', ';
            }
        }
        var end = performance.now();
        // console.log(`finding all primes till ${num} took ${end - start} milliseconds to execute.`)
        return finalArray;
    }

    function primeFactorize(num) {
        num = parseInt(num) //just in case
        if (num <= 0) {
            return [];
        }
        let primes = calculateCrap(Math.ceil(num / 2));
        let factors = calcFactors(num, primes);
        const primeFactorization = [];
        for (let i = 0; i < factors.length; i++) {
            let a = num / factors[i];
            let power = 1;
            while (a % factors[i] === 0) {
                a /= factors[i];
                power++;
            }
            primeFactorization.push([factors[i], power])
        }

        if (!primeFactorization.length) {
            // the number itself is prime!!
            return [[num, 1]];
        }
        return primeFactorization;
    }
}

//misc
{
    function firstElIn2dArr(arr) {
        const tmp = [];
        for (let i of arr) {
            tmp.push(i[0]);
        }
        return tmp;
    };

    function secondElIn2dArr(arr) {
        const tmp = [];
        for (let i of arr) {
            tmp.push(i[1]);
        }
        return tmp;
    };

    function indexOfObj(arr, obj) {
        const srtObj = JSON.stringify(obj);
        // console.log(obj)
        for (let i = 0; i < arr.length; i++) {
            if (JSON.stringify(arr[i]) === srtObj) {
                // console.log(i);
                return i;
            }
        }
        return -1;
    };

    function cloneObj(arr) {
        return _.cloneDeep(arr);
    };

    function stringify(arg) {
        if (typeof (arg) == 'number') {
            return `${arg}`
        }
        return arg.stringify();
    };

    function parseExp(str) {
        console.log('------------------------------------')
        //get rid of spaces
        str = str.replace(/\s/g, '')

        const operators = ['+', '-', '*', '/', '^', 'sqrt', 'cbrt', 'sin', 'cos', 'tan']
        const precedence = [0, 0, 1, 1, 2, 3, 3, 3, 3, 3]
        const constants = ['pi', 'e']
        const possibleTokens = ['(', ')', ...operators, ...constants]
        const tokens = [];

        //tokenize
        loop1: for (let i = 0; i < str.length; i++) {
            const a = str[i];
            if (parseInt(a) || a == '.') {
                let counter = 1;
                while (parseInt(str[i + counter]) || str[i + counter] == '.') {
                    counter++
                }
                const number = str.substr(i, counter)
                if (str.replace(/[^\.]/g, '').length > 1) return false
                tokens.push(parseFloat(number))
                i += counter - 1;
                continue loop1;
            }
            for (let token of possibleTokens) {
                if (str.substr(i, token.length) == token) {
                    tokens.push(token)
                    i += token.length - 1;
                    continue loop1;
                }
            }
            return false;
        }

        // parse the tokens
        // this implementation uses the shunting-yard algorithm
        const stack = [];
        const queue = [];
        loop2: for (let token of tokens) {
            console.log(token)
            if (Number.isFinite(token) || constants.includes(token)) {
                queue.push(token)
                continue loop2;
            }

        }

        console.log(tokens)


        // if(str.match(/^\d{1,45}$/)){
        //     return parseInt(str)
        // }
        // console.log('nope')
        // return false;
        return true;
    };
}

//frac operations
{
    function gcdFrac(terms) {
        let commonFactors = [];
        for (let termI in terms) {
            const term = terms[termI];
            if (parseInt(termI) === 0)
                commonFactors = [...term];
            else {
                const tmp = firstElIn2dArr(term);
                const tmp2 = firstElIn2dArr(commonFactors);
                const filteredArray = cloneObj(
                    commonFactors.filter(
                        (x) => indexOfObj(tmp, x[0]) + 1
                    )
                );
                for (let i of filteredArray) {
                    i[1] = term[indexOfObj(tmp, i[0])][1];
                    const commonFactorsIndex = indexOfObj(tmp2, i[0])
                    if (
                        fracGreater(i[1], commonFactors[commonFactorsIndex][1])
                    ) {
                        // console.log(`keeping second`)
                        i[1] = commonFactors[commonFactorsIndex][1];
                    }
                }
                commonFactors = filteredArray;
            }
        }
        return commonFactors;
    };

    function lcmTwoFrac(d1, d2) {
        const newFrac = new frac(cloneObj(d1), cloneObj(d2), { doNotProcess: true });
        newFrac.checkIfSimple();
        if (!newFrac.simple) {
            newFrac.factorize();
            newFrac.simplify();
        }
        d1 = new frac(d1, [[[1, 1]]], { doNotProcess: true })
        d2 = new frac(d2, [[[1, 1]]], { doNotProcess: true })
        d1.factorize(); d2.factorize();
        d1 = d1.n; d2 = d2.n;
        return [fracMultiply(new frac(newFrac.n, [[[1, 1]]], { doNotProcess: true }),
            new frac(newFrac.d, [[[1, 1]]], { doNotProcess: true }),
            new frac([gcdFrac([...d1, ...d2])], [[[1, 1]]], { doNotProcess: true })),
        [newFrac.d, newFrac.n]]
    };

    function fracTwoAdd(a, b) {
        if (typeof a == "number" && typeof b == "number")
            return a + b;
        if (typeof a == "object" && typeof b == "object") {
            if (a.simple && b.simple) {
                const lcm2 = lcm(a.d[0][0][0], b.d[0][0][0])
                const value = (a.n[0][0][0] / a.d[0][0][0] * lcm2 + b.n[0][0][0] / b.d[0][0][0] * lcm2) / lcm2
                if (Number.isInteger(value)) return value
                return new frac(a.n[0][0][0] / a.d[0][0][0] * lcm2 + b.n[0][0][0] / b.d[0][0][0] * lcm2, lcm2, { doNotProcess: true });
            } else {
                console.log(a, b)
                const ad = toFrac(a.d);
                const bd = toFrac(b.d);
                return new frac([...toFrac(fracTwoMultiply(toFrac(a.n), bd)).n, ...toFrac(fracTwoMultiply(ad, toFrac(b.n))).n],
                    toFrac(fracTwoMultiply(ad, bd)).n)
                // const lcm = lcmTwoFrac(cloneObj(a.d), cloneObj(b.d));
                // const n1 = toFrac(fracTwoMultiply(new frac(lcm[1][0], [[[1, 1]]], { doNotProcess: true }),
                //     new frac([...a.n], [[[1, 1]]], { doNotProcess: true }))).n
                // const n2 = toFrac(fracTwoMultiply(new frac(lcm[1][1], [[[1, 1]]], { doNotProcess: true }),
                //     new frac([...b.n], [[[1, 1]]], { doNotProcess: true }))).n
                // return new frac([...n1, ...n2], lcm[0].n)
            }
        }
        if ((typeof a == "number" && typeof b == "object") || (typeof a == "object" && typeof b == "number")) {
            if (typeof (a) !== 'number') {
                const tmp = a;
                a = b;
                b = tmp;
            }
            if (b.simple) return new frac(a * b.d[0][0][0] + b.n[0][0][0], b.d[0][0][0])
            return fracTwoAdd(new frac(a, 1), b);
        }
    };

    function fracAdd(...args) {
        let sum = new frac(0, 1)
        for (let arg of args) {
            sum = fracTwoAdd(sum, arg)
        }
        return sum;
    };

    function fracTwoMultiply(a, b) {
        if (typeof a == "number" && typeof b == "number")
            return a * b;
        if (typeof a == "object" && typeof b == "object") {
            if (b.value == NaN) throw "division by 0"
            if (a.simple && b.simple) {
                const value = a.n[0][0][0] * b.n[0][0][0] / (a.d[0][0][0] * b.d[0][0][0])
                if (Number.isInteger(value)) return value
                return new frac(a.n[0][0][0] * b.n[0][0][0], a.d[0][0][0] * b.d[0][0][0])
            } else {
                function multiplyTerms(term1, term2) {
                    return new frac([[...term1, ...term2]], [[[1, 1]]]).n[0]
                }
                const ndA = [a.n, a.d]
                const ndB = [b.n, b.d]
                const ndProduct = [[], []];
                for (let ndI in ndA) {
                    const nda = ndA[ndI];
                    const ndb = ndB[ndI];
                    for (let termaI in nda) {
                        const terma = nda[termaI]
                        const product = [];
                        for (let termbI in ndb) {
                            const termb = ndb[termbI];
                            product.push(multiplyTerms(terma, termb))
                        }
                        ndProduct[ndI].push(...product)
                    }
                }
                return new frac(ndProduct[0], ndProduct[1]);
            }
        }

        if ((typeof a == "number" && typeof b == "object") || (typeof a == "object" && typeof b == "number")) {
            if (typeof (a) !== 'number') {
                const tmp = a;
                a = b;
                b = tmp;
            }
            if (b.value == NaN) throw "division by 0"
            if (b.simple) {
                if (a == b.d[0][0][0]) return b.n[0][0][0]
                const result = new frac(a * b.n[0][0][0], b.d[0][0][0]);
                if (result.d[0][0][0] == 1) return result.n[0][0][0];
                return result;
            } else {
                return fracTwoMultiply(new frac(a, 1), b)
            }
        }
    };

    function fracMultiply(...args) {
        let product = args[0]
        for (let arg of args.slice(1)) {
            product = fracTwoMultiply(product, arg)
        }
        return product;
    };

    function fracGreater(a, b) {
        if (typeof a == "number" && typeof b == "number")
            return a > b;
        if (typeof a == "object" && typeof b == "object") {
            if (a.simple && b.simple)
                return (a.n[0][0][0] / a.d[0][0][0]) > (b.n[0][0][0] / b.d[0][0][0])
        }
        if ((typeof a == "number" && typeof b == "object") || (typeof a == "object" && typeof b == "number")) {
            if (typeof (a) == 'number' && b.simple)
                return a > (b.n[0][0][0] / b.d[0][0][0])
            if (typeof (b) == 'number' && a.simple)
                return (a.n[0][0][0] / a.d[0][0][0]) > b
        }
    };

    function fracPow(a, b) {
        if (typeof a == "object") {
            b = toFrac(b);
            const result = [];
            const ndArray = [a.n, a.d];
            for (let ndI in ndArray) {
                const nd = ndArray[ndI];
                const newNd = []
                if (nd.length == 1) {
                    const newTerm = [];
                    const term = nd[0]
                    for (let factorI in term) {
                        const factor = term[factorI];
                        newTerm.push([factor[0], fracTwoMultiply(factor[1], b)])
                    }
                    newNd.push(newTerm);
                } else {
                    if (nd.length == 2 && b.value() == 2) {
                        console.log('a+b^2')
                        const g = fracMultiply(toFrac(nd), toFrac(nd));
                        newNd.push(...g.n)
                    }
                    else
                        newNd.push([[new frac(nd, [[[1, 1]]]), b]])
                }
                result.push(newNd);
            }
            return new frac(result[0], result[1], { flag: 'pow frac' })
        } else {
            return new frac([
                [
                    [a, b]
                ]
            ], [
                [
                    [1, 1]
                ]
            ])
        }
    };

    function isPowInt(a, b) {
        let value = false;
        if (typeof a == "number" && typeof b == "number") {
            value = Math.pow(a, b);
        }
        else if (typeof a == "object" && typeof b == "object") {
            value = Math.pow(a.value(), b.value())
        }
        else if ((typeof a == "number" && typeof b == "object") || (typeof a == "object" && typeof b == "number")) {
            if (typeof (a) == 'number') {
                value = Math.pow(a, b.value())
            }
            if (typeof (b) == 'number' && a.simple) {
                value = Math.pow(a.value(), b)
            }
        }
        if (Number.isInteger(value)) return value
        return false;
    };

    function toFrac(arg) {
        if (typeof arg == 'number') return new frac(arg, 1)
        if (typeof arg == 'object' && Array.isArray(arg)) return new frac(arg, [[[1, 1]]], { doNotProcess: true })
        return arg;
    }

    function fractionalPart(arg) {
        return fracTwoAdd(arg, - Math.floor(arg.value()))
    }

    function cos2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[2, 1]]]))
        return (fracTwoAdd(1, fracTwoMultiply(fracPow(new frac(tmp.n, tmp.d, { func: 'sin', flag: 'first sin' }), 2), -2)))
    }

    function cos1_2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1], [2, 1]]], [[[1, 1]]]))
        let g = fracPow(fracTwoMultiply(fracTwoAdd(new frac(tmp.n, tmp.d, { func: 'cos' }), 1), value1_2), value1_2)
        if (Math.cos(arg.value() * Math.PI) < 0) g = fracMultiply(g, -1);
        return g;
    }

    function cos3x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[3, 1]]]))
        const tmp2 = new frac(tmp.n, tmp.d, { func: 'cos' })
        return fracTwoAdd(fracTwoMultiply(fracPow(tmp2, 3), 4), fracTwoMultiply(tmp2, -3))
    }

    function sin2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[2, 1]]]))
        return fracMultiply(2, new frac(tmp.n, tmp.d, { func: 'sin', flag: 'last sin' }), new frac(tmp.n, tmp.d, { func: 'cos', flag: 'last cos' }))
    }

    function sin1_2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1], [2, 1]]], [[[1, 1]]]))
        let g = fracPow(fracTwoMultiply(fracTwoAdd(fracTwoMultiply(new frac(tmp.n, tmp.d, { func: 'cos' }), -1), 1), value1_2), value1_2)
        if (Math.sin(arg.value() * Math.PI) < 0) g = fracTwoMultiply(g, -1);
        return g;
    }

    function sin3x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[3, 1]]]))
        const tmp2 = new frac(tmp.n, tmp.d, { func: 'sin' })
        return fracTwoAdd(fracTwoMultiply(tmp2, 3), fracTwoMultiply(fracPow(tmp2, 3), -4))
    }

    function tan2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[2, 1]]]))
        const tmp2 = new frac(tmp.n, tmp.d, { func: 'tan' })
        return fracTwoMultiply(fracTwoMultiply(tmp2, 2), fracTwoAdd(1, fracTwoMultiply(-1, fracPow(tmp2, 2))).reciprocal())
    }

    function tan1_2x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1], [2, 1]]], [[[1, 1]]]))
        const tmp2 = new frac(tmp.n, tmp.d, { func: 'cos' });
        let g = fracPow(fracTwoMultiply(fracTwoAdd(fracTwoMultiply(tmp2, -1), 1), fracTwoAdd(tmp2, 1).reciprocal()), value1_2)
        if (Math.tan(arg.value() * Math.PI) < 0) g = fracTwoMultiply(g, -1);
        return g;
    }

    function tan3x(arg) {
        const tmp = fracTwoMultiply(arg, new frac([[['pi', 1]]], [[[3, 1]]]))
        const tmp2 = new frac(tmp.n, tmp.d, { func: 'tan' })
        return fracTwoMultiply(fracTwoAdd(fracTwoMultiply(tmp2, 3), fracTwoMultiply(fracPow(tmp2, 3), -1)), fracTwoAdd(1, fracTwoMultiply(fracPow(tmp2, 2), -3)).reciprocal())
    }
}

//the frac class
class frac {
    // data structure

    // let x = new frac([
    //      numerator here
    //     [[the number or constant, the power to which it is raised],[the number or constant, the power to which it is raised],...], // numerator term1
    //     [[the number or constant, the power to which it is raised],[the number or constant, the power to which it is raised],...], // numerator term2
    //     .
    //     .
    //     .
    // ], [
    //      denominator here
    //     [[the number or constant, the power to which it is raised],[the number or constant, the power to which it is raised],...], // denominator term1
    //     [[the number or constant, the power to which it is raised],[the number or constant, the power to which it is raised],...], // denominator term2
    //     .
    //     .
    //     .
    // ]);

    // instead of passing two arrays, you can also pass two numbers
    // new frac(numerator, denominator)
    // to construct a simple fraction.

    //returns the powers and indices of factors with integer bases

    intFactors(
        term,
        integerFactorsIndices,
        integerFactorPowers
    ) {
        for (let factorI in term) {
            const factor = term[factorI];
            if (Number.isInteger(factor[0])) {
                if (typeof (factor[0]) == 'object' && factor[0].func) continue;
                if (!(indexOfObj(integerFactorPowers, factor[1]) + 1))
                    integerFactorPowers.push(factor[1]);
                integerFactorsIndices.push(factorI);
            }
        }
    };

    //removes indices from an array
    scrubIndices(scrubFrom, indices) {
        indices.sort();
        for (let i = indices.length - 1; i >= 0; i--) scrubFrom.splice(indices[i], 1);
    };

    constructor(arr1, arr2, modifiers = { func: false, renderInput: false, doNotProcess: false, simple: false, flag: '' }) {
        this.func = modifiers.func
        this.flag = modifiers.flag
        this.simple = modifiers.simple;

        //judge whether the fraction is simple
        if (typeof arr1 == "number" && typeof arr2 == "number") {
            this.simple = true;
            let gcd = 1;
            if (!modifiers.doNotProcess && arr2 != 1) {
                let a = arr1.countDecimals()
                let b = arr2.countDecimals()
                if (b > a) a = b
                arr1 *= Math.pow(10, a);
                arr2 *= Math.pow(10, a);

                gcd = gcd_f2(arr1, arr2);
            }
            arr1 = [
                [
                    [arr1 / gcd, 1]
                ]
            ];
            arr2 = [
                [
                    [arr2 / gcd, 1]
                ]
            ];
        }
        const ndArray = [arr1, arr2];
        this.n = arr1;
        this.d = arr2;

        //func defs
        {
            //assign default powers of one
            this.assignDefVal = function () {
                for (let nd of ndArray) {
                    for (let term of nd) {
                        for (let factor of term) {
                            if (!factor[1]) factor[1] = 1;
                        }
                    }
                }
            };

            //assign numerator and denominator terms to object properties .n and .d
            this.assignNd = function () {
                ndArray.splice(0, 2)
                ndArray.push(arr1, arr2)
                this.n = arr1;
                this.d = arr2;
            }

            //get rid of factors which evaluate to 1, and the term itself if one of the factors evaluate to 0
            this.scrubUnities = function () {
                for (let nd of ndArray) {
                    const termsToScrub = [];
                    let termsWhichEvalTo1 = 0;
                    loop1: for (let termI in nd) {
                        const term = nd[termI]
                        const factorsToScrub = [];
                        for (let factorI = 0; factorI < term.length; factorI++) {
                            const factor = term[factorI]
                            //remove redundant simple fractions
                            for (let x in factor)
                                if (factor[x].simple && factor[x].d[0][0][0] == 1)
                                    factor[x] = factor[x].n[0][0][0]

                            //deal with factors which evaluate to 1 or 0;
                            if (factor[0] == 1 || factor[1] == 0) {
                                factorsToScrub.push(factorI);
                            }
                            else if (factor[0] == 0) {
                                termsToScrub.push(termI);
                                continue loop1;
                            }
                        }
                        this.scrubIndices(term, factorsToScrub);
                        if (term.length == 0) {
                            termsToScrub.push(termI)
                            termsWhichEvalTo1++;
                            continue loop1;
                        }
                    }
                    this.scrubIndices(nd, termsToScrub);
                    if (termsWhichEvalTo1) nd.push([[termsWhichEvalTo1, 1]])
                    if (!nd.length) nd.push([[0, 1]])
                }

                //simplify redundant cascading fractions
                for (let ndI in ndArray) {
                    const nd = ndArray[ndI];
                    if (nd.length == 1 &&
                        typeof nd[0][0][0] == 'object' &&
                        nd[0][0][1] == 1 &&
                        nd[0][0][0].n.length > 1 &&
                        nd[0][0][0].d.length == 1 &&
                        nd[0][0][0].d[0][0][0] == 1
                    ) {
                        const tmp = cloneObj(nd[0][0][0].n)
                        ndArray[ndI].splice(0, nd.length)
                        ndArray[ndI].push(...tmp)
                    }
                }
            };

            //non-destructive reciprocation
            this.reciprocal = function () {
                const newMod = { ...modifiers }
                newMod.simple = this.simple;
                newMod.flag = 'reciprocal';
                newMod.doNotProcess = true;
                return new frac(arr2, arr1, newMod)
            }

            //serialize the frac object into latex
            this.stringify = function (factor = undefined) {
                if (factor == undefined) console.log(this)
                if (factor != undefined) {
                    switch (typeof factor) {
                        case "number":
                            return factor;
                        case "object":
                            return `{${factor.stringify()}}`;
                        case "string":
                            return `\\${factor}`;
                    }
                }

                let str = "";
                const Dis1 = ndArray[1][0][0][0] == 1;
                if (!Dis1) str += '\\frac'

                for (let nd in ndArray) {
                    if (ndArray[nd].length == 1 && ndArray[nd][0].length == 1 && ndArray[nd][0][0][0] == 1) {
                        if (nd == 0) {
                            str += '{1}'
                            continue;
                        }
                        break;
                    }

                    nd = ndArray[nd]
                    str += "{";

                    for (let termI in nd) {
                        const term = nd[termI];
                        let lastFactorWasNumber = false;
                        for (let factorI in term) {
                            const factor = term[factorI];
                            let base = this.stringify(factor[0]);
                            if (typeof factor[1] == "object" && factor[1].simple) {
                                const power = [
                                    factor[1].n[0][0][0],
                                    factor[1].d[0][0][0],
                                ];
                                if (power[0] !== 1 && typeof (factor[0]) == "object") base = `(${base})`;
                                if (lastFactorWasNumber && typeof (factor[0]) !== "object" && power[1] == 1) base = `\\cdot${base}`
                                str += `${power[1] == 1 ? '' : `\\sqrt${power[1] == 2 ? "" : `[${power[1]}]`}`}{${base}${power[0] == 1 ? "" : `^{${power[0]}}`}}`;
                            } else {
                                const power = this.stringify(factor[1]);
                                if (typeof factor[0] == "object" && !factor[0].func && !(term.length == 1 && factor[0].n.length == 1)) {
                                    if (factor[0].d.length == 1 && factor[0].d[0][0][0] == 1) base = `(${base})`
                                    else base = `\\Big(${base}\\Big)`
                                }
                                else if (lastFactorWasNumber && typeof factor[0] == "number") base = `\\cdot${base}`
                                if (factor[0] == -1 && factorI == 0 && term.length != 1) base = '-'
                                if (factor[0].func)
                                    str += '~' + base.replace(' ', `${power == 1 ? "" : `^{${power}}`}`)
                                else
                                    str += `${base}${power == 1 ? "" : `^{${power}}`}`;
                            }
                            lastFactorWasNumber = Number.isInteger(factor[0]);
                        }
                        str += "+";
                    }
                    str = str.slice(0, -1);
                    str += "}";
                }
                if (this.func) {
                    str = `\\${this.func} {${Dis1 ? '' : '\\Big('}${str}${Dis1 ? '' : '\\Big)'}}`
                    //                  ^^^ DO NOT REMOVE THIS WHITESPACE!
                }
                str = str.replace(/\+\-/g, '-')
                return str;
            }

            //compute value
            this.value = function (factor = undefined) {
                if (factor != undefined) {
                    switch (typeof factor) {
                        case "number":
                            return factor;
                        case "object":
                            return factor.value();
                        case "string":
                            switch (factor) {
                                case 'pi':
                                    return Math.PI;
                                case 'e':
                                    return Math.E;
                            }
                    }
                    return;
                }
                if (this.simple)
                    return arr1[0][0][0] / arr2[0][0][0]

                const result = []
                for (let index in ndArray) {
                    const nd = ndArray[index]
                    let sum = 0;
                    for (let term of nd) {
                        let product = 1;
                        for (let factor of term) {
                            product *= Math.pow(this.value(factor[0]), this.value(factor[1]))
                        }
                        sum += product;
                    }
                    result[index] = sum;
                }
                if (this.func) {
                    let func = this.func
                    switch (func) {
                        case 'arccos':
                            func = 'acos'
                            break;
                        case 'arcsin':
                            func = 'asin'
                            break;
                        case 'arctan':
                            func = 'atan'
                    }
                    return Math[func](result[0] / result[1])
                }
                return result[0] / result[1];
            };

            // for testing
            this.testRender = function (opts = { note: '', noteOnly: false, flag: '' }) {
                if (opts.flag && opts.flag !== this.flag) return;

                if (opts.noteOnly) {
                    document.querySelector("h1").innerHTML += opts.note + '<br>'
                    return;
                }
                let str = this.stringify();
                document.querySelector("h1").innerHTML += opts.note + "<br>$$ " + str + "$$";
                setTimeout(() => MathJax.typeset(), 100);

            }

            //combine like terms
            this.consolidate = function () {
                //scrub any redundant factors.
                this.scrubUnities();

                //evaluate certain terms
                for (let ndI in ndArray) {
                    const nd = ndArray[ndI];
                    const termsToScrub = [];
                    const newTerms = [];
                    for (let termI in nd) {
                        const term = nd[termI]
                        let simplify = false;
                        for (let factor of term)
                            if (typeof factor[0] == 'object' && !(factor[0].d.length == 1 && factor[0].d[0][0][0] == 1) && !factor[0].func) simplify = true;
                        if (simplify) {
                            let product = new frac(1, 1)
                            for (let factor of term)
                                product = fracTwoMultiply(product, fracPow(factor[0], factor[1]));
                            termsToScrub.push(termI);
                            for (let term of product.n)
                                newTerms.push([...term, [toFrac(product.d).reciprocal(), 1]])
                        }
                    }
                    this.scrubIndices(nd, termsToScrub);
                    nd.push(...newTerms);
                }

                //combine like terms
                for (let ndI in ndArray) {
                    const nd = ndArray[ndI]
                    const termsToScrub = [];
                    const nonIntegerCoeffs = [];
                    loop1: for (let termI in nd) {
                        const term = nd[termI]
                        let product = 1;
                        const factorsToScrub = [];
                        for (let factorI in term) {
                            const factor = term[factorI];
                            if (typeof (factor[0]) == 'object' && factor[0].func) continue;
                            const result = isPowInt(factor[0], factor[1]);
                            if (result != false) {
                                if (result == 0) {
                                    termsToScrub.push(termI)
                                    continue loop1;
                                } else {
                                    factorsToScrub.push(factorI)
                                    product *= result;
                                    continue;
                                }
                            }
                            if (typeof (factor[0]) == 'object' &&
                                factor[0].n[0][0][0] == 1 &&
                                factor[0].n.length == 1 &&
                                factor[0].d[0][0][1] == 1) {
                                //reciprocate
                                if (Number.isInteger(factor[0].d[0][0][0]))
                                    term[factorI] = [factor[0].d[0][0][0], fracMultiply(factor[1], -1)]
                            }
                        }
                        this.scrubIndices(term, factorsToScrub)
                        const nonIntegerCoeff = JSON.stringify(term)
                        if (nonIntegerCoeffs.includes(nonIntegerCoeff)) {
                            for (let x = 0; x < nonIntegerCoeffs.length; x++) {
                                if (nonIntegerCoeffs[x] == nonIntegerCoeff) {
                                    product += nd[x][nd[x].length - 1][0]
                                    termsToScrub.push(x)
                                }
                            }
                        } else
                            nonIntegerCoeffs.push(nonIntegerCoeff)
                        term.push([product, 1])
                    }
                    this.scrubIndices(nd, termsToScrub);
                }
                this.scrubUnities();
            };

            //factorize all terms
            this.factorize = function () {
                //factorize and consolidate
                for (let nd of ndArray) {
                    for (let term of nd) {
                        //factorize all factors with integer bases
                        const integerFactorsIndices = [];
                        const integerFactorPowers = [];
                        this.intFactors(term, integerFactorsIndices, integerFactorPowers);
                        let toAppend = [];

                        for (let power of integerFactorPowers) {
                            const strPow = JSON.stringify(power)
                            let base = 1;
                            let negs = 0;
                            for (let index of integerFactorsIndices) {
                                if (JSON.stringify(term[index][1]) == strPow) {
                                    if (term[index][0] < 0) negs++
                                    base *= term[index][0];
                                }
                            }
                            base = Math.abs(base)
                            if (base != 0) {
                                if (negs)
                                    toAppend.push([-1, fracMultiply(negs, power)])

                                const primeFactorization = primeFactorize(base);
                                const toAppend2 = [];
                                for (let primeFactor of primeFactorization) {
                                    toAppend2.push([primeFactor[0], fracMultiply(primeFactor[1], power)])
                                }
                                toAppend.push(...toAppend2);
                            } else {
                                toAppend.push([0, 1])
                            }
                        }


                        // remove the old factors...
                        this.scrubIndices(term, integerFactorsIndices);
                        //and the add the new ones!
                        if (integerFactorsIndices.length) term.push(...toAppend);


                        //consolidate different factors with the same base into one factor.
                        const repeatedBases = [];
                        const checkedBases = [];
                        const allRepeatedIndices = [];
                        for (let factor in term) {
                            if (checkedBases.indexOf(JSON.stringify(term[factor][0])) < 0) {
                                const repeatedBase = [term[factor][0],
                                [factor]
                                ];
                                for (let factor2 in term) {
                                    if (
                                        factor != factor2 &&
                                        JSON.stringify(term[factor][0]) ===
                                        JSON.stringify(term[factor2][0])
                                    ) {
                                        repeatedBase[1].push(factor2);
                                    }
                                }
                                if (repeatedBase[1].length > 1) {
                                    repeatedBases.push(repeatedBase);
                                    allRepeatedIndices.push(...repeatedBase[1]);
                                }
                                checkedBases.push(JSON.stringify(term[factor][0]));
                            }
                        }


                        toAppend = [];
                        for (let repeatedBase of repeatedBases) {
                            let power = 0;
                            for (let i = 0; i < repeatedBase[1].length; i++) {
                                power = fracAdd(power, term[repeatedBase[1][i]][1]);
                            }
                            toAppend.push([repeatedBase[0], power]);
                        }
                        this.scrubIndices(term, allRepeatedIndices)
                        term.push(...toAppend);
                    }
                }
                //scrub any redundant factors.
                this.scrubUnities();
            };

            //simplify the fraction by dividing the numerator and denominator by their gcd. Simplify redundant cascading fractions.
            this.simplify = function () {
                //compute the gcd
                let commonFactors = gcdFrac([...arr1, ...arr2]);

                //divide by the gcd
                for (let commonFactor of commonFactors) {
                    for (let nd of ndArray) {
                        for (let term of nd) {
                            const index = indexOfObj(firstElIn2dArr(term), commonFactor[0]);
                            term[index][1] = fracAdd(
                                term[index][1],
                                fracMultiply(commonFactor[1], -1)
                            );
                            if (term[index][1] == 0) {
                                term.splice(index, 1);
                            }
                        }
                    }
                }
                this.scrubUnities();
            };

            //format output in the conventional way
            this.humanize = function () {
                for (let nd of ndArray) {
                    for (let term of nd) {
                        let integerFactorsIndices = [];
                        let integerFactorPowers = [];
                        this.intFactors(term, integerFactorsIndices, integerFactorPowers);


                        //reduce n-th radicals
                        let toRemove = [];
                        let toAppend = [];
                        for (let integerFactorsIndex of integerFactorsIndices) {
                            const factor = term[integerFactorsIndex];
                            if (typeof (factor[1]) == 'object' &&
                                factor[1].simple &&
                                factor[1].n[0][0][0] > factor[1].d[0][0][0]) {
                                // console.log(integerFactorsIndex)
                                toRemove.push(integerFactorsIndex);
                                toAppend.push([factor[0], Math.floor(factor[1].n[0][0][0] / factor[1].d[0][0][0])],
                                    [factor[0], new frac(factor[1].n[0][0][0] % factor[1].d[0][0][0], factor[1].d[0][0][0])])
                            }
                        }
                        this.scrubIndices(term, toRemove);
                        term.push(...toAppend)


                        //evaluate select powers
                        toRemove = [];
                        toAppend = [];
                        for (let factorI in term) {
                            const factor = term[factorI];
                            if (typeof (factor[0]) == 'object' && factor[0].func) continue;
                            if (typeof factor[0] == 'number') {
                                if (typeof (factor[1]) == 'object' && factor[1].simple) {
                                    const base = Math.pow(factor[0], factor[1].n[0][0][0]);
                                    if (base < 1000) {
                                        toRemove.push(factorI);
                                        toAppend.push([Math.pow(factor[0], factor[1].n[0][0][0]), new frac(1, factor[1].d[0][0][0])])
                                    }
                                } else
                                    if (typeof (factor[1]) == 'number') {
                                        const base = Math.pow(factor[0], Math.abs(factor[1]));
                                        if (base < 1000) {
                                            toRemove.push(factorI);
                                            if (factor[1] > 0) toAppend.push([base, 1])
                                            else toAppend.push([new frac(1, base), 1])
                                        }
                                    }
                            }
                        }
                        this.scrubIndices(term, toRemove);
                        term.push(...toAppend)


                        //combine select radicals
                        integerFactorsIndices = [];
                        integerFactorPowers = [];
                        toRemove = [];
                        toAppend = [];
                        this.intFactors(term, integerFactorsIndices, integerFactorPowers);

                        powerLoop: for (let power of integerFactorPowers) {
                            const stringifiedPower = JSON.stringify(power);
                            const factorsWithThisPower = [];
                            for (let factor of integerFactorsIndices) {
                                if (JSON.stringify(term[factor][1]) == stringifiedPower) {
                                    factorsWithThisPower.push(factor)
                                }
                            }
                            let base = 1;
                            for (let factor of factorsWithThisPower) {
                                base *= term[factor][0]
                                if (base > 999) break powerLoop;
                            }
                            toRemove.push(...factorsWithThisPower);
                            toAppend.push([base, power])
                        }
                        this.scrubIndices(term, toRemove);
                        term.push(...toAppend);
                    }
                }

                //organize factors in the order of whole numbers, radicals, and constants
                for (let nd of ndArray) {
                    loop1: for (let term of nd) {
                        let wholeNumber = 1;
                        const radicals = [];
                        const constants = [];
                        const functions = []
                        for (let factor of term) {
                            if (typeof (factor[0]) == 'object' && factor[0].func) { functions.push(factor); continue; }
                            const result = isPowInt(factor[0], factor[1]);
                            if (result != false) {
                                if (result == 0) {
                                    nd.splice(indexOfObj(nd, term));
                                    continue loop1;
                                } else {
                                    wholeNumber *= result
                                }

                            } else
                                if (typeof (factor[0]) == 'string') {
                                    constants.push(factor)
                                } else {
                                    radicals.push(factor)
                                }
                        }
                        for (let i = term.length - 1; i >= 0; i--) term.splice(i, 1);
                        term.push([wholeNumber, 1], ...radicals, ...functions, ...constants)
                    }
                }
                this.scrubUnities();
            };

            //attempt to evaluate the value if the fraction is an argument to a function
            this.evalFunc = function () {
                //replace the function with the computed result
                const replaceArgWithResult = (result) => {
                    if (!result) throw "The argument is not in the function's domain"
                    this.func = false;
                    arr1 = result.n;
                    arr2 = result.d;
                    this.simple = result.simple;
                    this.assignNd();
                }

                //obtain the coefficient of pi in the angle expression
                const coefficientOfPi = () => {
                    //temporary solution
                    const tmp = firstElIn2dArr(arr1[0]);
                    if (tmp.includes('pi')) {
                        if (arr1[0].length == 1) return new frac(1, arr2[0][0][0])
                        return toFrac(fracTwoMultiply(fractionalPart(fracTwoMultiply(new frac(arr1[0][0][0], arr2[0][0][0]), value1_2)), 2));
                    } else if (arr1[0][0][0] == 0) return new frac(0, 1);
                    return false;
                }

                //check if an angle is constructible
                const checkIfConstructible = function (angle) {
                    //determine if the ratio is constructible
                    angle = [angle.n[0][0][0], angle.d[0][0][0]]
                    const factorization = primeFactorize(angle[1])
                    for (let factor of factorization)
                        if (!((fermatPrimes.includes(factor[0]) && factor[1] == 1) || (factor[0] == 2)))
                            return false;
                    return true;
                }

                //check if the angle exists in the standard angle definitions
                const checkStandardAngles = (coeff, index) => {
                    if (allStdAngles.includes(coeff.stringify())) {
                        replaceArgWithResult(standardAngles[coeff.stringify()][index]);
                        return true;
                    }
                    return false;
                }

                //evaluate the function
                const constructAngle = (func2x, func1_2x, func3x, index) => {
                    const coeff = coefficientOfPi();
                    // console.log(this.flag, coeff.stringify())
                    if (!checkStandardAngles(coeff, index) && checkIfConstructible(coeff)) {
                        //attempt to obtain an expression for the trig function;


                        mainLoop: for (let angle of allStdAnglesFrac) {
                            let tmp = toFrac(fracTwoMultiply(coeff, angle.reciprocal()));
                            tmp.factorize();
                            let power2 = 0;
                            let power3 = 0;
                            for (let ndI in [tmp.n, tmp.d]) {
                                for (let factor of [tmp.n, tmp.d][ndI][0]) {
                                    if (!([1, 2, 3].includes(factor[0]) && Number.isInteger(factor[1]))) continue mainLoop;
                                    if (factor[0] == 2) power2 = factor[1] * (ndI == 0 ? 1 : -1);
                                    if (factor[0] == 3) power3 = factor[1] * (ndI == 0 ? 1 : -1);
                                }
                            }
                            console.log(power2, power3);
                            if (power2 > 0) {
                                replaceArgWithResult(func2x(coeff))
                            }
                            else if (power2 < 0) {
                                replaceArgWithResult(func1_2x(coeff))
                            }
                            else if (power3 > 0) {
                                replaceArgWithResult(func3x(coeff))
                            }
                            break;
                        }
                    }
                }

                //arguments for trig functions MUST be in radians, and expressed in terms of pi to be evaluated
                //if the function can evaluated and simplified in a way such that the result can be expressed algebraically, evaluate it
                if (arr1.length == 1 && arr2.length == 1 && arr1[0].length <= 2) {
                    switch (this.func) {
                        case 'sin':
                            constructAngle(sin2x, sin1_2x, sin3x, 0);
                            break;
                        case 'cos':
                            constructAngle(cos2x, cos1_2x, cos3x, 1);
                            break;
                        case 'tan':
                            constructAngle(tan2x, tan1_2x, tan3x, 2);
                    }
                }
            };

            //check if the fraction is simple in disguise or evaluates to a simple fraction
            this.checkIfSimple = function () {
                if (!this.simple) {
                    if (arr1.length == 1 &&
                        arr2.length == 1 &&
                        arr1[0].length == 1 &&
                        arr2[0].length == 1 &&
                        Number.isInteger(arr1[0][0][0]) &&
                        Number.isInteger(arr2[0][0][0]) &&
                        arr1[0][0][1] == 1 &&
                        arr2[0][0][1] == 1) { this.simple = true; return }

                    //if the expression evaluates to a number, convert it into a simple fraction
                    const value = this.value();
                    if (Number.isInteger(value)) {
                        this.simple = true;
                        arr1 = [
                            [
                                [value, 1]
                            ]
                        ];
                        arr2 = [
                            [
                                [1, 1]
                            ]
                        ]
                        this.assignNd();
                    }
                }
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        this.assignDefVal();
        this.checkIfSimple();
        if (!modifiers.doNotProcess) {
            const a = 'boo'
            if (!this.simple) {
                if (this.flag == a) { this.testRender({ note: 'input' }); console.log(cloneObj(this)) }

                this.consolidate();
                if (this.flag == a) this.testRender({ note: 'consolidate' })

                this.factorize();
                if (this.flag == a) this.testRender({ note: 'factorize' })

                this.simplify();
                if (this.flag == a) this.testRender({ note: 'simplify' })

                this.humanize();
                if (this.flag == a) this.testRender({ note: 'output' })

            }
            if (this.func) {
                this.evalFunc();
                console.log('here')
                if (this.flag == a) this.testRender({ note: 'evalFunc' })
            }
        }
    }
}

//experimental
setTimeout(() => {
    const st = performance.now();
    const a = new frac([
        [
            [25]
        ], [
            [10],
            [new frac([
                [
                    [1, 1],
                    ['pi', 1],
                ]
            ], [
                [
                    [30, 1]
                ]
            ], { func: 'cos', flag: 'parent' }), 2],
            ['phi', 'psi'],
            [2, 2]
        ]
    ], [
        [
            [3, new frac(2, 3)],
            [10, 1]
        ]
    ], { flag: 'boo' })

    // const a = new frac([
    //     [
    //         [1],
    //         ['pi'],
    //     ]
    // ], [
    //     [
    //         [15]
    //     ]
    // ], { func: 'sin', flag: 'parent', doNotProcess: true})
    // const b = fracTwoAdd(new frac([[[1, 1]]], [[[6, 1], ['pi', 1]]]), new frac([[[1, 1]]], [[[4, 1], ['pi', 1]]]));
    // console.log(b.stringify());
    console.log('performance: ', performance.now() - st);
}, 100);

//housekeeping
if (typeof Storage !== "undefined") {
    const a = localStorage.getItem("visited");
    if (!a) {
        localStorage.setItem("visited", "notified");
        toast(
            "Hard refresh required",
            "Our website's been updated! We suggest you hard refresh.",
            true
        );
    } else {
        if (a == "notified") {
            toast(
                "Heya!",
                "Our website just got a new face! How'd you like it?",
                true
            );
        }
        localStorage.setItem("visited", "ok");
    }
} else {
    console.log("no webstorage support");
}