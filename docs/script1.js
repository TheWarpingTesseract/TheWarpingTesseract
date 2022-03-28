let collGraph = null;
let primeGraph = null;
let PUserConfig = {
    graphIt: true
}

function returnNums(till) {
    const a = [0];
    let b = 1;
    while (b <= till) {
        a.push(b);
        b++;
    }
    return a;
}

function countPrimes(arr) {
    const out = [];
    const max = arr[arr.length - 1]
    let counter = 0;
    for (let i = 0; i <= max; i++) {
        if (arr[counter] <= i) {
            counter++;
        }
        out.push(counter)
    }
    return out;
}



function calcPrimes(formObject) {
    let offsetW = 50;
    let offsetH = 50;
    let fwidth = 0;
    let fheight = 0;
    document.querySelector('#primeCalcOutput').innerText = 'Standardizing the standard model...';
    document.querySelector('#primeNumberCalculator .graphContainer').style.display = 'none';
    let num = formObject.primeCalcFormInp1.value;
    if (num == 1) {
        document.querySelector('#primeCalcOutput').innerText = '1 < smallest prime number';
        return;
    }
    if (primeGraph !== null) {
        primeGraph.destroy();
    }
    let finalArray = [];

    setTimeout(function() {
        const start = performance.now();
        calcPrimes.finalArray = calculateCrap(num);
        console.log('time:', performance.now() - start)
        document.querySelector('#primeCalcOutput').innerHTML = calcPrimes.finalArray.join(', ') + '.';

        // for (let i = 0; i < calcPrimes.finalArray.length; i++) {
        //     console.log(`(i % ${calcPrimes.finalArray[i]} === 0 && i !== ${calcPrimes.finalArray[i]}) ||`);
        // }
        if (PUserConfig.graphIt) {
            const ctx = document.getElementById('primeNumberGraph').getContext('2d');
            const primeCount = countPrimes(calcPrimes.finalArray);
            document.querySelector('#primeNumberCalculator .graphContainer').style.display = 'block';
            document.querySelector('#primeNumberCalculator .graphContainer').style.height = '440px';
            document.querySelector('#primeNumberCalculator .graphContainer').style.width = '100%';
            primeGraph = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: returnNums(primeCount.length),
                    datasets: [{
                        label: 'π(x)',
                        data: primeCount,
                        borderColor: '#8958ff',
                        backgroundColor: '#0f0',
                        borderWidth: 1,
                        stepped: true,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'π(x)',
                                color: '#bbb'
                            },
                            ticks: {
                                precision: 0,
                                color: '#bbb'
                            },
                            grid: {
                                color: '#666'
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: `Positive integers till ${primeCount.length -1}`,
                                color: '#bbb'

                            },
                            grid: {
                                color: '#666'
                            },
                            ticks: {
                                color: '#bbb'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }
            });
            //     setTimeout(() => {
            //         console.log(document.querySelector('#primeNumberCalculator .graphContainer').clientWidth, 'width of container');
            //         const ratio = (document.querySelector('#primeNumberCalculator .graphContainer').clientWidth - offsetW) / (primeCount.length - 1);
            //         console.log(ratio, 'ratio');
            //         console.log(primeCount[primeCount.length - 1])
            //         if (ratio >= 40) {
            //             fwidth = ((primeCount.length - 1) * 40 + offsetW) + 'px';
            //             fheight = ((primeCount[primeCount.length - 1] * 40) + offsetH) + 'px';
            //         } else {
            //             fheight = ((primeCount[primeCount.length - 1] * ratio) + offsetH) + 'px';
            //             fwidth = '100%';
            //         }
            //         document.querySelector('#primeNumberCalculator .graphContainer').style.width = fwidth;
            //         document.querySelector('#primeNumberCalculator .graphContainer').style.height = fheight;
            //         primeGraph.update();
            //     }, 10);

        }
    }, 30);


}

function primeNumberCalculatorUpdate(form) {
    PUserConfig.graphIt = form.graphIt.checked;
}

function collatz(form) {
    let a = form.collatzInp.value;
    document.querySelector('#collatzConjecture .graphContainer').style.display = 'none';
    if (a <= 0) {
        document.querySelector('#collatzOut').innerHTML = "We suggest you look up the definition of 'POSITIVE integers'."
        document.querySelector('#collLegend').style.display = 'none';
        return;
    }

    const output = [a];
    let output2 = [a];
    let colors = ['#8958ff'];
    while (a > 1) {
        if (a % 2 === 1) {
            a = (3 * a) + 1;
            output2.push(` <span class = 'multiply'>&rarr;</span> ${a} `);
            colors.push('#ff0000');
        } else {
            a /= 2;
            output2.push(` <span class = 'divide'>&rarr;</span> ${a} `);
            colors.push('#00b7ff');
        }
        output.push(a);
    }
    document.querySelector('#collatzOut').innerHTML = output2.join('');
    document.querySelector('#collLegend').style.display = 'block';

    function returnNums(till) {
        const a = [0];
        let b = 1;
        while (b <= till) {
            a.push(b);
            b++;
        }
        return a;
    }

    if (collGraph !== null) {
        collGraph.destroy();
    }

    document.querySelector('#collatzConjecture .graphContainer').style.display = 'block';

    const ctx = document.getElementById('collatzGraph').getContext('2d');
    collGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: returnNums(output.length),
            datasets: [{
                label: 'Value',
                data: output,
                borderColor: colors,
                backgroundColor: '#0000',
                borderWidth: 2,
                tension: 0.2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Terms of the sequence',
                        color: '#bbb'
                    },
                    grid: {
                        color: '#666'
                    },
                    ticks: {
                        color: '#bbb'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Step Number',
                        color: '#bbb'
                    },
                    grid: {
                        color: '#666'
                    },
                    ticks: {
                        color: '#bbb'
                    }
                },
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function goldBach(form) {
    let num = form.goldBachInp.value;
    if (num < 2 || num % 2 !== 0) {
        document.querySelector('#goldBachOut').innerText = "No can do. Positive even number > 2 required."
        return;
    }
    document.querySelector('#goldBachOut').innerText = "Obtaining quantum data from the singularity... Can you hear the fans kicking in?";
    setTimeout(() => {
        const start = performance.now();
        let primes = calculateCrap(num);
        let answers = [];
        for (let i = 0; i < primes.length; i++) {
            if (primes[i] > num / 2) {
                break;
            }
            for (let v = 0; v < primes.length; v++) {
                if (primes[i] + primes[v] == num) {
                    // yay!!
                    answers.push([
                        [primes[i], primes[v]]
                    ]);
                    break;
                }
            }
        }
        if (answers.length === 0) {
            // we assume this code will never run.
            document.querySelector('#goldBachOut') = 'WTH. The GoldBach conjecture is disproved! Which wizard are you!?';
        } else {
            const outputEl = document.querySelector('#goldBachOut');
            let output = ''
            outputEl.innerHTML = '';
            for (let i = 0; i < answers.length; i++) {
                output += `(${answers[i][0][0]}, ${answers[i][0][1]}), `;
            }
            outputEl.innerHTML = output.slice(0, -2) + '.';
            const end = performance.now();
            console.log(`finding all pairs of primes which add up to ${num} took ${end - start} milliseconds.`)
        }
    }, 30);
}

function kaprekar(form) {
    const outEl = document.querySelector('#kaprekarOut');
    outEl.innerHTML = '';
    let num = form.kaprekarInp.value;
    console.log(num.length);
    let kaprekarConstant;
    if (num.length === 4) {
        kaprekarConstant = 6174;
    } else
    if (num.length === 3) {
        kaprekarConstant = 495;
    } else {
        outEl.innerHTML = 'Seriously. You need help. 4 or 3 digit numbers only!'
        return;
    }
    let i = 0;
    while (num != kaprekarConstant) {
        num = `${num}`;
        let arr1 = num.split('').sort();
        let arr2 = [...arr1];
        arr1.reverse();
        console.log(arr1, arr2);
        num = Math.abs(parseInt(arr2.join('')) - parseInt(arr1.join('')));
        if (num === kaprekarConstant) {
            outEl.innerHTML += `${arr1.join('')} - ${arr2.join('')} = <strong>${kaprekarConstant}</strong><br>`;
        } else {
            outEl.innerHTML += `${arr1.join('')} - ${arr2.join('')} = ${num}<br>`;
        }
        i++;
        if (i >= 9 || num === 0) {
            outEl.innerHTML += '<br>This number results in an infinite loop.'
            break;
        }
    }
    if (num !== 0) {
        outEl.innerHTML += `<br>The Kaprekar's constant <strong>${kaprekarConstant}</strong> was obtained in <strong>${i}</strong> steps.`
    }
    console.log(num, i);
}

function primeReset() {
    closeMenu('primeNumberCalculator');
    document.querySelector("#output").innerHTML = "";
    document.querySelector("#primeNumberCalculator .graphContainer").style.display = "none";
}

function collatzReset() {
    document.querySelector("#collatzOut").innerHTML = "";
    document.querySelector("#collLegend").style.display = "none";
    document.querySelector("#collatzConjecture .graphContainer").style.display = "none";
}

function goldBachReset() {
    document.querySelector("#goldBachOut").innerHTML = ""
}

function kaprekarReset() {
    document.querySelector("#kaprekarOut").innerHTML = ""
}

