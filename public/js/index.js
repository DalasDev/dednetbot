var grid = document.querySelector('.m-grid');
var tl = new TimelineMax();

TweenLite.set(grid, {
  transformPerspective: 400,
  transformOrigin: '50% 50%' });

var anim2Props = {
  rotationX: 75,
  y: '0%',
  ease: Power2.easeIn,
  transformPerspective: 300,
  onComplete: function onComplete() {return grid.classList.add('is-animating');} };

tl.
to(grid, 1, { scaleY: 1.5, ease: Power3.easeIn }).
to(grid, 1, anim2Props, '+=0.3').
to('.m-logo__wrap', 1, { scale: 1 });