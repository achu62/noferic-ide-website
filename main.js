import { imagePath } from "./img.js";
import { version } from "./version.js";
import { news } from "./news.js";
import { repositoryUrl } from "./repo.js";

const renderVersion = () => {
    const versionValue = document.getElementById("version-value");
    if (versionValue) versionValue.textContent = version;
};

const setupCopyButtons = () => {
    document.querySelectorAll(".copy-button").forEach((button) => {
        button.addEventListener("click", async () => {
            const text = button.dataset.copy || button.previousElementSibling?.textContent || "";
            const previousText = button.textContent;

            try {
                await navigator.clipboard.writeText(text);
                button.textContent = "Copied";
            } catch (error) {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                button.textContent = "Copied";
            }

            setTimeout(() => {
                button.textContent = previousText;
            }, 1400);
        });
    });
};

const renderNews = () => {
    const newsList = document.getElementById("news-list");
    if (!newsList) return;

    newsList.innerHTML = news.map((item, index) => `
        <button class="news-item" type="button" data-index="${index}">
            <div class="news-item-topline">
                <h3>${item.heading}</h3>
                ${item.date ? `<time datetime="${item.date}">${item.displayDate || item.date}</time>` : ""}
            </div>
            <div class="news-tags">
                ${(item.tags ?? []).slice(0, 2).map(tag => `<span class="news-tag">${tag}</span>`).join("")}
            </div>
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

    if (!modal || !modalTitle || !modalText || !newsList) return;

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

    newsList.addEventListener("click", (e) => {
        const btn = e.target.closest(".news-item");
        if (btn) openModal(Number(btn.dataset.index));
    });

    closeBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) closeModal();
    });
};

const switchView = (viewName) => {
    const homeView = document.getElementById("home-view");
    const newsView = document.getElementById("news-view");
    const homeBtn = document.querySelector('[data-view="home"]');
    const newsBtn = document.querySelector('[data-view="news"]');

    if (homeBtn) homeBtn.classList.toggle("active", viewName === "home");
    if (newsBtn) newsBtn.classList.toggle("active", viewName === "news");

    if (homeView) homeView.style.display = viewName === "home" ? "block" : "none";
    if (newsView) newsView.style.display = viewName === "news" ? "block" : "none";
};

const setupViewSwitching = () => {
    const homeBtn = document.querySelector('[data-view="home"]');
    const newsBtn = document.querySelector('[data-view="news"]');

    if (homeBtn && newsBtn) {
        homeBtn.addEventListener("click", () => switchView("home"));
        newsBtn.addEventListener("click", () => switchView("news"));
    }

    switchView("home");
};

const initializePage = () => {
    const image = document.getElementById("image-space");
    if (image) image.src = imagePath;

    renderVersion();
    renderNews();
    setupCopyButtons();

    const repoBtn = document.getElementById("repository-btn");
    if (repoBtn) repoBtn.href = repositoryUrl;

    setupNewsDetailView();
    setupViewSwitching();
};

window.addEventListener("load", initializePage);