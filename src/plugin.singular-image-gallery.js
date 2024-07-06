"use strict";

/**
 * Singular Image Gallery is a fully AJAX-based photo viewer, crafted using HTML, CSS, and vanilla JavaScript.
 * It offers a paginated image view in full screen,
 * a counter display,
 * responsive design,
 * along with several other outstanding features.
 * 
 * Author: A. M. Sadman Rafid
 * Email: amsrafid@gmail.com
 * 
 * @param {string} el
 * @param {string} url
 * @param {Object} options
 * @returns SingularImageGallery
 */
function SingularImageGallery(el, url, options)
{
    let requestUrl = new URL(url);

    this.options = {
        el,
        iconLeft: "icons/icon-left.svg",
        iconRight: "icons/icon-right.svg",
        iconCross: "icons/icon-cross.svg",
        iconLoader: "icons/icon-loader.svg",
        closeAnimation: "__close-animation",
        openAnimation: "__open-animation",
        animationDuration: 650,
        transitionError: 0,
        transitionRatio: 0.4,
        paginationOffset: 10,
        showCounts: true,
    };

    this.body = document.querySelector("body");

    this.parentDiv = document.createElement("div");
    this.masterDiv = document.createElement("div");
    this.iconLeft = document.createElement("span");
    this.iconRight = document.createElement("span");
    this.iconCross = document.createElement("span");
    this.iconLoader = document.createElement("span");
    this.counts = document.createElement("span");
    this.content = document.createElement("div");

    this.mainImage = document.createElement("img");
    this.helperImage = document.createElement("img");

    this.data = {
        page: 1,
        offset: this.options.paginationOffset,
        totalImage: 0,
        totalPage: 1,
        images: []
    };

    this.currentIndex = 0;

    /**
     * Initiate plugin necessary elements and events
     * 
     * @return void
     */
    this.init = () => {
        if (typeof el === 'string') {
            el = document.querySelector(el);
        }

        this.options.el = el;

        Object.assign(this.options, options);

    }

    return this;
}

/**
 * Style handler helper object
 */
let Style = {
    show: function (el) {
        el.style.display = 'block';
    },
    hide: function (el) {
        el.style.display = 'none';
    }
}
