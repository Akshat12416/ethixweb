let gsapInstance = null;
let scrollTriggerInstance = null;
let gsapPromise = null;

/**
 * Lazy loads GSAP and ScrollTrigger on demand.
 * Keeps GSAP (112 KiB) completely off the critical mobile page-load path.
 */
export async function getGsap() {
  if (gsapInstance) {
    return { gsap: gsapInstance, ScrollTrigger: scrollTriggerInstance };
  }
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapModule, stModule]) => {
      gsapInstance = gsapModule.default || gsapModule;
      scrollTriggerInstance = stModule.ScrollTrigger || stModule.default;
      if (gsapInstance && scrollTriggerInstance) {
        gsapInstance.registerPlugin(scrollTriggerInstance);
      }
      return { gsap: gsapInstance, ScrollTrigger: scrollTriggerInstance };
    });
  }
  return gsapPromise;
}
