function primeFactorize(form) {
    let num = form.primeFactorizeInp1.value;
    let output = document.querySelector('#primeFactorizeOut');
    if (parseInt(num) <= 0) {
        output.innerHTML = '';
        return;
    }
    console.log(num, typeof(num));
    let primes = calculateCrap(Math.ceil(num / 2));
    // console.log(primes);
    let factors = calcFactors(num, primes);
    console.log(factors);
    const primeFactorization = [];
    for (let i = 0; i < factors.length; i++) {
        let a = num / factors[i];
        let power = 1;
        while (a % factors[i] === 0) {
            a /= factors[i];
            power++;
        }
        primeFactorization.push([factors[i], power])
        console.log(primeFactorization, i, "from inside loop");
    }
    let outString = '';
    for (let i = 0; i < primeFactorization.length; i++) {
        outString += `${primeFactorization[i][0]}^${primeFactorization[i][1]} * `
    }
    output.innerHTML = outString ? `\`${outString.slice(0, -3)}\`` : `\`${num}\``;
    MathJax.typeset();
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