<template>
  <cookie-control-functional
    v-slot="{ isReady, show, modal, cookies }"
    locale="de"
    :override-optional-cookies="cookiesOverride.optional"
    :override-necessary-cookies="cookiesOverride.necessary"
    :overrid-expiration-date="cookiesOverride.expirationDate"
  >
    <transition>
      <div v-if="isReady && show" class="cookie-control__container">
        <div class="cookie-control__wrapper">          
          <cookie-control-header :bar-description="cookiesOverride.barDescription" />
          <cookie-control-accordeon :cookies="cookies" :expand="modal" />
          <cookie-control-footer :cookies="cookies" :modal="modal" />
        </div>
      </div>
    </transition>
  </cookie-control-functional>
</template>
<script>
import CookieControlAccordeon from './cookieControlAccordeon'
import CookieControlHeader from './cookieControlHeader'
import CookieControlFooter from './cookieControlFooter'

export default {
  name: 'CookieControl',
  components: {
    CookieControlAccordeon,
    CookieControlHeader,
    CookieControlFooter,
  },
  data() {
    return {
      cookiesOverride: {
        // This overrides the data from the config
        // It can come from anywhere eg. async data / CMS
        // It is important to keep the shape of the optional and neccesary object as following
        optional: [
          {
            name: 'Optional Cookie Name',
            description: '<div class="article"><p class="">We use Google Analytics provided by the Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland ("Google") which acts as a processor on behalf of Messner Architektur.</p><h3 class="">Purpose of processing </h3><p class="">Google Analytics uses cookies that enable an analysis of your use of our website. This data helps us to compile pseudonymized reports on website activities in order to analyse the performance of our website and the success of our marketing campaigns.</p><h3 class="">Data processed</h3><p class="">The following data will be processed</p><ul><li>the pages you have visited on our website</li><li>your user behavior</li><li>your approximate location</li><li>your IP address</li><li>technical information about your browser and the end devices you use</li><li>your internet provider</li><li>the referrer URL</li></ul><h3 class="">Legal basis of data processing</h3><p class="">Legal basis for the processing of your personal data is your consent (Art. 6 (1) lit. a GDPR).You can revoke your consent at any time with future effect by removing the checkmark in the button of this cookie banner.</p><h3 class="">Place of data processing</h3><p class="">The data collected is transferred to a Google server in the USA and stored there. We use the function "anonymizeIP" (so-called IP-Masking): Due to the activation of the IP-anonymization on the Website, your IP-address will be abbreviated by Google within the EU/EEA.</p><p class="">Recipients incl. data transfers to third countries.</p><p class="">Data recipients are the Google Ireland Limited and other Google group companies, including Google LLC, based in California, USA.</p><p class="">The United States are a so-called third country, which does not provide for an adequate level of data protection based on an adequacy decision by the European Commission pursuant to Art. 45 GDPR. If the data is transferred to the USA or other third countries, there is a risk that your data may be processed by state authorities for control and monitoring purposes without you being entitled to any effective legal remedies.</p><p class="">The data stored by Google may also be processed by Google group companies for own purposes, such as to provide Google"s web analytics and tracking services, and may be linked to your Google account, search history and other data that Google has stored about you, such as your usage data from other devices. Messner Architektur has no influence on this data processing, so that Google alone is responsible for this data processing.</p><p class="">Further information on how Google processes your data can be found under <a href="https://policies.google.com/privacy" class="text-link">https://policies.google.com/privacy</a></p><h3 class="">Storage period</h3><p class="">The data linked to cookies are automatically deleted after 14 months.</p></div>',
            cookies: [
              'cookie_control_enabled_cookies',
              'cookie_control_consent',
            ],
            // Function to call when script accepted
            // Must be a Sting
            accepted:
              "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXX');",
            declined: "window['ga-disable-G-XXXXXXXX'] = true;",
            // Script to load when accepted
            src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX',
            async: true,
          },
        ],
        necessary: [
          {
            name: 'Necessary Cookie Name',
            description: '<p>Description can be a string or html</>',
            cookies: [
              'cookie_control_enabled_cookies',
              'cookie_control_consent',
            ],
          },
        ],
        barDescription: '<p>We Use Cookies</>',
        expirationDate: 3,
      },
    }
  },
}
</script>
<style lang="scss">

.cookie-control {
  position: relative;
  color: white;

  &::after {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(yellow, 0.5);
    pointer-events: none;
    opacity: 0;
    transition: all 400ms cubic-bezier(0.36, 1, 0.22, 1);
  }

  &.modal-open::after {
    opacity: 1;
  }

  &__container {
    display: flex;
    justify-content: center;
    
    position: fixed;
    z-index: 1000;
    bottom: 1rem;
    left: 0;
    
    padding: 0 1rem;
    width: 100%;
    max-height: 75vh;
    

    pointer-events: none;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);

    &.v-enter,
    &.v-leave-to {
      transform: translate3d(0, 100%, 0);
    }

    &.v-leave-to,
    &.v-enter {
      transform: translate3d(0, 100%, 0);
    }

    &.v-leave {
      transform: translate3d(0, 0, 0);
    }
  }

  &__wrapper {
    width: 100%;
    pointer-events: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
