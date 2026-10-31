# Hedra API check (2026-10-31)

## Key
- `HEDRA_API_KEY` is set as an environment variable (value never printed or stored).
- It is a **v3 key**. The old endpoint `GET https://api.hedra.com/web-app/public/models` refuses it: 403 `PERMISSION_DENIED`, "This is a v3 API key, which this endpoint does not accept... It works on the v3 API". The same `X-API-Key` header works unchanged on `https://api.hedra.com/v3` (docs https://api.hedra.com/v3/docs, spec https://api.hedra.com/v3/openapi.json).
- Endpoints used: `GET /v3/models?modality=image|video`, `GET /v3/balance`, `GET /v3/models/{model}/openapi.json` (input schema), `POST /v3/models/{model}/estimate`, `POST /v3/models/{model}` (submit), `GET /v3/jobs/{id}/status` (poll), `GET /v3/jobs/{id}` (result with output URL, a signed S3 link that expires).

## Balance
- Before: **$100.00 USD**. After the test image: **$99.288** (spent $0.712, exactly the estimate).

## Models (full list with prices in `models.json`)
- 40 image models: dreamina-31, flux-11-pro, flux-11-ultra, flux-dev, flux-kontext, flux2, flux2-klein-9b, gpt-image-15, gpt-image-2, gpt-image-2.5-flare, gpt-image-2.5-sunburst, grok-imagine, grok-imagine-20, hidream-o1-image, ideogram-v4, ideogram-v4-5, imagen3, imagen4, krea-2, krea-3, mai-image-2-5, muse-image, nano-banana, nano-banana-2, nano-banana-2.1, nano-banana-pro, qwen-image-2, qwen-image-2-1, recraft-v3, reve-21, reve-21-edit, reve-21-remix, sana, seedream-40, seedream-45, seedream-50-lite, seedream-50-pro, topaz-image-upscaler, topaz-image-upscaler-transparency, topaz-image-upscaler-wonder
- 53 video models: creatify-aurora, eyeline-id-relight, eyeline-id-restyle, flux-3, flux-3-video-upscaler-creative, flux-3-video-upscaler-precise, gemini-omni-flash, gemini-omni-flash-11, happy-horse, hedra-avatar, hedra-character-3, heygen-photo-avatar-4, kling-16, kling-21-master, kling-25-turbo, kling-26-motion-control, kling-26-pro, kling-ai-avatar-v2, kling-o1, kling-o3, kling-o3-edit, kling-o3-reference, kling-v3, kling-v3-motion-control, ltx-2-3, ltx-2-5, luma-ray-32, minimax-h3, minimax-h3-max, minimax-h3-max-camera-controls, minimax-h3-max-turbo, minimax-hailuo-02, minimax-hailuo-23, omnihuman-15, omnihuman-20, pixverse-v6, seedance-15-pro, seedance-20, seedance-25, topaz-video-upscaler, topaz-video-upscaler-hyperion-2-5, topaz-video-upscaler-starlight-fast, topaz-video-upscaler-starlight-hq, topaz-video-upscaler-starlight-precise, veed-fabric-10, veed-video-background-removal, veo-2, veo-3, veo-31, vidu-q3, vidu-q3-reference, wan-2-7, wan-3-0
- Image highlights by price: gpt-image-2 (low/medium/high at 1K/2K/4K; high 4K square 71.16 cents), nano-banana-pro (4K 30 cents), reve-21 (25 cents), ideogram-v4-5 (high 22 cents), seedream-50-pro (6.75 to 13.5 cents), flux2 max (7 cents), imagen4 (5.71 cents).
- Hedra's own: hedra-character-3 and hedra-avatar (talking characters), plus Kling, Veo 3.1, Seedance, MiniMax Hailuo, Luma Ray, Wan, LTX etc. for video, and ElevenLabs for audio.

## Test image
- Model: **gpt-image-2**, quality high, resolution 4K, aspect 1:1, PNG (picked as the top-tier image model with a native 4K square; "4K" came back as **2880 x 2880**).
- Request body (POST /v3/models/gpt-image-2):
```json
{
 "input": {
  "prompt": "Comic book backdrop, empty backstage green room of a boxing arena, four dressing-room doors side by side, hard red and green key lights, painted 3D-rendered depth with an American comic ink-line finish and halftone dots only inside the shadows, no people, no text, no letters, no logos.",
  "aspect_ratio": "1:1",
  "resolution": "4K",
  "quality": "high",
  "output_format": "png",
  "num_outputs": 1
 }
}
```
- Job: job_c237516e-8c06-4b69-a630-c94586aac0a1, asset asset_c237516e-8c06-4b69-a630-c94586aac0a1.
- Time: about **119 s** from submit to COMPLETED (polled every 5 s).
- Cost: **$0.712** (estimate 0.712, balance 100.00 -> 99.288).
- File: `test-backdrop.png` (2880 x 2880, 13.2 MB).
- Look: an empty backstage room, four doors side by side, red key light on the left half and green on the right, wall lamps, a make-up mirror with bulbs, a sofa, bench and a red kit bag; ink lines and halftone dots in the darks; no people, no text or logos visible at preview size. It reads more "drawn comic with lighting" than "3D render with comic finish"; a prompt pushing modelled materials (or another model such as nano-banana-pro) could be tried next.

## Four takes, one scene (2026-10-31): "3D first, comic finish"
Same prompt on four models (only each model's own fields changed):
"3D-rendered scene with an American comic book finish: an empty backstage green room of a boxing arena, four dressing-room doors side by side, each door a different scuffed painted metal, hard red key light from the left and hard green key light from the right, volumetric haze, glossy concrete floor with reflections, a worn leather sofa, a make-up mirror ringed with bulbs. Physically modelled materials and depth like a Pixar or Spider-Verse frame, then bold black ink contour lines on edges and Ben-Day halftone dots only inside the shadows. No people, no text, no letters, no numbers, no logos, no signs."

Balance 99.288 -> 98.421 (spent **$0.867**; every charge equalled its estimate). All jobs submitted in parallel; time = submit to COMPLETED, polled every 5 s. Files are JPG q90 in `takes/` (PNGs not kept).

| # | Model | Settings | Cost | Time | Output | File |
|---|---|---|---|---|---|---|
| 1 | gpt-image-2 | quality high, 2K, 1:1, png | $0.4289 | 110 s | 2048 x 2048 | `takes/t1-gpt-image-2.jpg` |
| 2 | nano-banana-pro | 2K, 1:1 | $0.1512 | 28 s | 2048 x 2048 | `takes/t2-nano-banana-pro.jpg` |
| 3 | seedream-50-pro | 1440p (2K QHD), 1:1, png (its largest) | $0.0675 | 105 s | 1440 x 1440 | `takes/t3-seedream-50-pro.jpg` |
| - | reve-21 | 1:1, png | $0 (not charged) | 7 s | none | FAILED: `{"code":"NOT_FOUND","message":"The generation failed. Please try again.","retryable":false}` (job_7605aad4-783a-4e0c-9101-c65313b77d97) |
| 4 | ideogram-v4-5 (fallback for reve) | quality high, 2K, 1:1 | $0.22 | 23 s | 2048 x 2048 | `takes/t4-ideogram-v4-5.jpg` |

Honest read of each (judged at full size):
1. **gpt-image-2:** much more modelled than the first test (real depth, glossy floor reflections of each door, scuffed metal doors with vents, leather sofa, ducting), fine ink contours throughout; halftone barely visible. Reads as a polished painted illustration with 3D depth, still more "drawn and lit" than "rendered then inked". No haze. Door colours red/yellow/blue/green, no text.
2. **nano-banana-pro:** a collage, not one look: a near-photo brick wall and haze with doors and sofa traced in line art laid over; the halftone covers the whole floor and frame edges, not only the shadows; one door is grey. Weakest match to "3D first, comic finish".
3. **seedream-50-pro:** the closest to the brief: reads as a modelled 3D render (pitted concrete with depth, studded leather sofa with specular highlights, volumetric red and green beams, wet glossy floor) with a light ink line on the edges and dots in the dark corners. But the doors are painted wooden panel doors, not metal; the mirror is a round free-standing one; a magenta spill on the floor where the lights mix. Cheapest, and capped at 1440 px.
4. **ideogram-v4-5:** a photograph, not a comic: no ink lines, no halftone; the "doors" became four freestanding steel lockers. Great materials, wrong finish.

Verdict: seedream-50-pro for the 3D-first look, gpt-image-2 for the strongest ink layer; neither does both fully. Next test worth running: seedream-50-pro with the comic layer pushed harder (heavier ink, explicit dot screen in shadows) and "steel" doors stated, and gpt-image-2 with "octane render, subsurface, ray-traced reflections" to push it further from illustration.
