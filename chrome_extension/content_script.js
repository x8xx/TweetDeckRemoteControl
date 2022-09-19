let serverAddress = "";
let ws = undefined;

const getConfs = async () => {
    return new Promise(resolve => {
        chrome.storage.local.get(["serverAddress"], items => {
            serverAddress = items.serverAddress;
            resolve();
        });
    })
}

const createWsInstance = async () =>  {
    if (serverAddress == "") {
        await getConfs();
    }

    ws = new WebSocket(serverAddress);

    ws.onopen = e => {
        console.log("ok connection");
        ws.send("regist");
    }

    ws.onmessage = e => {
        const scrollElement = document.getElementsByClassName("scroll-h")[0];

        const cmd = e.data.split(":");
        if (cmd[0] == "message") {
            console.log(cmd[1]);
        } else if (cmd[0] == "rscroll") {
            console.log("rscroll");
            console.log(cmd[1]);
            scrollElement.scrollLeft += Number(cmd[1]);
        } else if (cmd[0] == "lscroll") {
            console.log("lscroll");
            console.log(cmd[1]);
            scrollElement.scrollLeft -= Number(cmd[1]);
        }
    }
}

const addStatusMenu = () => {
    const menuUiElement = document.getElementsByClassName("js-dropdown-content")[0].childNodes[1];

    const hrMenuElement = document.createElement("li");
    hrMenuElement.classList.add("drp-h-divider");
    menuUiElement.appendChild(hrMenuElement);

    const statusMenuElement = document.createElement("li");
    statusMenuElement.classList.add("is-selectable");
    if (ws.readyState > 1) {
        const reconnectLinkElement = document.createElement("a");
        reconnectLinkElement.href = "javascript:void(0);";
        reconnectLinkElement.innerHTML = "TRC reconnect";
        reconnectLinkElement.onclick = createWsInstance;
        statusMenuElement.appendChild(reconnectLinkElement);
    } else {
        statusMenuElement.innerHTML = "<font color='red'>TRC status OK</font>";
    }
    menuUiElement.appendChild(statusMenuElement);
}


(async () => {
    setTimeout(async () => {
        ws = createWsInstance();

        const openMenuButton = document.getElementsByClassName("icon-settings")[0];
        openMenuButton.addEventListener('click', () => {
            setTimeout(addStatusMenu, 1000)
        });
    }, 10000);
})();

