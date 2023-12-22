import "./variables.css"
import "./reset.css"
import "./font.css"
import "./style.css"

// Ensure browsers don't attempt to save the scroll state on page reload as it
// would tamper with the animations initiated by the intersection observer
history.scrollRestoration = "manual"

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      entry.target.classList.add("show")

      intersectionObserver.unobserve(entry.target)
    })
  },
  {
    rootMargin: "-15%",
  }
)

const pageEls = document.querySelectorAll(".page")
pageEls.forEach((el) => intersectionObserver.observe(el))
