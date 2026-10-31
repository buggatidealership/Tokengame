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
