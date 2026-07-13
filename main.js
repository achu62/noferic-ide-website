//jai sri ram


import { imagePath } from "./img.js";
import { version } from "./version.js";
import { news } from "./news.js";

const renderVersion = () => {
    const versionValue = document.getElementById("version-value");

    if (versionValue) {
        versionValue.textContent = version;
    }
};

const renderNews = () => {
    const newsList = document.getElementById("news-list");

    if (!newsList) return;

    newsList.innerHTML = news.map((item, index) => `
        <button class="news-item" type="button" data-index="${index}">
            <h3>${item.heading}</h3>
            <p>${item.content}</p>
        </button>
    `).join("");
};

const setupNewsDetailView = () => {
    const modal = document.getElementById("news-modal");
    const modalTitle = document.getElementById("news-modal-title");
    const modalText = document.getElementById("news-modal-text");
    const newsList = document.getElementById("news-list");
    const closeBtn = modal?.querySelector(".news-modal-close");
    const backdrop = modal?.querySelector(".news-modal-backdrop");

    if (!modal || !modalTitle || !modalText || !newsList) {
        return;
    }

    const openModal = (index) => {
        const item = news[index];

        if (!item) return;

        modalTitle.textContent = item.heading;
        modalText.textContent = item.content;

        modal.hidden = false;
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = "";
    };

    newsList.addEventListener("click", (event) => {
        const button = event.target.closest(".news-item");

        if (!button) return;

        openModal(Number(button.dataset.index));
    });

    closeBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
};

const switchView = (viewName) => {
    const homeView = document.getElementById("home-view");
    const newsView = document.getElementById("news-view");

    const homeButton = document.querySelector('[data-view="home"]');
    const newsButton = document.querySelector('[data-view="news"]');

    homeButton.classList.toggle("active", viewName === "home");
    newsButton.classList.toggle("active", viewName === "news");

    homeView.style.display = viewName === "home" ? "flex" : "none";
    newsView.style.display = viewName === "news" ? "block" : "none";
};
const setupViewSwitching = () => {
    document.querySelectorAll(".nav-btn").forEach((button) => {
        button.addEventListener("click", () => {
            switchView(button.dataset.view);
        });
    });

    switchView("home");
};

const initializePage = () => {
    const image = document.getElementById("image-space");

    if (image) {
        image.src = imagePath;
    }

    renderVersion();
    renderNews();
    setupNewsDetailView();
    setupViewSwitching();
};

window.addEventListener("load", initializePage);