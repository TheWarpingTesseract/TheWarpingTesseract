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

function calculateCrap(num) {
    let start = performance.now();
    console.log(num, 'number');
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
            (i % 997 === 0 && i !== 997) ||
            (i % 1009 === 0 && i !== 1009) ||
            (i % 1013 === 0 && i !== 1013) ||
            (i % 1019 === 0 && i !== 1019) ||
            (i % 1021 === 0 && i !== 1021) ||
            (i % 1031 === 0 && i !== 1031) ||
            (i % 1033 === 0 && i !== 1033) ||
            (i % 1039 === 0 && i !== 1039) ||
            (i % 1049 === 0 && i !== 1049) ||
            (i % 1051 === 0 && i !== 1051) ||
            (i % 1061 === 0 && i !== 1061) ||
            (i % 1063 === 0 && i !== 1063) ||
            (i % 1069 === 0 && i !== 1069) ||
            (i % 1087 === 0 && i !== 1087) ||
            (i % 1091 === 0 && i !== 1091) ||
            (i % 1093 === 0 && i !== 1093) ||
            (i % 1097 === 0 && i !== 1097) ||
            (i % 1103 === 0 && i !== 1103) ||
            (i % 1109 === 0 && i !== 1109) ||
            (i % 1117 === 0 && i !== 1117) ||
            (i % 1123 === 0 && i !== 1123) ||
            (i % 1129 === 0 && i !== 1129) ||
            (i % 1151 === 0 && i !== 1151) ||
            (i % 1153 === 0 && i !== 1153) ||
            (i % 1163 === 0 && i !== 1163) ||
            (i % 1171 === 0 && i !== 1171) ||
            (i % 1181 === 0 && i !== 1181) ||
            (i % 1187 === 0 && i !== 1187) ||
            (i % 1193 === 0 && i !== 1193) ||
            (i % 1201 === 0 && i !== 1201) ||
            (i % 1213 === 0 && i !== 1213) ||
            (i % 1217 === 0 && i !== 1217) ||
            (i % 1223 === 0 && i !== 1223) ||
            (i % 1229 === 0 && i !== 1229) ||
            (i % 1231 === 0 && i !== 1231) ||
            (i % 1237 === 0 && i !== 1237) ||
            (i % 1249 === 0 && i !== 1249) ||
            (i % 1259 === 0 && i !== 1259) ||
            (i % 1277 === 0 && i !== 1277) ||
            (i % 1279 === 0 && i !== 1279) ||
            (i % 1283 === 0 && i !== 1283) ||
            (i % 1289 === 0 && i !== 1289) ||
            (i % 1291 === 0 && i !== 1291) ||
            (i % 1297 === 0 && i !== 1297) ||
            (i % 1301 === 0 && i !== 1301) ||
            (i % 1303 === 0 && i !== 1303) ||
            (i % 1307 === 0 && i !== 1307) ||
            (i % 1319 === 0 && i !== 1319) ||
            (i % 1321 === 0 && i !== 1321) ||
            (i % 1327 === 0 && i !== 1327) ||
            (i % 1361 === 0 && i !== 1361) ||
            (i % 1367 === 0 && i !== 1367) ||
            (i % 1373 === 0 && i !== 1373) ||
            (i % 1381 === 0 && i !== 1381) ||
            (i % 1399 === 0 && i !== 1399)
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
    console.log(`finding all primes till ${num} took ${end - start} milliseconds to execute.`)
    return finalArray;
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
                        borderColor: '#abe721',
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
    let colors = ['rgb(171, 255, 36)'];
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