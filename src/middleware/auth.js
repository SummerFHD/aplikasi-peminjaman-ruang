function isAuthenticated(req, res, next) {
  // Mengecek apakah ada session user yang aktif
  if (req.session && req.session.user) {
    // Jika user sudah login, lanjutkan ke route berikutnya
    return next();
  } else {
    // Jika user belum login, redirect ke halaman login
    return res.redirect("/login");
  }
}

module.exports = isAuthenticated;
