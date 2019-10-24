import { configure, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "rc-slider/assets/index.css";

addParameters({
    options: {
        theme: themes.light,
        panelPosition: "bottom",
        sidebarAnimations: true,
        showPanel: false,
        hierarchySeparator: /\/|\./,
        hierarchyRootSeparator: /\|/
    }
});
// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);
