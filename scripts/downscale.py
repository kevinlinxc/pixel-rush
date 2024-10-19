from pathlib import Path
from PIL import Image
import numpy as np
import base64 # base 64 encode the image names so inspect element doesn't show them

pixels = [3, 4, 5, 8, 12]

def average_color(im, block_size):
    """Downscale by averaging portions because the Pillow resampling actually sucks."""
    im_array = np.array(im)
    new_size = (im_array.shape[0] // block_size, im_array.shape[1] // block_size, im_array.shape[2])
    new_array = np.zeros(new_size, dtype=np.uint8)

    for i in range(new_size[0]):
        for j in range(new_size[1]):
            block = im_array[i * block_size:(i + 1) * block_size, j * block_size:(j + 1) * block_size]
            average = block.mean(axis=(0, 1)).astype(np.uint8)
            new_array[i, j] = average

    return Image.fromarray(new_array)

full_portraits_path = Path(__file__).resolve().parent.parent / "full-portraits/"

for pixel_amt in pixels:
    downscaled_portraits_path = Path(__file__).resolve().parent.parent / f"{pixel_amt}x{pixel_amt}-portraits/"
    downscaled_portraits_path.mkdir(exist_ok=True)
    print("Downscaling files from", full_portraits_path, "to", downscaled_portraits_path)

    imgs = full_portraits_path.glob("*.webp")
    for img in imgs:
        with Image.open(img) as im:
            original_size = im.size  # Get original size as a tuple (width, height)

            block_size = original_size[0] // pixel_amt  # Set block size
            downscaled = average_color(im, block_size)

            upscaled = downscaled.resize(original_size, resample=Image.NEAREST)  # Nearest neighbor to keep pixelation

            character_name = img.stem
            encoded = base64.b64encode(character_name.encode()).decode()

            upscaled.save(downscaled_portraits_path / f"{encoded}.webp")
            print("Downscaled and upscaled with average color", img)
