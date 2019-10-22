import { requestServer } from "./utils/light-api.js";
import { goToPage } from "./utils/light-dom.js";
import _ from "../js/services/constants.js";

export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.hashChanged();
        window.onhashchange = this.hashChanged.bind(this);
    }

    hashChanged() {
        const routeName =
            window.location.hash.length > 0
                ? window.location.hash.substr(1)
                : "default";
        this.navigate(routeName);
    }

    async navigate(routeName) {
        const loginState = await requestServer(_.METHOD.POST, {}, _.URL.AUTH);
        if (!loginState && routeName !== "login" && routeName !== "signup") {
            routeName = "login";
            goToPage(_.PAGE_HASH.LOGIN);
            return;
        }

        this.rootElement.innerHTML = this.routes[routeName].getView();
        await this.routes[routeName].build();
    }
}
