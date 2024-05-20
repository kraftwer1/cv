import "./variables.css"
import "./animations.css"
import "./reset.css"
import "./font.css"
import "./style.css"
import "./helpers.css"

const allPageEls = document.querySelectorAll(".page")

const scrollIndicatorEl =
  document.querySelector<HTMLAnchorElement>(".scroll-indicator")!

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
    scrollIndicatorEl.style.opacity = "1"
    scrollIndicatorEl.classList.add("shake")
  }
}, 2500)

// Ensure browsers don't attempt to save the scroll state on page reload as it
// would tamper with the animations initiated by the intersection observer
history.scrollRestoration = "manual"

const allPagesIntersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      allPagesIntersectionObserver.unobserve(entry.target)

      entry.target.classList.add("show")

      const animatedChildEls = entry.target.querySelectorAll(".fade-in")

      if (animatedChildEls) {
        let timeout = 0

        animatedChildEls.forEach((el) =>
          setTimeout(() => el.classList.add("show"), (timeout += 200))
        )
      }
    })
  },
  {
    rootMargin: "-15%",
  }
)

allPageEls.forEach((el) => allPagesIntersectionObserver.observe(el))
