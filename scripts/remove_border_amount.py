"""
Used this to figure out that removing 6 pixels was optimal
uv run -- streamlit run scripts/remove_border_amount.py
"""
import streamlit as st
from pathlib import Path
from PIL import Image

path = Path(__file__).resolve().parent.parent / "full-portraits/"
imgs = path.glob("*.webp")
any_image = next(imgs)

col1, col2 = st.columns(2)
col1.image(str(any_image), caption="Original Image")

border_amount = st.slider("Border Amount", 0, 60, 0)

with Image.open(any_image) as im:
    width, height = im.size
    left = border_amount
    top = border_amount
    right = width - border_amount
    bottom = height - border_amount
    im_cropped = im.crop((left, top, right, bottom))
    im_resized = im_cropped.resize((width, height))
    temp_file = Path("temp.webp")
    im_resized.save(temp_file)
    col2.image(str(temp_file), caption="Image with Border Removed")
