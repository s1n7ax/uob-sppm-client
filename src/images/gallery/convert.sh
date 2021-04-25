#!/bin/python

import glob, os
import subprocess

i = 1

for file in glob.glob("**.jpg"):
  print(file)

  out = subprocess.run(['cwebp', '-q', '80', file, '-o', '{}.webp'.format(i)],
      stdout=subprocess.PIPE, stderr=subprocess.PIPE,
      check=True,
      text=True)
  print(out)
  i = i + 1
