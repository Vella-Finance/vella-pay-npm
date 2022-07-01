import * as CONFIG from './config';

var iframe = "";

export default class VellaCheckout {

  constructor(key, options) {

    var origin = CONFIG.BASE_URL;

    const URL = `${origin}/checkout`;

    CONFIG.loadWidgetPresets();

    iframe = "";
    let loading = false;
    let baseurl = URL;
    let elementId = "vew-widget";
    let publicKey = "";
    let refLocation = "";

    this.config = {
      _publicKey: key,
      options
    }

    this.init = function () {

      if (this.config._publicKey == null) return;
      else publicKey = this.config._publicKey;
      registerElementId(this.config.options);

      if (ReadyState) makeNewFrame(this.config);

      //listenForCloseEvent();
      return this;
    };

    const registerElementId = function (options) {
      const initOptions = options;
      if (initOptions && initOptions.elementId) {
        elementId = initOptions.elementId;
      };
      refLocation = document.getElementById(elementId);
    };

    const ReadyState = function () {
      if (document.readyState == 'complete') return true;
      else if (document.readyState == 'loading') return false;
      else {
        return document.addEventListener('DOMContentLoaded', () => true);
      };
    };

    const makeNewFrame = function (configs) {
      loading = true;
      var frameId = generateFrameId();
      var host = document.location.href;

      let objParams = {
        frame: frameId,
        key: configs._publicKey,
        host: host,
        mode: "popup", // page, true, false
        ...configs.options
      };

      const newURL = new URLSearchParams(objParams).toString();

      const widgetsource = `${baseurl}?${newURL}`;

      // Setup Iframe
      var ifrm = document.createElement("IFRAME");
      ifrm.setAttribute("src", widgetsource);
      ifrm.setAttribute("allow", "geolocation *;  clipboard-read; clipboard-write");
      ifrm.setAttribute("allowtransparency", true);

      var style = {
        "z-index": "999999",
        // display: "none",
        background: "rgba(0, 0, 0, 0.004)",
        border: "0px none transparent",
        overflow: "hidden",
        visibility: "visible",
        margin: "0px",
        padding: "0px",
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%"
      };

      Object.assign(ifrm.style, style);
      ifrm.marginwidth = "0";
      ifrm.marginheight = "0";
      ifrm.frameBorder = "0";
      ifrm.vspace = "0";
      ifrm.id = ifrm.name = frameId;

      mountFrame(ifrm);

      try {
        //  recordFrame()
      } catch (err) {

      };
    };
    const mountFrame = function (ifrm) {
      if (document.getElementById(elementId) == null) {
        alert(`Element with id: ${elementId} not found`);
        return;
      };
      // Place iframe on DOM
      refLocation.parentNode.insertBefore(ifrm, refLocation);
      // save a reference
      iframe = ifrm;

    };

    const generateFrameId = function () {
      for (
        var text = "",
        possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        i = 0;
        i < 5;
        i++
      )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    };

    const addMessageListener = function (func) {

      if (window.addEventListener) {
        window.addEventListener("message", func, false);
      } else {
        window.attachEvent("onmessage", func);
      };
    };
    const listenForCloseEvent = function () {
      var closeEvent = function (e) {

        // A better validation should be made to ensure that the event is coming from cclan.
        // Otherwise, code from other authors could unknowingly close the modal.
        if (e.origin == origin) {
          if (e.data === "vella-close") {
            close();
            onClose();
          } else if (e.data === "vella-frame-loaded") {
            // _ loaded(); no event like loaded on Iframe
          };
        };
      };
      addMessageListener(closeEvent);
    };
    this.onError = function (callback) {

      const errorMessage = (res) => {
        if (res && res.data && typeof res.data == 'object' && res.origin == origin) {
          let error = res.data;
          if (!error.ok && error.code >= 400) {
            return callback(error.data);
          };
        };
      };
      addMessageListener(errorMessage);
    };
    this.onSuccess = function (callback) {
      const successMessage = (res) => {
        if (res && res.data && typeof res.data == 'object' && res.origin == origin) {
          const response = res.data;
          if (response.ok && response.code == 200) {
            return callback(res.data.data)
          };
        };
      };
      addMessageListener(successMessage);
    };

    const onClose = function (callback) {
      const closeMessage = (res) => {

        if (res && res.data && typeof res.data == 'object' && res.origin == origin) {
          const response = res.data;
          if (response.ok && response.code == 100) {
            close();
            return callback(res.data.data)
          };
        };
      };
      addMessageListener(closeMessage);
    }

    const close = function () {
      iframe.style.display = "none";
      iframe.remove();
    };

    this.onClose = onClose;
  }
};