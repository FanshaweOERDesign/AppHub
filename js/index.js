const startup = () => {
    const appShell = document.querySelector(".app-shell");
    const mainFrame = document.getElementById("main-frame");
    const appButtons = document.querySelectorAll(".app-button");
    const homeButtons = document.querySelectorAll(".home-app-button");
    const menuToggle = document.getElementById("menu-toggle");
    const closeSidebarButton = document.getElementById("close-sidebar");

    const closeSidebar = () => {
        appShell.classList.remove("sidebar-open");
    };

    const openApp = (value) => {
        let url = "";
        if (value.indexOf("http") === 0) {
            url = value;
        } else {
            url = `https://fanshaweoerdesign.github.io/${value}/`;
        }
        mainFrame.src = url;
    };

    const appChange = (e) => {
        const button = e.currentTarget;
        const { appUrl } = button.dataset;
        openApp(appUrl);
        appShell.classList.add("app-open");
        closeSidebar();

        appButtons.forEach((appButton) => {
            appButton.classList.toggle("active", appButton.dataset.appUrl === appUrl);
        });

        homeButtons.forEach((homeButton) => {
            homeButton.classList.toggle("active", homeButton.dataset.appUrl === appUrl);
        });
    };

    // Get copied text from H5P Description Generator
    window.addEventListener("message", (event) => {
        if (event.origin !== "https://h5p-text-description-generator-production.up.railway.app") return;
        const content = event.data.content;
        navigator.clipboard.writeText(content);
    });

    appButtons.forEach((button) => {
        button.addEventListener("click", appChange);
    });

    homeButtons.forEach((button) => {
        button.addEventListener("click", appChange);
    });

    const reloadButtons = document.querySelectorAll("[data-reload-home]");
    reloadButtons.forEach((button) => {
        button.addEventListener("click", () => {
            window.location.reload();
        });
    });

    menuToggle.addEventListener("click", () => {
        appShell.classList.toggle("sidebar-open");
    });

    closeSidebarButton.addEventListener("click", closeSidebar);
};
