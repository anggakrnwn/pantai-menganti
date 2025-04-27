document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Toggle mobile menu
  toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
  });

  // Tutup mobile menu ketika link diklik
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          changeNavbarColor(); // <--- tambahkan ini supaya update warna hamburger setelah klik link
      });
  });

  // Handle navbar color merubah on scroll
  window.onscroll = function() { 
      changeNavbarColor();
  };

  function changeNavbarColor() {
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.desktop-menu a');
    const logoText = document.querySelector('nav span');
    const scrollPosition = window.scrollY;
    const berandaSection = document.querySelector('#beranda');
    const toggleButton = document.getElementById('menu-toggle');

    if (!berandaSection) return;

    if (scrollPosition > berandaSection.offsetHeight) {
        // When scrolled (not on home)
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-transparent');

        navLinks.forEach(link => {
            link.classList.add('text-blue-600', 'hover:text-blue-800');
            link.classList.remove('text-white', 'hover:text-blue-400');
        });

        // 👉 Font logo jadi biru
        logoText.classList.add('text-blue-600');
        logoText.classList.remove('text-white', 'text-gray-900');

        // 👉 Hamburger icon jadi biru
        toggleButton.classList.add('text-blue-600');
        toggleButton.classList.remove('text-white');
    } else {
        // When on home
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white', 'shadow-md');

        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'hover:text-blue-800');
            link.classList.add('text-white', 'hover:text-blue-400');
        });

        // 👉 Font logo jadi putih
        logoText.classList.add('text-white');
        logoText.classList.remove('text-blue-600', 'text-gray-900');

        // 👉 Hamburger icon jadi putih
        toggleButton.classList.remove('text-blue-600');
        toggleButton.classList.add('text-white');
    }
}


  changeNavbarColor();
});
