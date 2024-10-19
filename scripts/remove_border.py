# remove 6 pixels on every edge for every portrait in full-portraits, save in place
from PIL import Image
from pathlib import Path

full_portraits_path = Path(__file__).resolve().parent.parent / "full-portraits/"
print("Removing 6 pixels from every edge in", full_portraits_path)
imgs = full_portraits_path.glob("*.webp")
for img in imgs:
    with Image.open(img) as im:
        width, height = im.size
        left = 6
        top = 6
        right = width - 6
        bottom = height - 6
        im_cropped = im.crop((left, top, right, bottom))
        # resize to 120x120
        im_resized = im_cropped.resize((120, 120))
        # save in place
        im_resized.save(img)
        print("Removed 6 pixels from every edge in", img)