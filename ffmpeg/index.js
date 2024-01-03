import { spawn } from 'node:child_process';

function createChildProcess(name, command, args) {
  return spawn(command, args)
    .once('spawn', () => {
      console.log(`${name} process spawned by ${command} ${args.join(' ')}`);
    })
    .once('close', () => {
      console.log(`${name} process closed`);
    });
}

const width = 1920;
const height = 1080;

const pythonProcess = createChildProcess('python', 'python3', [
  '-u',
  'main.py',
  '--width',
  width,
  '--height',
  height,
]);

const source = createChildProcess('source', 'ffmpeg', [
  '-y',
  '-i',
  'source.mp4',
  '-f',
  'rawvideo',
  '-pix_fmt',
  'rgb24',
  '-preset',
  'fast',
  'pipe:1',
  '-loglevel',
  'error',
]);

const target = createChildProcess('target', 'ffmpeg', [
  '-y',
  '-f',
  'rawvideo',
  '-pix_fmt',
  'rgb24',
  '-s',
  `${width}x${height}`,
  '-i',
  'pipe:0',
  'target.mp4',
  '-loglevel',
  'error',
]);

source.stdout.pipe(pythonProcess.stdin);
pythonProcess.stdout.pipe(target.stdin);

console.time('total time');
target.on('close', () => {
  console.timeEnd('total time');
});
