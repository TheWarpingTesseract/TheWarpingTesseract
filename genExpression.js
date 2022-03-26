let min = 10;
let concatLimit = 1;
let solutions = [];
let shortestSolutions = [];
const el = document.querySelector('#genExpressionOut');
const genExp_worker = new Worker('genExpWorker.js');
let isWorking = false;


let GEuserConfig = {
    min: 7,
    concatLimit: 1,
    notAsterisk: false,
    add: true,
    sub: true,
    mul: true,
    div: true,
    pow: true,
    conc: true,
}

function recurseWorker(D, N, GEuserConfig, callback) {
    isWorking = true;
    genExp_worker.addEventListener('message', handleMessage);
    const start = performance.now();
    if (!GEuserConfig.conc) {
        GEuserConfig.concatLimit = 0;
        console.log('conc')
    }
    //send the data to the service worker to compute
    genExp_worker.postMessage({ 'D': D, 'N': N, 'userConfig': {...GEuserConfig } });

    function handleMessage(obj) {
        isWorking = false;
        genExp_worker.removeEventListener('message', handleMessage)
            // console.log(obj.data)
        const end = performance.now()
        console.log('computation time:', end - start)
        min = obj.data.min;
        solutions = [...obj.data.solutions]
        callback();
    }
}

function genExpression(form) {
    if (isWorking) {
        toast('Please Wait', "A computation hasn't finished yet.")
        return;
    }
    min = GEuserConfig.min;
    concatLimit = GEuserConfig.concatLimit;
    if (!GEuserConfig.conc) {
        concatLimit = 0;

    }
    solutions = []
    shortestSolutions = []
    const N = parseInt(form.genExpFormN.value)
    const D = parseInt(form.genExpFormD.value)
    el.innerHTML = 'One Mississippi, two Mississippi, three Mississippi... <span class = "genExpLoading"></span>';
    ASCIIloading.playLoadingAnim('.genExpLoading');
    recurseWorker(D, N, {...GEuserConfig }, callbackGenExpression);
}

function callbackGenExpression() {
    ASCIIloading.stopLoadingAnim();
    solutions = solutions.sort((a, b) => a.length - b.length);
    console.log(solutions)
    let solnString = [];
    //parse the output
    el.innerHTML = ''
    if (solutions.length) {
        let p = 0;
        while (p < solutions.length && solutions[p].length === solutions[0].length) {
            shortestSolutions.push(solutions[p])
            solnString.push(expStringify(solutions[p]));
            p++;
        }

        //among them, get the strings which are the shortest length
        let minStrLength = solnString[0].length
        for (let i = 1; i < solnString.length; i++) {
            minStrLength = Math.min(minStrLength, solnString[i].length)
        }
        let solnString2 = [];
        for (let i in solnString) {
            if (solnString[i].length === minStrLength) {
                solnString2.push(solnString[i]);
            }
        }

        //display them
        for (let i in solnString2) {
            el.innerHTML += `<div class='MathJaxExp' data-ascii-math = '${solnString2[i]}'>\`${solnString2[i]}\`,</div>`;
        }
        el.innerHTML = el.innerHTML.slice(0, -7) + '</div>';
        el.innerHTML += `A total of ${solutions.length} expression(s) were found. <a onclick='showAllSolutions()'>Show all</a>`

        //add the contextmenu listeners
        addCtx('.MathJaxExp', 'data-ascii-math');

        //tell mathJax to comb through the page again for math expressions
        MathJax.typeset();
    } else {
        el.innerHTML = 'No compliant expressions were found. Changing your preferences might help.'
    }
}


function showAllSolutions() {
    el.innerHTML = '';
    const solnString = [];
    for (let i in solutions) {
        solnString.push(expStringify(solutions[i]));
    }
    for (let i in solnString) {
        el.innerHTML += `<div class='MathJaxExp' data-ascii-math = '${solnString[i]}'>\`${solnString[i]}\`,</div>`;
    }
    el.innerHTML = el.innerHTML.slice(0, -7) + '</div>';
    addCtx('.MathJaxExp', 'data-ascii-math');
    MathJax.typeset();
}


function expStringify(arr) {
    let parenthesis = '';
    for (let j = 0; j <= arr.length - 2; j++) {
        parenthesis += '(';
    }
    let x = `${parenthesis} ${arr[0]}`;
    for (let j = 1; j < arr.length; j++) {
        x += ` ${arr[j]} ) `
    }
    if (GEuserConfig.notAsterisk) {
        x = x.replace(/\*/g, '&#215;');
    }
    return x;
}


function addCtx(className, attribName) {
    let expressions = document.querySelectorAll(className);
    for (let i = 0; i < expressions.length; i++) {
        expressions[i].addEventListener('contextmenu', function(e) {
            //function called every time a math expression is clicked 
            e.preventDefault();
            console.log(e, expressions[i]);
            activeExpression = expressions[i].getAttribute(attribName);
            if (!isMenuActive) {
                toggleMenuOn(e)
            } else {
                toggleMenuOff()
            }
        })
    }
}



const menu = document.querySelector("#contextMenu");
let isMenuActive = false;
const activeMenuClass = "contextMenuActive";
let activeExpression;

function toggleMenuOn(e) {
    isMenuActive = true;
    const pos = getPosition(e);
    console.log(pos);
    menu.style.top = 0;
    menu.style.left = 0;
    menu.classList.add(activeMenuClass);
    const windowWidth = window.innerWidth;
    const windowHeight = document.documentElement.getBoundingClientRect().height;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    console.log(menuWidth, menuHeight, windowWidth, windowHeight)
    if (windowWidth - pos.x < (menuWidth + 5)) {
        menu.style.left = windowWidth - menuWidth - 5 + "px";
    } else {
        menu.style.left = pos.x + 'px';
    }
    if (windowHeight - pos.y < (menuHeight + 5)) {
        menu.style.top = windowHeight - menuHeight - 5 + "px";
    } else {
        menu.style.top = pos.y + 'px';
    }
}

function toggleMenuOff() {
    isMenuActive = false;
    menu.classList.remove(activeMenuClass);
}
document.addEventListener("click", function(e) {
    toggleMenuOff();
})
onkeydown = function(e) {
    if (e.key === 'Escape') {
        toggleMenuOff();
    }
}
onresize = function(e) {
    toggleMenuOff();
};

function getPosition(e) {
    let posx = 0;
    let posy = 0;

    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
}

function copyExp() {
    console.log(activeExpression);
    copyAnything(activeExpression);
}



/////////////////////////////////////////////////////////////

function genExpressionUpdate(form) {
    GEuserConfig.min = parseInt(form.level.value);
    GEuserConfig.concatLimit = parseInt(form.concatLimit.value);
    GEuserConfig.add = form.add.checked;
    GEuserConfig.pow = form.pow.checked;
    GEuserConfig.sub = form.sub.checked;
    GEuserConfig.mul = form.mul.checked;
    GEuserConfig.div = form.div.checked;
    GEuserConfig.conc = form.conc.checked;
    GEuserConfig.notAsterisk = form.notAsterisk.checked;
}

function genExpressionReset() {
    el.innerHTML = '';
    closeMenu('genExpression');
    GEuserConfig = {
        min: 7,
        concatLimit: 1,
        notAsterisk: false,
        add: true,
        sub: true,
        mul: true,
        div: true,
        pow: true,
        conc: true,
    }
}
////////////////////////////////////////////////////////////