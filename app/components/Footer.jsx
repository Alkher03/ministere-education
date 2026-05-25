export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/TchadEducation",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
      hoverColor: "hover:bg-blue-600"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/tchadeducation",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      hoverColor: "hover:bg-pink-600"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/tchadeducation",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
        </svg>
      ),
      hoverColor: "hover:bg-blue-800"
    }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne 1 - Ministère */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Ministère de l'Éducation du Tchad</h3>
            <p className="text-sm text-gray-400">Service public de l'éducation nationale du Tchad</p>
          </div>
          
          {/* Colonne 2 - Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: tchadeducation@yahoo.fr</li>
              <li>Tel: +235 22 51 93 24</li>
            </ul>
          </div>
          
          {/* Colonne 3 - Réseaux sociaux */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Suivez-nous</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.hoverColor} transition group`}
                >
                  <div className="w-5 h-5 text-gray-400 group-hover:text-white transition">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Suivez l'actualité du ministère</p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ministère de l'Éducation Nationale du Tchad - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}