import { jest } from "@jest/globals"
import unclick from "../src/unclick"

describe("UnclickDirective", () => {

  it("handles click outside of target", async () => {
    const el = jest.fn()
    const event = jest.fn()
    const binding = jest.fn()
    el.contains = jest.fn(() => false)
    binding.value = jest.fn()
    unclick.beforeMount(el, binding)
    el.unclickEvent(event)
    expect(binding.value).toHaveBeenCalledWith(event)
  })

  it("doesnt handle click inside of target", async () => {
    const el = jest.fn()
    const event = jest.fn()
    const binding = jest.fn()
    el.contains = jest.fn(() => true)
    binding.value = jest.fn()
    unclick.beforeMount(el, binding)
    el.unclickEvent(event)
    expect(binding.value).not.toHaveBeenCalled()
  })

  it("adds event listener on mount when in simple mode", async () => {
    const el = jest.fn()
    const binding = jest.fn()
    document.addEventListener = jest.fn()
    unclick.mounted(el, binding)
    expect(document.addEventListener).toHaveBeenCalledWith("click", el.unclickEvent)
  })

  it("does nothing on update when in simple mode", async () => {
    const el = jest.fn()
    const binding = jest.fn()
    document.addEventListener = jest.fn()
    document.removeEventListener = jest.fn()
    unclick.updated(el, binding)
    expect(document.addEventListener).not.toHaveBeenCalled()
    expect(document.removeEventListener).not.toHaveBeenCalled()
  })

  it("adds event listener on mount in advanced mode when directive enabled", async () => {
    const el = jest.fn()
    const binding = jest.fn()
    binding.arg = true
    document.addEventListener = jest.fn()
    unclick.mounted(el, binding)
    expect(document.addEventListener).toHaveBeenCalledWith("click", el.unclickEvent)
  })

  it("adds event listener on update in advanced mode when directive enabled", async () => {
    const el = jest.fn()
    const binding = jest.fn()
    binding.arg = true
    document.addEventListener = jest.fn()
    unclick.updated(el, binding)
    expect(document.addEventListener).toHaveBeenCalledWith("click", el.unclickEvent)
  })

  it("removes event listener on update in advanced mode when directive disabled", async () => {
    const el = jest.fn()
    const binding = jest.fn()
    binding.arg = false
    document.removeEventListener = jest.fn()
    unclick.updated(el, binding)
    expect(document.removeEventListener).toHaveBeenCalledWith("click", el.unclickEvent)
  })

  it("removes event listener on unmount", async () => {
    const el = jest.fn()
    document.removeEventListener = jest.fn()
    unclick.unmounted(el)
    expect(document.removeEventListener).toHaveBeenCalledWith("click", el.unclickEvent)
  })
})
