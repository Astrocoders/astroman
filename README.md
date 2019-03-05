# Astroman 🧐

Astrocoders command line tool.

Let's you create new sites using the following frameworks:
 - [Create React App](https://github.com/Astrocoders/cra-starter).
 - [Gatsby v2](https://github.com/Astrocoders/gatsby-starter).
 - [ReasonML](https://github.com/Astrocoders/reasonml-starter).

When you create a project running astroman, you will get projects with our guidelines(https://github.com/Astrocoders/guidelines).

## Install

`npm install --global @astrocoders/astroman`

### New

`astroman new awesome-project [cra|gatsby|reason]`

### Gen

astroman already comes with [gen](https://github.com/Astrocoders/gen), a simple lib that we use for fast generating components and screens.

We grouped generators by language, currently we have Javascript and ReasonML available. We also have generators for React Native with both languages.

#### JavaScript

Create a simple react component. This command also create automatically a test file and a docz story for it.
`astroman gen component js Test`

Create tests for this component
`astroman gen test js Test`

Create a docz file for this component
`astroman gen story js Test`


#### ReasonML

Create a simple reasonml component
`astroman gen component re Test`

Create tests for this component
`astroman gen test re Test`

Create a story on storybook for this component
`astroman gen story re Test`


#### React Native

WIP!
