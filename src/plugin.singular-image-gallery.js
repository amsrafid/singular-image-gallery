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
    let duration;
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

        this.initiateHelper();
        this.initiateDOMElement();
        this.initiateEvents();

        this.showImage();
    }

    /**
     * Initiates system necessary helpers
     * 
     * @return void
     */
    this.initiateHelper = () => {
        this.iconLoader.hide = () => Style.hide(this.iconLoader);
        this.iconLoader.show = () => Style.show(this.iconLoader);
    }

    /**
     * Initiates system necessary events
     * 
     * @return void
     */
    this.initiateEvents = () => {
        this.options.el.addEventListener('click', this.elementClick);
        this.iconCross.addEventListener('click', this.iconCrossClick);
        this.iconLeft.addEventListener('click', this.iconLeftClick);
        this.iconRight.addEventListener('click', this.iconRightClick);

        this.mainImage.addEventListener('load', () => {
            this.iconLoader.hide();
        });
    }

    /**
     * Initiates system required DOM elements to generate markup
     * 
     * @return void
     */
    this.initiateDOMElement = () => {
        let leftIcon = document.createElement("img");
        let rightIcon = document.createElement("img");
        let crossIcon = document.createElement("img");
        let loaderIcon = document.createElement("img");
        let pointer = document.createElement("div");

        leftIcon.src = this.options.iconLeft;
        rightIcon.src = this.options.iconRight;
        crossIcon.src = this.options.iconCross;
        loaderIcon.src = this.options.iconLoader;

        pointer.classList.add('__pointers');

        this.parentDiv.classList.add('__image-preview');
        this.masterDiv.classList.add('__master-container');
        this.helperImage.classList.add('__helper-container');
        this.counts.classList.add('__counts');

        this.iconLeft.classList.add('__icons', '__icon-left');
        this.iconRight.classList.add('__icons', '__icon-right');
        this.iconCross.classList.add('__icons', '__icon-cross');
        this.iconLoader.classList.add('__icon-loader');
        this.content.classList.add('__content');

        this.iconLeft.append(leftIcon);
        this.iconRight.append(rightIcon);
        this.iconCross.append(crossIcon);
        this.iconLoader.append(loaderIcon);
        
        if (! this.options.showCounts) {
            Style.hide(this.counts);
        }

        pointer.append(this.counts, this.iconCross, this.iconLeft, this.iconRight, this.iconLoader);
        
        this.content.append(this.mainImage, this.helperImage);
        this.masterDiv.append(pointer, this.content);
        this.parentDiv.append(this.masterDiv);

        Style.hide(this.parentDiv);
        this.body.append(this.parentDiv);
    }

    /**
     * Show Gallery images by handling API calling
     * 
     * @return void
     */
    this.showImage = async () => {
        this.iconLoader.show();
        
        await this.fetchData();

        this.counts.innerText = `${this.currentIndex + 1}/${this.data.totalImage}`;
        this.assignImage();
    }

    /**
     * Fetch data and assign necessary values to the system
     * 
     * @returns void
     */
    this.fetchData = async () => {
        if (this.currentIndex < this.data.images.length - 1
            || (this.data.totalImage && this.data.totalImage <= this.data.images.length)
        ) {
            return;
        }

        requestUrl.search = new URLSearchParams({
            page: this.data.page,
            offset: this.data.offset
        }).toString();

        try {
            let res = await fetch(requestUrl);
            let data = await res.json();
    
            this.data.images = this.data.images.concat(data.images);
            this.data.totalPage = data.totalPage;
            this.data.totalImage = data.totalImage;
            this.data.page++;

            this.counts.innerText = this.currentIndex;
        } catch (error) {}
    }

    /**
     * Assign image to show
     * 
     * @return void
     */
    this.assignImage = () => {
        if (this.data.images[this.currentIndex] === undefined) {
            return;
        }

        duration = this.options.animationDuration * this.options.transitionRatio;
        
        this.animate(this.mainImage, this.options.closeAnimation, duration, () => {
            this.helperImage.src = this.data.images[this.currentIndex];
            Style.hide(this.mainImage);
        });

        this.animate(this.helperImage, this.options.openAnimation, this.options.animationDuration - duration, () => {
            this.mainImage.src = this.data.images[this.currentIndex]
            this.helperImage.src = "";
            Style.show(this.mainImage);
        }, duration);

        this.handleNavigationBtnDisplay();
    }

    /**
     * Handle navigation button display
     * 
     * @return void
     */
    this.handleNavigationBtnDisplay = () => {
        if (this.currentIndex >= this.data.totalImage - 1) {
            return Style.hide(this.iconRight);
        }

        if (this.currentIndex <= 0) {
            return Style.hide(this.iconLeft);
        }
    }

    /**
     * Cross button Click event
     * 
     * @return void
     */
    this.iconCrossClick = () => {
        Style.hide(this.parentDiv);
    }

    /**
     * Left Button Click to view previous image
     * 
     * @return void
     */
    this.iconLeftClick = () => {
        if (this.currentIndex > 0) {
            Style.show(this.iconRight);
            this.currentIndex--;
        }

        this.showImage();
    }

    /**
     * Right Button Click to view next image
     * 
     * @return void
     */
    this.iconRightClick = () => {
        if (this.currentIndex < this.data.totalImage - 1) {
            Style.show(this.iconLeft);
            this.currentIndex++;
        }

        this.showImage();
    }

    /**
     * Master Event
     * Which will trigger the plugin to react from starting
     * 
     * @param {MouseEvent} e 
     * @returns 
     */
    this.elementClick = (e) => {
        e.preventDefault();

        if (this.data.images.length < 1) {
            return;
        }

        Style.show(this.parentDiv);
    }

    /**
     * Make animation
     * 
     * @param {HTMLElement} ctx 
     * @param {string} keyFrame 
     * @param {int} duration 
     * @param {Function} callback 
     * @param {int} delay 
     * @return void
     */
    this.animate = async (ctx, keyFrame, duration, callback = () => {}, delay) => {
        if (delay) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        let error = this.options.transitionError || duration < 400 ? 15 : 10;

        Object.assign(ctx.style, {
            animationName: keyFrame,
            animationDuration: `${duration + error}ms`
        });

        await new Promise(resolve => setTimeout(resolve, duration));

        callback();
        Object.assign(ctx.style, { animationName: "", animationDuration: "" });
    }

    this.init();

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
