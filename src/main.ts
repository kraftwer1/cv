import "./variables.css"
import "./animations.css"
import "./reset.css"
import "./font.css"
import "./style.css"
import "./helpers.css"

const scrollIndicatorEl =
  document.querySelector<HTMLButtonElement>(".scroll-indicator")!

function onScrollOnce() {
  scrollIndicatorEl.style.opacity = "0"
}

scrollIndicatorEl.addEventListener("click", () => {
  const firstH2El = document.querySelector("h2")
  firstH2El?.scrollIntoView({ behavior: "smooth", block: "center" })
})

addEventListener("scroll", onScrollOnce, { once: true })

// Show scrollIndicatorEl after a while
setTimeout(() => {
  // Only show scrollIndicatorEl when the page hasn't yet been scrolled
  if (!scrollY) {
    scrollIndicatorEl.classList.add("show")

    setTimeout(() => {
      scrollIndicatorEl.style.animationName = "fade-in-shake"
      scrollIndicatorEl.style.animationDuration = "800ms"
    }, 800)
  }
}, 2500)

// Ensure browsers don't attempt to save the scroll state on page reload as it
// would tamper with the animations initiated by the intersection observer
history.scrollRestoration = "manual"

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      intersectionObserver.unobserve(entry.target)

      entry.target.classList.add("show")

      const animatedChildEls = entry.target.querySelectorAll(".fade-in")

      if (animatedChildEls) {
        let timeout = 0

        animatedChildEls.forEach((el) =>
          setTimeout(() => el.classList.add("show"), (timeout += 400))
        )
      }
    })
  },
  {
    rootMargin: "-15%",
  }
)

const pageEls = document.querySelectorAll(".page")
pageEls.forEach((el) => intersectionObserver.observe(el))
