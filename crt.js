let numCong = 2

function crt(form) {
    const out = document.querySelector('#CRTOut');
    const form2 = document.querySelector('#CRTform2');
    if (form === null) {
        numCong = 2
    } else {
        numCong = parseInt(form.CRTnoCongruences.value)
        console.log(numCong)
    }
    if (numCong > 15) {
        form2.innerHTML = '';
        out.innerHTML = 'No more than 15 congruences, please.'
        return;
    }
    if (!numCong) {
        return;
    }


    const template = ["x &#8801; <input onkeydown=\"if(event.key === 'Enter'){crtCompute(this.form); return false;}\" id='", "' type='number'> (mod <input onkeydown=\"if(event.key === 'Enter'){crtCompute(this.form); return false;}\" id='", "' type='number'>)<br>"];
    let outTxt = '';
    for (let i = 1; i <= numCong; i++) {
        outTxt += template[0] + `CRTinput${i}1` + template[1] + `CRTinput${i}2` + template[2]
    }
    outTxt += '<input type="button" onclick="crtCompute(this.form)" value="Go!">'
    form2.innerHTML = outTxt;
    out.innerHTML = '';
}
crt(null);


function crtCompute(form) {
    const out = document.querySelector('#CRTOut');
    console.log(form)
    let numbers = [];
    for (let i = 1; i <= numCong; i++) {
        numbers.push([parseFloat(form[`CRTinput${i}1`].value), parseFloat(form[`CRTinput${i}2`].value)]);
    }
    console.log(numbers)
    const n_i = [];
    const b_i = [];
    let N = 1
    for (let i = 0; i < numbers.length; i++) {
        //numbers[i][0] should be in Z
        if (!Number.isInteger(numbers[i][0]) || !Number.isInteger(numbers[i][1])) {
            out.innerHTML = 'Please provide integer inputs.'
            return;
        }
        //numbers[i][1] should be in N
        if (numbers[i][1] <= 0) {
            out.innerHTML = 'The moduli should be natural numbers.'
            return;
        }
        numbers[i][0] = numbers[i][0] % numbers[i][1] // just in case 
        N *= numbers[i][1]
            //collect all numbers within the mod
        n_i.push(numbers[i][1])
        b_i.push(numbers[i][0])
    }
    for (let i = 0; i < n_i.length; i++) {
        for (let j = 0; j < n_i.length; j++) {
            if (i !== j && gcd_f2(n_i[i], n_i[j]) !== 1) {
                console.log('all of n_i are not pairwise co-prime!', n_i[i], n_i[j])
                out.innerHTML = `The moduli are not pairwise co-prime! The GCD of ${n_i[i]} and ${n_i[j]} is not 1.`
                return;
            }
        }
    }
    const N_i = []
    const x_i = []
    for (let i = 0; i < numbers.length; i++) {
        N_i.push(N / numbers[i][1])
    }
    console.log(N_i);
    for (let i = 0; i < N_i.length; i++) {
        const coeff = []
        gcd_f3(N_i[i], n_i[i], coeff)
        x_i.push(coeff[0])
    }
    let sol = 0;
    for (let i = 0; i < N_i.length; i++) {
        sol += x_i[i] * N_i[i] * b_i[i]
    }
    console.log(sol);
    while (sol - N > 1) {
        sol -= N
    }
    while (sol + N < N) {
        sol += N
    }
    out.innerHTML = `\`${sol} + ${N}t, t ∈ ℤ\`&nbsp; or<br>\`x &#8801; ${sol} (mod ${N})\``
    MathJax.typeset();
}