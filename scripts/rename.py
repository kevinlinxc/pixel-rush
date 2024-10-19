from pathlib import Path

full_portaits_path = Path(__file__).resolve().parent.parent / "full-portraits/"
print("Renaming files in", full_portaits_path)
imgs = full_portaits_path.glob("*.webp")
# remove Square from every webp file name
for img in imgs:
    new_name = img.name.replace("Square", "")
    img.rename(img.parent / new_name)
    print("Renamed", img.name, "to", new_name)