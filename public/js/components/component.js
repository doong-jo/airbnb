import { $$, setHTML } from "../utils/light-dom";

class Component {
    constructor() {
        this.options = {};
        this.elContainer = {};
    }

    applyOptions(options) {
        for (const key in options) {
            if (this.options.hasOwnProperty(key)) {
                const value = options[key];
                this.options[key] = value ? value : this.options[key];
            }
        }
    }

    init(selector, options) {
        this.applyOptions(options);
        this.elContainer = $$(selector);

        return this;
    }

    build(data) {
        return this;
    }

    render() {
        setHTML(this.elContainer, /* html */ `<div></div>`);
        this.processWhenAfterRender();
    }

    processWhenAfterRender() {}
}

export default Component;
