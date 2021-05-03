# Accessible COVID-19 Dashboard
An accessible version of the Colorado Department of Public Health and Environment (CDPHE) COVID-19 dashboard

Currently hosted on Netlify:
https://accessibility-covid-dashboard.netlify.app/

## Overview
This project sets out to use the Colorado Department of Public Health and Environment (CDPHE) data around COVID-19 cases to create a dashboard similar to the State's official site, but accessible by screenreaders.

### Source Dashboard
This is the CDPHE dashboard we are aiming to recreate.
https://covid19.colorado.gov/data

### The Data
[This is the data](https://data-cdphe.opendata.arcgis.com/search?tags=covid19) behind the CDPHE dashboard.

We are currently only consuming the [CDPHE COVID19 Daily State Statistics](https://data-cdphe.opendata.arcgis.com/datasets/cdphe-covid19-daily-state-statistics-1).

For some of the other displays on the source dashboard we will need to reference some of the other endpoints.

## Structure
Currently we are working with a fairly boilerplate React app, it uses Router with a simple sidebar for navigation between visualizations. Visualizations are built utilizing Semiotic.

We are at the ground level, currently working to recreate visualizations and factor in accessibility as we do so. The initial structure is not yet accessible. 
### Technology
- React
- [Semiotic](https://semiotic.nteract.io/#semiotic)
    - Used for graph display
- [Tabler-React](https://github.com/tabler/tabler-react)
    - UI Component library
    - *In Discussion

### Component Structure
- DailyStats
    - A visualization of Daily COVID-19 trends over time across a number of dimensions.
        - Card - The housing body for the Graph display.
        - Graph - The graph itself, details on the configuration properties (frameProps) can be found in the Semiotic docs above. Simplified, it takes our API (data) from App, takes the key we want to display from that data on the Y-axis (yAccessor), and a description of what type of data we're displaying (type) as props and uses those to build the graph.
- LatestSnapshot
    - A table visualization of the latest date's COVID data.
- Sidebar
    - A simple Sidebar navigation, a conceptual alternative utilizing Tabler is under DropdownSidebar, but not currently in use.

## Getting Involved
### Choosing A First Issue
There's plenty to be done here! Here's a few basic ways:
- Recreate A Visualization
    - There are a lot of visualizations to be replicated, dig into recreating one of them using the endpoints above.
- Accessibility Improvement
    - ARIA support needs to be added to a lot of the skeleton that has been set up.
    - Manual screen reader testing should be done in tandem.
- UX/UI Improvements
    - What sorts of design considerations can we put in place to enhance the accessibility of the site for all users?

These and other items are outlined in more detail in the [Repo's issue page](https://github.com/codefordenver/cdphe-accessible-covid19/issues). If you don't see one that's a good fit, or you are looking for more information, reach out!

### Designing for Accessibility
There are lots of great resources on the web when it comes to designing accessibly, here are a few to get you started:
- [A good introduction](https://dev.to/maxwell_dev/the-web-accessibility-introduction-i-wish-i-had-4ope)
- [A11y Project](https://www.a11yproject.com/)
- [Data visualization accessibility](https://medium.com/nightingale/data-visualization-accessibility-where-are-we-now-and-whats-next-b2c9eeac4e8b)
- [A Github collection of resources](https://github.com/mmazanec22/accessibility-resources)
- [Chrome screen reader extension for testing](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
    - No disable button, so install when ready to test.

## Contacts
Join us on Discord #cdphe-accessible-covid19 and #Voice-COVID-19, reach out to [Joel Lacey](https://github.com/joel-oe-lacey) (same name on Code for Denver Discord) for further information or an introduction.
