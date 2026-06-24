document.addEventListener('DOMContentLoaded', function() {
  var burger = document.querySelector('.burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      burger.setAttribute('aria-expanded', burger.classList.contains('active'));
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
