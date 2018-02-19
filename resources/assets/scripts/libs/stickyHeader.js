// We need jQuery
var $ = window.jQuery;

export default {
  stickyClass: 'fixed-top',
  enableStickyClass: true,
  enableAnimationClass: true,
  init() {
    this.$el = $('.site-header');
    let selector = $('[data-sticky-header]', this.$el);

    if(selector && selector.length) {
      this.$el = selector;
    }

    if( !this.$el.length ) {
      return;
    }

    this.scrollThreshold = 2;
    this.height = this.$el.height();
    this.scrollY = false;
    this.scrollDirection = false;

    this.isSticky = false;
    this.isAnimateEnter = false;
    this.hasAnimateEnter = false;
    this.isAnimateOff = false;

    this.eventListeners();
  },
  eventListeners: function() {
    window.addEventListener("scroll", this.onScrollListener.bind(this));

    window.addEventListener("resize", function() {
      this.height = this.$el.height();
    }.bind(this));
  },
  onScrollListener: function() {

    // Trigger Scroll Top
    this.triggerScrollTop();

    // Add scroll threshold
    if( Math.abs(this.scrollY - window.pageYOffset) <= this.scrollThreshold ) {
      return;
    }

    // Trigger Scroll Direction
    this.triggerScrollDirection();

    // Remember scrollY
    this.scrollY = window.pageYOffset;

    // Trigger Scroll Past Header
    this.triggerScrollPastHeader();

    // console.log('Scrolling', this.scrollDirection, this.scrollY, this.scrolledPastHeader);

    // Scrolling Down
    if( this.scrollDirection === 'down' ) {
      if( this.scrolledPastHeader ) {
        if( this.hasAnimateEnter ) {
          this.animateExit();
        } else {
          this.animateOff();
        }
        this.enableSticky();
      } else {
        this.disableSticky();
      }
    // Scrolling Up
    } else {
      if( !this.scrolledPastHeader ) {
        this.hasAnimateEnter = false;
      } else {
        this.animateEnter();
      }
    }
  },
  triggerScrollTop: function() {
    if( window.pageYOffset === 0 ) {
      // console.log('You\'ve reached the top');
      this.animateReset();
    }
  },
  triggerScrollDirection: function() {
    var scrollDirection;

    // Determine Scroll direction
    if( window.pageYOffset > this.scrollY ) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }

    // Only on scroll direction change
    if( scrollDirection !== this.scrollDirection ) {
      this.scrollDirection = scrollDirection;
      // console.log('Scroll direction changed', this.scrollDirection);
    }
  },
  triggerScrollPastHeader: function() {
    // Determine if user has scrolled past the header
    if( this.scrollY > this.height ) {
      if( !this.scrolledPastHeader ) {
        // console.log('Scrolled past header');
      }
      this.scrolledPastHeader = true;
    } else {
      if( this.scrolledPastHeader ) {
        // console.log('Scrolled within header');
      }
      this.scrolledPastHeader = false;
    }
  },
  enableSticky: function() {
    if( !this.enableStickyClass || this.isSticky ) {
      return false;
    }

    // console.log('Enable Sticky');
    this.isSticky = true;
    this.$el.addClass(this.stickyClass);
  },
  disableSticky: function() {
    if( !this.enableStickyClass || !this.isSticky ) {
      return false;
    }

    // console.log('Disable Sticky');
    this.isSticky = false;
    this.$el.removeClass(this.stickyClass);
  },
  animateEnter: function() {
    if( !this.enableAnimationClass || this.isAnimateEnter ) {
      return false;
    }

    if( this.isAnimateOff ) {
      this.isAnimateOff = false;
      this.$el.removeClass('animate-off');
    }

    // console.log('Animate Enter');
    this.isAnimateEnter = true;
    this.hasAnimateEnter = true;

    this.$el.removeClass('animate-exit');
    this.$el.addClass('animate-enter');
  },
  animateExit: function() {
    if( !this.enableAnimationClass || !this.isAnimateEnter ) {
      return false;
    }

    if( this.isAnimateOff ) {
      this.isAnimateOff = false;
      this.$el.removeClass('animate-off');
    }

    // console.log('Animate Exit');
    this.isAnimateEnter = false;

    this.$el.removeClass('animate-enter');
    this.$el.addClass('animate-exit');
  },
  animateOff: function() {
    if( !this.enableAnimationClass || this.isAnimateOff ) {
      return false;
    }

    // console.log('Animate Off');

    this.isAnimateEnter = false;
    this.isAnimateOff = true;
    this.$el.removeClass('animate-enter');
    this.$el.removeClass('animate-exit');
    this.$el.addClass('animate-off');
  },
  animateReset: function() {
    if( !this.enableAnimationClass || !this.isAnimateEnter && !this.isAnimateOff && !this.isSticky ) {
      return false;
    }

    // console.log('Animate Reset');
    this.isAnimateEnter = false;
    this.isAnimateOff = false;

    this.$el.removeClass('animate-off');
    this.$el.removeClass('animate-enter');
    this.$el.removeClass('animate-exit');
    this.disableSticky();
  },
};
