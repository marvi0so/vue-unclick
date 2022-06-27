function handleSimpleDirective(el, binding) {

  //only use simple mode when directive arg not set
  if (binding.arg === undefined) {
    addEventListener(el, binding)
  }
}

function handleAdvancedDirective(el, binding) {

  //only use advanced mode when directive arg is set
  if (binding.arg === undefined) {
    return
  }

  //remove event listener if binding is disabled
  if (!binding.arg) {
    removeEventListener(el)
    return
  }

  //add event listener
  addEventListener(el)
}

function addEventListener(el) {
  document.addEventListener("click", el.unclickEvent)
}

function removeEventListener(el) {
  document.removeEventListener("click", el.unclickEvent)
}

export default {
  beforeMount: (el, binding) => {

    //configure handler
    el.unclickEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }

    //add fallback event listener
    handleSimpleDirective(el, binding)
  },
  mounted: (el, binding) => {
    handleAdvancedDirective(el, binding)
  },
  updated: (el, binding) => {
    handleAdvancedDirective(el, binding)
  },
  unmounted: (el) => {
    removeEventListener(el)
  },
}
