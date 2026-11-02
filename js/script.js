(() => {
  "use strict";
  const data = window.WEDDING_DATA || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // The visitor opens the invitation; a short beat builds anticipation,
  // then the curtains part and flower petals drift down.
  const curtain = $("#curtain-intro");
  const curtainButton = $("#curtain-open");
  if (curtain && curtainButton) {
    document.body.classList.add("curtain-locked");
    const petalLayer = $(".petal-layer", curtain);
    const petalSymbols = ["✿", "❀", "✾", "✽"];
    const petalColors = ["#e7c9b5", "#f0dfb8", "#d7b982", "#f4e8d5"];
    const petalSpecs = [
      [4, 17, 0, -35, 5.8], [11, 13, .2, 42, 6.6], [18, 19, .5, -55, 7.2],
      [25, 12, .1, 30, 6.1], [32, 16, .4, -25, 7.5], [39, 11, .7, 50, 6.4],
      [47, 18, .2, -45, 7.1], [54, 13, .6, 35, 6.3], [61, 17, .3, -30, 7.4],
      [68, 12, .8, 45, 6.5], [75, 19, .1, -50, 7.3], [82, 14, .5, 28, 6.2],
      [90, 17, .4, -38, 7.0], [96, 12, .7, 48, 6.6], [7, 22, 1.0, 36, 8.0],
      [35, 10, 1.2, -42, 7.8], [65, 14, 1.4, 40, 8.2], [87, 11, 1.1, -32, 7.7]
    ];
    if (petalLayer) {
      petalSpecs.forEach((spec, i) => {
        const petal = document.createElement("span");
        petal.className = "falling-petal";
        petal.textContent = petalSymbols[i % petalSymbols.length];
        petal.style.setProperty("--left", `${spec[0]}%`);
        petal.style.setProperty("--size", `${spec[1]}px`);
        petal.style.setProperty("--delay", `${spec[2]}s`);
        petal.style.setProperty("--drift", `${spec[3]}px`);
        petal.style.setProperty("--duration", `${spec[4]}s`);
        petal.style.setProperty("--spin", `${i % 2 ? 480 : -540}deg`);
        petal.style.setProperty("--petal-color", petalColors[i % petalColors.length]);
        petalLayer.appendChild(petal);
      });
    }
    curtainButton.addEventListener("click", () => {
      curtainButton.disabled = true;
      curtainButton.innerHTML = "Opening your invitation <span>✧</span>";
      window.setTimeout(() => {
        curtain.classList.add("open");
        window.setTimeout(() => {
          curtain.classList.add("dismissed");
          document.body.classList.remove("curtain-locked");
          revealsAfterCurtain();
        }, 1900);
      }, 350);
    }, { once: true });
  }

  function revealsAfterCurtain() {
    // Reveal the first viewport once the curtains have cleared.
    $$(".reveal").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * .92) el.classList.add("visible");
    });
  }

  const toggle = $(".nav-toggle"), nav = $("nav");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  $$("nav a").forEach(a => a.addEventListener("click", () => nav?.classList.remove("open")));

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add("visible"));

  const countdown = $("#countdown");
  if (countdown) {
    const target = new Date(countdown.dataset.date).getTime();
    const update = () => {
      let t = Math.max(0, target - Date.now());
      const d = Math.floor(t / 86400000); t %= 86400000;
      const h = Math.floor(t / 3600000); t %= 3600000;
      const m = Math.floor(t / 60000); t %= 60000;
      const s = Math.floor(t / 1000);
      $("[data-days]").textContent = String(d).padStart(2, "0");
      $("[data-hours]").textContent = String(h).padStart(2, "0");
      $("[data-minutes]").textContent = String(m).padStart(2, "0");
      $("[data-seconds]").textContent = String(s).padStart(2, "0");
    };
    update(); setInterval(update, 1000);
  }

  const names = `${data.couple?.bride || "Aisha"} & ${data.couple?.groom || "Mayur"}`;
  const msg = encodeURIComponent(`Assalamu Alaikum! I would love to attend the wedding celebrations of ${names}. Please count me in. Congratulations!`);
  const wa = `https://wa.me/${data.whatsappNumber || "917507992064"}?text=${msg}`;
  $$("[data-rsvp]").forEach(a => a.href = wa);

  const mapQueries = { haldi: data.events?.haldi?.mapQuery, nikah: data.events?.nikah?.mapQuery };
  $$("[data-map]").forEach(a => {
    const q = mapQueries[a.dataset.map];
    if (q) a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  });

  const music = $("#wedding-music"), musicBtn = $(".music");
  if (music && musicBtn) {
    const label = $("span", musicBtn);
    const state = playing => {
      musicBtn.classList.toggle("playing", playing);
      musicBtn.setAttribute("aria-pressed", String(playing));
      musicBtn.setAttribute("aria-label", playing ? "Pause wedding music" : "Play wedding music");
      if (label) label.textContent = playing ? "Pause music" : "Play music";
    };
    musicBtn.addEventListener("click", async () => {
      if (music.paused) {
        try { await music.play(); state(true); }
        catch (err) { console.warn("Music playback failed. Check assets/music/wedding-song.mp3", err); if (label) label.textContent = "Music unavailable"; }
      } else { music.pause(); state(false); }
    });
    music.addEventListener("pause", () => state(false));
    music.addEventListener("play", () => state(true));
  }
})();
