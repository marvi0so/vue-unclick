# Vue-unclick

:rocket: Vue.js directive to handle clicking outside of an element \
:muscle: Great for use cases such as dropdowns and popovers \
:computer: Simple integration with Vue template \
:racing_car: Advanced configuration to increase performance

## Installation

Install via npm:

```
npm install vue-unclick
```

Register the directive globally with your Vue.js app:

```
import { createApp } from "vue"
import unclick from "vue-unclick"

const app = createApp({})
app.directive("unclick", unclick)
app.mount("#app")
```

## Usage

You can apply the directive to any element and the callback method will be fired
whenever there is a click on the screen **outside of an element** (this is what
we mean by "un-clicking"):

```
<template>
  <div v-unclick="hideDropdown">
    <a href="#" @click="toggleDropdown">
      Toggle dropdown
    </a>
    <div v-show="isVisible">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      <p>Dolore ea quibusdam doloremque pariatur rerum cumque quam.</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      hideDropdown() {
        this.isVisible = false
      },
      toggleDropdown() {
        this.isVisible = !this.isVisible
      }
    }
  }
</script>
```

In order to optimize the performance, you can **conditionally control** when the
directive listens for clicks by adding an boolean argument to the directive:

```
<template>
  <div v-unclick:[isVisible]="hideDropdown">
    ...
  </div>
</template>
```

In the above example, event listeners will only be added when `isVisible` is
truthy in order to avoid unnecessary overheads. **This approach is strongly
recommended.**
