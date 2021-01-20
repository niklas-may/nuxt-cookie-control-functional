# Nuxt Cookie Control *Functional*

## Overview

**This starter extends [Nuxt.js Cookie Control](https://gitlab.com/broj42/nuxt-cookie-control).**

- It allows to *only* use the functionality of the module (and style it to you liking).
- It allows to configure to module from outside the nuxt.config (e.g. from a CMS)

**Core Changes and Additions**
- A function component that exposes data / functions via slot props.
- Additional functions in the global `$cookies` object.
- Process `accepted` and `declined` function as a string (necessary when provided by a backend) 

Ideally it should be merged with the original...

## Usage

All original configurations are still possible. If you wan to use it in this functional way, continue as following.


1. Copy Module
Copy folder "modules/nuxt-cookie-control" to the same folder in your repo.

2. Copy Demo Component
Copy folder "/components/cookieControl" to where ever you wish to. This is the custom banner that is wrapped by the functional compoent. Use this as the starting point for your own custom component.

2. Configure
```
// nuxt.config.js
buildModules: [
    [
      '@/modules/nuxt-cookie-control',
      {
        css: false,
        cssPolyfill: false,
        colors: false,
        locales: ['de'],
        blockIframe: true,
        controlButton: false,
      },
    ],
  ],
```

3. Install
Install the packages from the module