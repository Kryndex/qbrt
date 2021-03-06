#!/usr/bin/env node

/* Copyright 2017 Mozilla
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. */

'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const tap = require('tap');

// Paths are relative to the top-level directory in which `npm test` is run.
const childProcess = spawn('node', [ path.join('bin', 'cli.js'), 'run', 'test/hello-world/' ]);

let totalOutput = '';

childProcess.stdout.on('data', data => {
  const output = data.toString('utf8').trim();
  console.log(output);
  totalOutput += output;
});

childProcess.stderr.on('data', data => {
  console.error(data.toString('utf8').trim());
});

childProcess.on('close', code => {
  tap.equal(code, 0);
  tap.equal(totalOutput, 'console.log: Hello, World!');
  process.exit(code);
});
