export class ScrollManager {
  static instance = null;
  scrollTimeout = null;
  scrollCallbacks = new Set();
  isScrolling = false;

  static getInstance() {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  handleScroll() {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        this.scrollCallbacks.forEach((callback) => callback());
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.scrollCallbacks.forEach((callback) => callback());
    }, 150);
  }

  subscribe(callback) {
    this.scrollCallbacks.add(callback);
    return () => this.scrollCallbacks.delete(callback);
  }
}
