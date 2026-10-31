import { renderFeaturePage } from "./match-features.js";

const layout = document.querySelector(".layout");
const scorePage = document.getElementById("scores-page");
const featurePage = document.getElementById("module-page");
const detailPanel = document.querySelector(".detail-panel");
const refreshButton = document.getElementById("refresh");
const search = document.querySelector(".search");
const pageButtons = document.querySelectorAll("[data-page]");
let activePage = "matches";
let providerConfigured = false;

function setPage(page) {
  activePage = page;
  const isMatchPage = page === "matches";
  scorePage.hidden = !isMatchPage;
  featurePage.hidden = isMatchPage;
  detailPanel.hidden = !isMatchPage;
  refreshButton.hidden = !isMatchPage;
  search.hidden = !isMatchPage;
  layout.classList.toggle("module-mode", !isMatchPage);

  pageButtons.forEach((button) => {
    const active = button.dataset.page === page;
    button.classList.toggle("active", active);
    if (button.closest(".topnav")) {
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    } else {
      button.setAttribute("aria-pressed", String(active));
    }
  });

  if (!isMatchPage) {
    try {
      renderFeaturePage(page, featurePage, providerConfigured);
    } catch (error) {
      console.error("Could not render feature page:", error);
      featurePage.replaceChildren(document.createTextNode("This feature could not be loaded. Please reload the page."));
    }
  }
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => setPage(button.dataset.page));
});

fetch("/api/config", { headers: { Accept: "application/json" } })
  .then(async (response) => {
    const configuration = await response.json();
    if (!response.ok) throw new Error(configuration.error || "Could not check data provider setup.");
    providerConfigured = configuration.configured === true;
    if (activePage === "rivalries") setPage(activePage);
  })
  .catch((error) => {
    console.error("Could not read data provider setup:", error.message);
  });

window.addEventListener("matchday:provider-status", (event) => {
  if (event.detail?.configured === true) {
    providerConfigured = true;
    if (activePage === "rivalries") setPage(activePage);
  }
});

setPage("matches");
