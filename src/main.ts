import "./variables.css"
import "./reset.css"
import "./helpers.css"
import "./font.css"
import "./style.css"

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
