export const BASE_URL = 'https://checkout.vella.finance';

export const loadWidgetPresets = () => {
    if (!window.jQuery) {
        var script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        document.head.appendChild(script);
    }

    if (document.getElementById("vew-widget") == null) {
        var c = document.createElement("div");
        c.id = "vew-widget";
        document.body.appendChild(c);
    }
}