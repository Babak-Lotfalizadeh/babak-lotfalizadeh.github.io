// Header
// ===========================
const headerBtn = document.querySelector(".header__button");
const headerBg = document.querySelector(".header__bg");
const headerBtnHam = document.querySelector(".header__ham");
const headerNav = document.querySelector(".header__nav");

headerBtn.addEventListener("click", function () {
  headerBg.classList.toggle("expand-bg");
  headerBtnHam.classList.toggle("header__ham-close");
  headerBtnHam.classList.toggle("header__ham");
  headerNav.classList.toggle("show-nav");
});

const sendEmail = document.querySelectorAll(".send-email");
const emailAddress = document.querySelectorAll(".email-address");

for (let i = 0; i < sendEmail.length; i++) {
  sendEmail[i].addEventListener("click", function () {
    const part1 = "babaklotfalizadeh";
    const part2 = Math.pow(2, 6);
    const part3 = String.fromCharCode(part2);
    const part4 = "gmail.com";
    const address = part1 + part3 + part4;
    emailAddress[i].textContent = address;
    emailAddress[i].style.cssText = "opacity: 1;";
  });
}

// Slider
// ===========================
const sliders = document.querySelectorAll(".slider");

if (sliders != null) {
  sliders.forEach((slider) => {
    const slides = slider.getElementsByClassName("slide");
    const sliderIndicator = slider.querySelector(".slider__indicator");
    const nextBtn = slider.querySelector(".slider__next");
    const prevBtn = slider.querySelector(".slider__prev");
    const sliderContainer = slider.querySelector(".slider-container");

    let slideNumber = 1;
    let slideAmount = 0;
    let slideWidth = 0;

    // Add dots below slider
    // ==============================
    for (let j = 0; j < slides.length; j++) {
      sliderIndicator.insertAdjacentHTML(
        "beforeend",
        "<div class='slider__indicator-dot'>&nbsp;</div>"
      );
    }

    const sliderDots = slider.querySelectorAll(".slider__indicator-dot");

    const updateSliderIndicator = function (slideNumber) {
      sliderDots.forEach((sliderDot) => {
        sliderDot.classList.remove("slider__indicator-dot-selected");
      });

      sliderDots[slideNumber - 1].classList.add(
        "slider__indicator-dot-selected"
      );
    };

    updateSliderIndicator(1);

    // Slider logic
    // ==============================
    window.addEventListener("load", function () {
      const windowWidth = this.window.innerWidth;

      const measureSlideWidth = function () {
        slideWidth = sliderContainer.clientWidth / 10;
      };

      const updateSliderUI = function (slideAmount, slideNumber) {
        sliderContainer.style.cssText =
          "transform: translateX(-" +
          slideAmount +
          "rem); transition: all 0.5s;";

        updateSliderIndicator(slideNumber);
      };

      const nextSlide = function () {
        measureSlideWidth();

        if (slideNumber < slides.length) {
          slideAmount += slideWidth;
          slideNumber++;

          updateSliderUI(slideAmount, slideNumber);
        } else {
          slideAmount = 0;
          slideNumber = 1;

          updateSliderUI(slideAmount, slideNumber);
        }
      };

      const prevSlide = function () {
        measureSlideWidth();

        if (slideNumber > 1) {
          slideAmount -= slideWidth;
          slideNumber--;

          updateSliderUI(slideAmount, slideNumber);
        } else {
          slideNumber = slides.length;
          slideAmount = slideWidth * (slideNumber - 1);

          updateSliderUI(slideAmount, slideNumber);
        }
      };

      this.window.addEventListener("resize", function () {
        const windowWidthDelta = windowWidth - this.window.innerWidth;

        if (Math.abs(windowWidthDelta) > 5) {
          measureSlideWidth();
          slideAmount = 0;
          slideNumber = 1;
          updateSliderUI(slideAmount, slideNumber);
        }
      });

      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);

      // Touch gestures
      let touchStartX = 0;
      let touchEndX = 0;

      const handleGesture = function () {
        if (touchEndX < touchStartX - 50) {
          nextSlide();
        } else {
          sliderContainer.style.cssText =
            "transform: translateX(-" +
            slideAmount +
            "rem); transition: all 0.5s;";
        }
        if (touchEndX > touchStartX + 50) {
          prevSlide();
        } else {
          sliderContainer.style.cssText =
            "transform: translateX(-" +
            slideAmount +
            "rem); transition: all 0.5s;";
        }
      };

      slider.addEventListener(
        "touchstart",
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchend",
        function (e) {
          touchEndX = e.changedTouches[0].screenX;
          handleGesture();
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchmove",
        function (e) {
          let swipeAmount =
            Math.abs(e.changedTouches[0].screenX - touchStartX) / 10;

          if (e.changedTouches[0].screenX < touchStartX) {
            sliderContainer.style.cssText =
              "transform: translateX(-" + (slideAmount + swipeAmount) + "rem);";
          } else {
            sliderContainer.style.cssText =
              "transform: translateX(-" + (slideAmount - swipeAmount) + "rem);";
          }
        },
        { passive: true }
      );
    });
  });
}

// Lazy Load Images
const imageTargets = document.querySelectorAll("img[data-src]");

if (imageTargets != null) {
  const loadImage = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  };

  const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0.1,
    rootMargin: "200px",
  });

  imageTargets.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Lazy load Galleries
const galleryTargets = document.querySelectorAll(".gallery");

if (galleryTargets != null) {
  const loadGallery = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const galleryItems = entry.target.querySelectorAll("img");

    galleryItems.forEach((galleryItem) => {
      galleryItem.src = galleryItem.dataset.src;

      galleryItem.addEventListener("load", function () {
        galleryItem.classList.remove("lazy-img");
      });
    });

    observer.unobserve(entry.target);
  };

  const galleryObserver = new IntersectionObserver(loadGallery, {
    root: null,
    threshold: 0.1,
    rootMargin: "200px",
  });

  galleryTargets.forEach((gallery) => {
    galleryObserver.observe(gallery);
  });
}

// Convert YouTube URL to embed URL
// ===========================
function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  // Already an embed URL
  if (url.includes('/embed/')) return url;
  // Handle youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return 'https://www.youtube.com/embed/' + shortsMatch[1];
  // Handle youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return 'https://www.youtube.com/embed/' + shortMatch[1];
  // Handle youtube.com/watch?v=VIDEO_ID
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (longMatch) return 'https://www.youtube.com/embed/' + longMatch[1];
  return url;
}

function isYouTubeShort(url) {
  return url && url.includes('/shorts/');
}

// Convert Google Slides URL to embed URL
// ===========================
function getGoogleSlidesEmbedUrl(url) {
  if (!url) return '';
  // Already an embed URL
  if (url.includes('/embed')) return url;
  // Extract presentation ID and convert to embed
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return 'https://docs.google.com/presentation/d/' + match[1] + '/embed?start=false&loop=false&delayms=3000';
  return url;
}

// Render Projects from JSON
// ===========================
function renderProjects(projects) {
  const projectsContainer = document.getElementById('projects-section');
  
  if (!projectsContainer) return;
  
  const projectsList = document.createElement('div');
  projectsList.id = 'projects-content';
  projectsList.className = 'projects__list';
  
  projects.forEach(project => {
    const hasVideo = !!project.video;
    const hasEmbed = !!project.embed;
    const isSingleImage = !project.images.right && !hasVideo && !hasEmbed;
    const isSingleMedia = isSingleImage || hasVideo || hasEmbed;
    
    const section = document.createElement('section');
    section.className = isSingleMedia ? 'work_section work_section--single-image' : 'work_section';
    section.style.setProperty('--work-bg-color', project.styles.bgColor);
    section.style.setProperty('--work-bg-opacity', project.styles.bgOpacity);
    section.style.setProperty('--work-text-color', project.styles.textColor);
    if (project.styles.imagePadding) {
      section.style.setProperty('--work-image-padding', project.styles.imagePadding);
    }
    
    // Media container (left side)
    let bgLeft = null;
    let bgRight = null;
    
    if (hasEmbed) {
      // Google Slides / generic embed
      bgLeft = document.createElement('div');
      bgLeft.className = 'projects__bg-single-left projects__embed-wrapper';
      
      const iframe = document.createElement('iframe');
      iframe.src = getGoogleSlidesEmbedUrl(project.embed);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.loading = 'lazy';
      iframe.title = project.title;
      bgLeft.appendChild(iframe);
    } else if (hasVideo) {
      // YouTube video embed
      const isShort = isYouTubeShort(project.video);
      bgLeft = document.createElement('div');
      bgLeft.className = 'projects__bg-single-left projects__video-wrapper' + (isShort ? ' projects__video-wrapper--short' : '');
      
      const iframe = document.createElement('iframe');
      iframe.src = getYouTubeEmbedUrl(project.video);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.loading = 'lazy';
      iframe.title = project.title;
      bgLeft.appendChild(iframe);
    } else {
      // Left background image
      bgLeft = document.createElement('div');
      bgLeft.className = isSingleImage ? 'projects__bg-single-left' : 'projects__bg-left';
      const imgLeft = document.createElement('img');
      imgLeft.src = project.images.left;
      imgLeft.alt = '';
      imgLeft.setAttribute('aria-hidden', 'true');
      imgLeft.loading = 'lazy';
      bgLeft.appendChild(imgLeft);
      
      // Right background image (only if exists)
      if (project.images.right) {
        bgRight = document.createElement('div');
        bgRight.className = 'projects__bg-right';
        const imgRight = document.createElement('img');
        imgRight.src = project.images.right;
        imgRight.alt = '';
        imgRight.setAttribute('aria-hidden', 'true');
        imgRight.loading = 'lazy';
        bgRight.appendChild(imgRight);
      }
    }
    
    // Info section
    const info = document.createElement('div');
    info.className = 'work_section-info';
    
    const title = document.createElement('h2');
    title.textContent = project.title;
    
    const description = document.createElement('p');
    description.textContent = project.description;
    
    // CTA section
    const cta = document.createElement('div');
    cta.className = 'work_section-cta';
    
    // App Store link
    if (project.links.appStore) {
      const appStoreLink = document.createElement('a');
      appStoreLink.href = project.links.appStore;
      appStoreLink.target = '_blank';
      appStoreLink.rel = 'noreferrer noopener';
      appStoreLink.className = 'no__highlights';
      
      const appStoreSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      appStoreSvg.setAttribute('class', 'download-icon');
      appStoreSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      appStoreSvg.setAttribute('viewBox', '0 0 135 40');
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'icons/SVG/app_store.svg');
      appStoreSvg.appendChild(use);
      appStoreLink.appendChild(appStoreSvg);
      cta.appendChild(appStoreLink);
    }
    
    // Google Play link
    if (project.links.googlePlay) {
      const googlePlayLink = document.createElement('a');
      googlePlayLink.href = project.links.googlePlay;
      googlePlayLink.target = '_blank';
      googlePlayLink.rel = 'noreferrer noopener';
      googlePlayLink.className = 'no__highlights';
      
      const googlePlaySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      googlePlaySvg.setAttribute('class', 'download-icon');
      googlePlaySvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      googlePlaySvg.setAttribute('viewBox', '0 0 135 40');
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'icons/SVG/google_play.svg');
      googlePlaySvg.appendChild(use);
      googlePlayLink.appendChild(googlePlaySvg);
      cta.appendChild(googlePlayLink);
    }
    
    // GitHub link
    if (project.links.github) {
      const githubLink = document.createElement('a');
      githubLink.href = project.links.github;
      githubLink.target = '_blank';
      githubLink.rel = 'noreferrer noopener';
      githubLink.className = 'no__highlights';
      githubLink.setAttribute('aria-label', 'GitHub');
      
      const githubSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      githubSvg.setAttribute('class', 'download-icon');
      githubSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      githubSvg.setAttribute('viewBox', '0 0 113 32');
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'icons/sprite.svg#vector-github-logo-text');
      githubSvg.appendChild(use);
      githubLink.appendChild(githubSvg);
      cta.appendChild(githubLink);
    }
    
    // Web link
    if (project.links.web) {
      const webLink = document.createElement('a');
      webLink.href = project.links.web.url;
      webLink.target = '_blank';
      webLink.rel = 'noreferrer noopener';
      webLink.className = 'no__highlights work_section-web-link';
      webLink.textContent = project.links.web.label || 'View Project';
      cta.appendChild(webLink);
    }
    
    // Assemble the section
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(cta);
    
    section.appendChild(bgLeft);
    if (bgRight) section.appendChild(bgRight);
    section.appendChild(info);
    
    projectsList.appendChild(section);
  });
  
  projectsContainer.appendChild(projectsList);
}

// Load and render projects from JSON
function loadProjects() {
  fetch('portfolio/projects-data.json')
    .then(res => res.json())
    .then(projects => {
      renderProjects(projects);
    })
    .catch(error => {
      console.error('Error loading projects:', error);
    });
}

// Render Experience from JSON
// ===========================
function renderExperience(experiences) {
  const experienceContainer = document.getElementById('experience-section');
  
  if (!experienceContainer) return;
  
  const title = document.createElement('h2');
  title.className = 'showcase__title';
  title.textContent = 'Work Experience';
  experienceContainer.appendChild(title);
  
  experiences.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'showcase__item';
    
    const info = document.createElement('div');
    info.className = 'showcase__item-info';
    info.style.width = '100%';
    
    const infoText = document.createElement('div');
    infoText.className = 'showcase__item-info-text';
    
    const company = document.createElement('h3');
    company.textContent = exp.company;
    
    const role = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = exp.role;
    role.appendChild(strong);
    const periodText = exp.location
      ? ` · ${exp.period} · ${exp.location}`
      : ` · ${exp.period}`;
    role.appendChild(document.createTextNode(periodText));
    
    const description = document.createElement('p');
    description.textContent = exp.description;
    
    infoText.appendChild(company);
    infoText.appendChild(role);
    infoText.appendChild(description);
    
    exp.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      infoText.appendChild(span);
    });
    
    info.appendChild(infoText);
    item.appendChild(info);
    experienceContainer.appendChild(item);
  });
}

// Load and render experience from JSON
function loadExperience() {
  fetch('portfolio/experience-data.json')
    .then(res => res.json())
    .then(experiences => {
      renderExperience(experiences);
    })
    .catch(error => {
      console.error('Error loading experience:', error);
    });
}
