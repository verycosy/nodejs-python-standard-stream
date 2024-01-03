import argparse
import sys
import numpy as np
from typing import Tuple


def get_args() -> Tuple[int, int]:
    parser = argparse.ArgumentParser()
    parser.add_argument("--width")
    parser.add_argument("--height")

    args = parser.parse_args()

    return [int(args.width), int(args.height)]


[width, height] = get_args()
frame_size = width * height * 3

while buffer := sys.stdin.buffer.read(frame_size):
    assert len(buffer) == frame_size

    frame = np.frombuffer(buffer, np.uint8).reshape([height, width, 3])
    result = frame * 0.3 # floating type
    
    sys.stdout.buffer.write(result.astype(np.uint8).tobytes())