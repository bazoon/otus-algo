const fs = require('fs');
const path = require('path');

const readTests = (dir, mapInput, mapOutput, done) => {
  fs.readdir(dir, (err, files) => {
    const inFiles = files.filter(file => file.endsWith('.in'))
    const outFiles = files.filter(file => file.endsWith('.out'))
    const ins = inFiles.map(name => fs.readFileSync(path.resolve(dir, name), 'utf8')).map(mapInput)
    const outs = outFiles.map(name => fs.readFileSync(path.resolve(dir, name), 'utf8')).map(mapOutput)
    done(ins, outs);
  });
}


function run(dir, mapInput, mapOutput, testFn, showValues = true) {
  readTests(dir, mapInput, mapOutput, (ins, outs) => {
    ins.forEach((input, index) => {
      const output = outs[index];

      const [test, calculated] = testFn(input, output);

      if (test) {
        if (showValues) {
          console.log(`${index}: input: ${input} output: ${output} calculated: ${calculated} passed`)
        } else {
          console.log(`${index} passed`);
        }
      } else {
        if (showValues) {
          console.log(`${index}: input: ${input} output: ${output} failed`)
        } else {
          console.log(`${index} failed`);
        }

      }
    });
  });

}


module.exports = run;

