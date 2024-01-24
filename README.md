# Mcity-vue3-shared
Menu and toolbar used across Mcity vue3 projects.

## Requirements

Reqiures:
-  Node 14
- [[Vue.js](https://vuejs.org/) v3] - Used for our frontend.

## setup

- Create file `.nrpmrc` in your working directory if it doen't exist.
- Create a github token through: https://github.com
- run the following commands to build & serve:

```
    npm i
   npm run dev
```

## Toolbar
1. Import the `McityToolbar` component with
`import McityToolbar from '@mcity/mcity-vue3-shared/components/McityToolbar'`
2. Include the toolbar component in the template for `app.vue` with `<mcity-toolbar><mcity-toolbar/>`
3. Pass the following required props
    - fullname
    - username
    - presentation-text
    - isUserAdmin
    - title
4. There is a named slot available titled "buttons" when any app-specific toolbar buttons can be placed (see example below).
5. There is another slot, "overflow-buttons" which maps to inside the ellipses menu on the far right of the toolbar.

## Usage
### Example:
```
<mcity-toolbar
  :fullname="fullname"
  :username="username"
  :presentation-text="presentationText"
  :isUserAdmin="isUserAdmin"
  title="Project Tracking"
>
  <template v-slot:buttons>
    <v-btn
      v-if="isUserAdmin"
      flat
      :to="{name: 'New'}"
      data-cy="new-project-btn">
      New Project
    </v-btn>
  </template>
</mcity-toolbar>
```

## Project setup

```
# npm
npm install
```

### Compiles and hot-reloads for development

```
# npm
npm run dev
```

### Compiles and minifies for production

```
# npm
npm run build
```

### Lints and fixes files

```
# npm
npm run lint
```
