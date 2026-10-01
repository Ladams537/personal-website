# Media in projects and writing

Projects, poems, reflections, and essays accept Markdown images and HTML media blocks in their `.md` files. Place them below the frontmatter, wherever they belong in the piece. Media styling applies to all four content types.

The examples below use placeholder filenames and URLs. Replace them with your actual assets before adding them to a published piece.

## Images

Put a file at `public/media/project-screenshot.jpg`, then use:

```markdown
![Event listings showing venues and upcoming dates](/media/project-screenshot.jpg)
```

For a caption:

```html
<figure>
  <img src="/media/project-screenshot.jpg" alt="Event listings showing venues and upcoming dates" loading="lazy" />
  <figcaption>The event browsing view.</figcaption>
</figure>
```

## Videos hosted with the site

Put the video and optional poster image in `public/media/`:

```html
<figure>
  <video controls playsinline preload="metadata" poster="/media/demo-poster.jpg">
    <source src="/media/project-demo.mp4" type="video/mp4" />
    <a href="/media/project-demo.mp4">Download the project demo.</a>
  </video>
  <figcaption>A walkthrough of browsing events and making an RSVP.</figcaption>
</figure>
```

Remove `poster` if you don't have a poster image. Videos keep their original proportions, including portrait recordings, and start only when the reader presses play.

For spoken videos, add a WebVTT captions file and this line inside `<video>`:

```html
<track kind="captions" src="/media/project-demo.en.vtt" srclang="en" label="English" default />
```

## Externally hosted video

Copy the embed URL from your video host's sharing controls (a normal watch-page URL may not work). Put its iframe in this wrapper, keeping any permissions required by the host:

```html
<div class="media-embed">
  <iframe
    src="REPLACE_WITH_EMBED_URL"
    title="Poetry Events Platform walkthrough"
    loading="lazy"
    allow="fullscreen; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

For a vertical performance recording, use `class="media-embed media-embed--portrait"`. For non-video embeds, use the provider's dimensions rather than the video wrapper.

## Audio readings

Put a recording at `public/media/poem-reading.mp3`:

```html
<figure>
  <audio controls preload="metadata">
    <source src="/media/poem-reading.mp3" type="audio/mpeg" />
    <a href="/media/poem-reading.mp3">Download the reading.</a>
  </audio>
  <figcaption>A reading of this poem.</figcaption>
</figure>
```

Keep the written poem alongside the recording so readers can choose to read or listen. The same format works for project audio.

## Choosing where files live

Small images and short recordings can live in `public/media/` and are included when the site is built. For large or numerous videos, externally hosted embeds let the video service handle delivery. These files and embed URLs are public when the site is published.

Keep HTML media blocks separated from surrounding Markdown by blank lines. Include descriptive image alternatives and iframe titles. Use embeds supplied by trusted hosts; script-based widgets may need individual integration.
