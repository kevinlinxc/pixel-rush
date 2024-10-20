# pixel-rush

Guess the league of legends champion by their pixelated portrait. Starts at 3x3 pixels and increases as you guess wrong.

## Developemnt

For scripts, install uv:
`pip install uv`

and then run any script e.g.

`uv run scripts/remove_border.py`

To run the site locally:

`npm run dev`
-> go to localhost:3000/pixel-rush

### Adding new character

1. Add their 120x120 webp to pixel-rush/full-portaits. Make sure it's named just their champname.webp, with underscores for spaces
2. Run `uv run scripts/remove_border.py` to get rid of the black border assuming there is one
3. Run `uv run scripts/downscale.py` to generate the pixelated images, copy them into the appropriate folders in public/
4. Also copy the original into public/full-portraits.
5. Delete the generated folders
