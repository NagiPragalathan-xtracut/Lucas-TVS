/**
 * The three cookie types from the client's privacy policy (Cookie
 * Settings section), verbatim. Shared by the Privacy Policy page and the
 * cookie preferences panel so the two can never describe them differently.
 */
export const COOKIE_TYPES = {
  necessary: {
    term: 'Strictly Necessary Cookies',
    body: 'These cookies are essential for the website to function correctly. They enable core functionalities such as security, network management, and accessibility. These cookies cannot be disabled as they are vital for the operation of the site.',
  },
  performance: {
    term: 'Performance Cookies',
    body: 'These cookies collect information about how you use our website, such as which pages you visit and if you encounter any errors. The data is aggregated and anonymized, helping us improve the performance of our site. You have the option to disable these cookies.',
  },
  targeting: {
    term: 'Targeting Cookies',
    body: 'These cookies are used to deliver ads more relevant to you and your interests. They also help limit the number of times you see an ad and measure the effectiveness of advertising campaigns. You can choose to disable these cookies if you prefer.',
  },
}
