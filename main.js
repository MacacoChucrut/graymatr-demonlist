import { renderList } from "./pages/list.js";
import { renderLevel } from "./pages/level.js";
import { renderStatsViewer } from "./pages/stats_viewer.js";

const content = document.getElementById("content");

function router() {
    const route = location.hash || "#list";

    if (route === "#list") {
        renderList(content);
    }

    else if (route.startsWith("#level/")) {
        const id = route.split("/")[1];
        renderLevel(content, id);

    } else if (route === "#stats_viewer") {
        renderStatsViewer(content);

    } else {
        renderList(content);
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const STORAGE_KEY = "theme-preference";
const root = document.documentElement;

const themes = [
    "light",
    "dark"
];

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getSavedTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function applyTheme(theme, save = true) {
    if (!themes.includes(theme)) {
        theme = "light";
    }

    root.setAttribute("data-theme", theme);

    if (save) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
        }
    }
}

function getNextTheme() {
    const current = root.getAttribute("data-theme") || "light";
    const currentIndex = themes.indexOf(current);

    return themes[(currentIndex + 1) % themes.length];
}

const savedTheme = getSavedTheme();

applyTheme(savedTheme || getSystemTheme(), false);

document.getElementById("theme-toggle").addEventListener("click", () => {
    applyTheme(getNextTheme());
});
