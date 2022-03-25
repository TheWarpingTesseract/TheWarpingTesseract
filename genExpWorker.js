let min;
let concatLimit;
let solutions = [];
let userConfig = {}

self.addEventListener('message', handleMessage);

function handleMessage(obj) {
    solutions = []
    userConfig = obj.data.userConfig;
    min = userConfig.min;
    concatLimit = userConfig.concatLimit;
    let D = obj.data.D;
    let N = obj.data.N;
    recurseIni(D, N)
        //send the solutions back!
    self.postMessage({ solutions, min });
}

function recurse(total, N, D, level = 1, ops = []) {
    if (level === 1) {
        ops = [total]
    }
    if (total === N) {
        solutions.push(ops);
        min = Math.min(min, level);
        return;
    }
    if (level >= min) return;
    let num = D;
    while (`${num}`.length <= concatLimit + 1) {
        if (userConfig.add)
            recurse(total + num, N, D, level + 1, [...ops, `+ ${num}`]);
        if (userConfig.mul)
            recurse(total * num, N, D, level + 1, [...ops, `* ${num}`]);
        recurse(total * -num, N, D, level + 1, [...ops, `* -${num}`]);
        if (userConfig.div && total % num === 0) {
            recurse(total / num, N, D, level + 1, [...ops, `/ ${num}`]);
            recurse(total / -num, N, D, level + 1, [...ops, `/ -${num}`]);
        }
        if (userConfig.sub && total - num > 0) {
            recurse(total - num, N, D, level + 1, [...ops, `- ${num}`]);
        }
        if (userConfig.pow)
            recurse(Math.pow(total, num), N, D, level + 1, [...ops, `^ ${num}`]);
        num = parseInt(`${num}${D}`)
    }
}

function recurseIni(D, N) {
    let num = D;
    while (`${num}`.length <= concatLimit + 1) {
        recurse(num, N, D);
        recurse(-num, N, D);
        num = parseInt(`${num}${D}`);
    }
}