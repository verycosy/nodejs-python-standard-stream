import { spawn } from 'node:child_process';

const pythonProcess = spawn('python3', ['-u', 'main.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

pythonProcess.on('spawn', () => {
  console.log('Python process created by node.js');

  pythonProcess.stdin.write('머릿말', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    pythonProcess.stdin.end();
  });
});
