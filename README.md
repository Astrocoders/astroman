# astro-cli

Astrocoders command line tool.

Let's you create new sites using the following frameworks:
 - [Create React App](https://github.com/Astrocoders/cra-starter).
 - [Gatsby v2](https://github.com/Astrocoders/gatsby-starter).
 - [ReasonML](https://github.com/Astrocoders/reasonml-starter).

When you create a project running astro-cli, you will get projects with our guidelines(https://github.com/Astrocoders/guidelines).

## Install

`npm install --global astro-cli`

### New

`astro-cli new awesome-project [cra|gatsby|reason]`

### Gen

Astro-cli already comes with [gen](https://github.com/Astrocoders/gen), a simple lib that we use for fast generating components and screens.

We grouped generators by language, currently we have Javascript and ReasonML available. We also have generators for React Native with both languages.

#### JavaScript

Create a simple react component. This command also create automatically a test file and a docz story for it.
`astro-cli gen component js Test`

Create tests for this component
`astro-cli gen test js Test`

Create a docz file for this component
`astro-cli gen story js Test`


#### ReasonML

Create a simple reasonml component
`astro-cli gen component re Test`

Create tests for this component
`astro-cli gen test re Test`

Create a story on storybook for this component
`astro-cli gen story re Test`


#### React Native

WIP!