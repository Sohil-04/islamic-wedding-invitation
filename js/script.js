
// =====================================
// WEDDING WEBSITE - MAIN JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------------
  // 1. BRIDE AND GROOM NAMES
  // -----------------------------------

  document.querySelectorAll(".bride-name").forEach(function (element) {
    element.textContent = WEDDING.brideName;
  });

  document.querySelectorAll(".groom-name").forEach(function (element) {
    element.textContent = WEDDING.groomName;
  });


  // -----------------------------------
  // 2. BACKGROUND MUSIC PLAY / PAUSE
  // -----------------------------------
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

if (music && musicButton) {
    musicButton.addEventListener("click", async function () {

        if (music.paused) {
            try {
                await music.play();

                musicButton.textContent = "Ⅱ Pause Music";
                musicButton.setAttribute("aria-label", "Pause music");

            } catch (error) {
                console.error("Music playback error:", error);
                alert("Music could not play. Please check the MP3 file path.");
            }

        } else {
            music.pause();
            musicButton.textContent = "♫ Play Music";
            musicButton.setAttribute("aria-label", "Play music");
        }
    });
}
 

  // -----------------------------------
  // 3. EVENT PAGE INFORMATION
  // -----------------------------------

  const eventType = document.body.dataset.event;

  if (eventType && WEDDING.events[eventType]) {

    const event = WEDDING.events[eventType];

    const eventFields = {
      ".event-title": event.title,
      ".event-subtitle": event.subtitle,
      ".event-description": event.description,
      ".event-date": event.date,
      ".event-time": event.time,
      ".event-venue": event.venue,
      ".event-address": event.address,
      ".event-dress": event.dressCode,
      ".event-highlight-text": event.highlight
    };

    Object.entries(eventFields).forEach(function ([selector, value]) {

      const element = document.querySelector(selector);

      if (element) {
        element.textContent = value;
      }

    });


    // -----------------------------------
    // 4. GOOGLE MAPS LOCATION
    // -----------------------------------

    const mapButton = document.querySelector(".location-button");

    if (mapButton) {
      mapButton.href = event.mapLink;
    }


    // -----------------------------------
    // 5. WHATSAPP RSVP
    // -----------------------------------

    document.querySelectorAll(".rsvp-button").forEach(function (button) {

      button.addEventListener("click", function () {

        const message =
          "Assalamu Alaikum! I would like to confirm my presence for " +
          event.title +
          " of " +
          WEDDING.brideName +
          " and " +
          WEDDING.groomName +
          ".";

        const whatsappURL =
          "https://wa.me/" +
          WEDDING.whatsappNumber +
          "?text=" +
          encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

      });

    });

  }

});
