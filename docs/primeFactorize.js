function primeFactorizeUser(form) {
    let num = form.primeFactorizeInp1.value;
    let output = document.querySelector('#primeFactorizeOut');
    const primeFactorization = primeFactorize(num);
    let outString = '';
    for (let i = 0; i < primeFactorization.length; i++) {
        outString += `${primeFactorization[i][0]}^${primeFactorization[i][1]} * `
    }
    output.innerHTML = outString ? `\`${outString.slice(0, -3)}\`` : `\`${num}\``;
    MathJax.typeset();
}

