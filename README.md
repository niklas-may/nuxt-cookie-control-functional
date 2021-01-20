# Nuxt Cookie Control *Functional*

## Overview

**This starter extends [Nuxt.js Cookie Control](https://gitlab.com/broj42/nuxt-cookie-control).**

- It allows to *only* use the functionality of the module (and style it to you liking).
- It allows to configure to module from outside the nuxt.config (e.g. from a CMS)

**Core changes and additions**
- A wrapper component that exposes data / functions via slot props `<cookie-control-functional />`.
- Additional functions in the global `$cookies` object.
- Module can now process `accepted` and `declined` function as a string (necessary when provided by a backend) 

Ideally it should be merged with the original module...

## Demo
[Check the custom component](nuxt-cookie-control-functional.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/52056f74-a565-4edb-a211-a8f3cd70ddd2/deploy-status)](https://app.netlify.com/sites/nuxt-cookie-control-functional/deploys)
## Usage


All original configurations are still possible. If you wan to use it in this functional way, continue as following.

1. Copy Module
Copy folder "modules/nuxt-cookie-control" to the same folder in your repo.

2. Copy Demo Component 
Copy folder "/components/cookieControl" to where ever you wish to. 
This is the custom cookie banner that is wrapped by the functional compoent. Use this as the starting point for your own custom component. There are some comments in "/components/cookieControl/cookieControl.vue"

2. Configure
```javaScript
// nuxt.config.js
buildModules: [
    [
      '@/modules/nuxt-cookie-control',
      {
        css: false, // not needed when functional
        cssPolyfill: false, // same
        colors: false, // same
        locales: ['de'],
        blockIframe: true,
        controlButton: false,
      },
    ],
  ],
```
 Check all options [here](https://gitlab.com/broj42/nuxt-cookie-control)

3. Install
Install the packages from the module