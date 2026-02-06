/**
 * Projects Slider - Renders projects from projects-config.js
 * Add/remove projects in projects-config.js - no need to touch this file.
 */
(function () {
  if (typeof PROJECTS === "undefined") return;

  const container = document.getElementById("projects-container");
  if (!container) return;

  const lazyPlaceholder = "img/lazy.png";

  function createMediaElement(project) {
    const wrapper = document.createElement("div");
    wrapper.className = "projects__slide-media";

    if (project.type === "images" && Array.isArray(project.media)) {
      const sliderContainer = document.createElement("div");
      sliderContainer.className = "slider-container projects__images-slider";

      project.media.forEach((src, i) => {
        const img = document.createElement("img");
        img.className = "slide lazy-img";
        img.alt = project.title;
        img.src = i === 0 ? src : lazyPlaceholder;
        if (i > 0) img.dataset.src = src;
        sliderContainer.appendChild(img);
      });

      wrapper.appendChild(sliderContainer);
    } else if (project.type === "video" || project.type === "animated") {
      const src = typeof project.media === "string" ? project.media : project.media[0];
      if (src) {
        const isVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(src);
        if (isVideo) {
          const video = document.createElement("video");
          video.src = src;
          video.controls = project.type === "video";
          if (project.type === "animated") {
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
          }
          video.preload = "metadata";
          wrapper.appendChild(video);
        } else {
          const img = document.createElement("img");
          img.src = src;
          img.alt = project.title;
          img.className = "projects__slide-img";
          wrapper.appendChild(img);
        }
      }
    } else {
      const img = document.createElement("img");
      const src = typeof project.media === "string" ? project.media : project.media[0];
      img.src = src || "";
      img.alt = project.title;
      img.className = "projects__slide-img";
      wrapper.appendChild(img);
    }

    return wrapper;
  }

  function createInfoElement(project) {
    const info = document.createElement("div");
    info.className = "projects__slide-info";

    const title = document.createElement("h2");
    title.textContent = project.title;
    info.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = project.description;
    info.appendChild(desc);

    if (project.tags && project.tags.length) {
      const tags = document.createElement("div");
      tags.className = "projects__tags";
      project.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        tags.appendChild(span);
      });
      info.appendChild(tags);
    }

    const cta = document.createElement("div");
    cta.className = "projects__cta";
    if (project.link) {
      const githubBtn = document.createElement("a");
      githubBtn.href = project.link;
      githubBtn.target = "_blank";
      githubBtn.rel = "noreferrer noopener";
      githubBtn.className = "github__button button button-white no__highlights";
      githubBtn.setAttribute("aria-label", "GitHub");
      githubBtn.innerHTML =
        '<svg class="github__button-icon button-icon"><use xlink:href="/icons/sprite.svg#vector-github-logo"></use></svg>' +
        '<svg class="github__button-icon button-icon"><use xlink:href="/icons/sprite.svg#vector-github-logo-text"></use></svg>';
      cta.appendChild(githubBtn);
    }
    info.appendChild(cta);

    return info;
  }

  PROJECTS.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "projects__item";
    slide.dataset.projectId = project.id;

    const mediaEl = createMediaElement(project);
    const infoEl = createInfoElement(project);

    slide.appendChild(mediaEl);
    slide.appendChild(infoEl);
    container.appendChild(slide);
  });
})();
