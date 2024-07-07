# Singular Image Gallery

Singular Image Gallery is a fully AJAX-based photo viewer, crafted using HTML, CSS, and vanilla JavaScript. It offers a paginated image view in full screen, a counter display, responsive design, along with several other outstanding features.

## Installation

To install this package, include **_plugin.singular-image-gallery.css_** to active stylesheet dependency, **_plugin.singular-image-gallery.js_** to active javascript dependency and **_/icons_** folder into the project public root directory to find necessary icons.

#### Let, assets are in the following arrangements in public root folder of the project.

- icons/
- js/plugin.singular-image-gallery.js
- css/plugin.singular-image-gallery.css

Then in markup, needs js and css files to be added like bellow:

~~~html
<head>
    <!-- CSS -->
    <link rel="stylesheet" href="{baseUrl}/css/plugin.singular-image-gallery.css">
</head>
<body>
    <!-- With this button click event, this plugin will start working -->
    <button class="singular-image-gallery">Slide</button>

    <!-- JS -->
    <script src="{baseUrl}/js/plugin.singular-image-gallery.js"></script>
</body>
~~~

## Basic Use

It's very easy to use. Just initiate the gallery instance and pass data in the defined json format from backend like bellow:

~~~javascript
new SingularImageGallery(
    ".singular-image-gallery",      // Should be a class|id|HTMLElement
    "https://base.url/endpoint",    // An url having specific response for this plugin
    {}                              // Options, this is optional 
)
~~~

Backend needs to pass data in the bellow format as a response:

~~~javascript
{
    "page": 0,          // Number of current page
    "totalPage": 0,     // Total number of pages that dependents with the offset of paginating 
    "totalImage": 0,    // Total number of images can be shown to the full process
    "images": []        // Array containing string of the full path images
}
~~~

## Options

Here are the available options to modify the action of the plugin, with the default values listed below:

~~~javascript
{
    /**
     * The path of the svg image which indicates the previous image.
     */
    iconLeft: "icons/icon-left.svg",

    /**
     * The path of the svg image which indicates the next image.
     */
    iconRight: "icons/icon-right.svg",

    /**
     * The path of the svg image which indicates the close action.
     */
    iconCross: "icons/icon-cross.svg",

    /**
     * The path of the svg image which indicates the loader image.
     */
    iconLoader: "icons/icon-loader.svg",

    /**
     * This is the name of an animation that is the identifier of a css animation keyframes.
     * Like, 
     * .class { animation-name: {IDENTIFIER} }
     * @keyframes {IDENTIFIER} { ... }
     */
    closeAnimation: "__close-animation",

    /**
     * This is the name of an animation that is the identifier of a css animation keyframes.
     * Like, 
     * .class { animation-name: {IDENTIFIER} }
     * @keyframes {IDENTIFIER} { ... }
     */
    openAnimation: "__open-animation",

    /**
     * An integer value in milliseconds for the working time of an animation specifies how long the animation should run.
     * In one word it's the animation duration.
     * For image changing animation, it works with two divided parts.
     */
    animationDuration: 650,

    /**
     * An integer value in milliseconds used to modify the duration of an animation at the end
     * Typically refers to how long the animation should extend or reduce beyond its initially specified duration.
     */
    transitionError: 0,

    /**
     * When dealing with photo transitions divided into two parts,
     * the ratio defines how the transition time is distributed between the two actions.
     */
    transitionRatio: 0.4,

    /**
     * The number of image files that should be parsed from the backend in a single API call
     */
    paginationOffset: 10,

    /**
     * Image counting badge will be shown or not.
     */
    showCounts: true,
}
~~~

## Authors

_Initially development_ - **_Sadman Rafid_**

## License

This javascript plugin is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
