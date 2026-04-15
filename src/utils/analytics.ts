const GA_MEASUREMENT_ID = 'G-KWE5K89087';

export const initGA = () => {
    console.log('Google Analytics initialized via script tag');
};

export const logPageView = () => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
};

export const logEvent = (category: string, action: string, label?: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
};
