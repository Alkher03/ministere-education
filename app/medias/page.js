'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MediasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const videos = [
    {
      id: 1,
      titre: "Conseil ordinaire des Ministres - Impressions des nouveaux ministres",
      date: "06-05-2026",
      source: "Ministère Tchad",
      categorie: "Actualités",
      duree: "05:30",
      url: "https://youtu.be/TjzJOYu4X2E",
      embedUrl: "https://www.youtube.com/embed/TjzJOYu4X2E",
      description: "À la sortie du Conseil ordinaire des Ministres, les nouveaux ministres livrent leurs impressions sur leur prise de fonction."
    },
    {
      id: 2,
      titre: "Passation de charges - Ministère de la Jeunesse et des Sports",
      date: "07-04-2026",
      source: "Ministère Tchad",
      categorie: "Actualités",
      duree: "12:34",
      url: "#",
      embedUrl: "",
      description: "Cérémonie officielle de passation de charges au ministère."
    }
  ]

  const categories = ['Tous', 'Actualités', 'Émissions', 'Interviews']
  const featuredChannels = [
    { nom: "MINISTÈRE TV", description: "La chaîne officielle du Ministère", icon: "📺" }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.titre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || video.categorie === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Fonction pour obtenir l'ID YouTube
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/)
    return match ? match[1] : null
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Hero - Centré */}
      <div className="px-8 pt-12 pb-8 border-b border-gray-200 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full p-2 shadow-md">
            <Image
              src="/logoTchad-1.png"
              alt="Logo Ministère"
              width={60}
              height={60}
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
        <p className="text-xs tracking-widest uppercase text-blue-600 mb-3">
         Le Ministère de l'Éducation Nationale
        </p>
        <h1
          className="text-4xl font-semibold text-gray-900 leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Bibliothèque Média
        </h1>
        <div className="w-12 h-0.5 bg-yellow-500 mx-auto mt-4" />
        <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed mt-4">
          Retrouvez toutes les vidéos, émissions et contenus audiovisuels du ministère
        </p>
      </div>

      {/* Featured Channel - Centré */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="text-5xl">📺</div>
                <div>
                  <h2 className="text-xl font-semibold">CHAÎNE OFFICIELLE</h2>
                  <p className="text-blue-200 text-sm">Le Ministère de l'Éducation Nationale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - Centrée */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories - Centrées */}
      <div className="px-8 py-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vidéo mise en avant - YouTube */}
      <div className="px-8 py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📺 À la une</h2>
            <div className="w-12 h-0.5 bg-yellow-500" />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/TjzJOYu4X2E"
                title="Conseil ordinaire des Ministres - Impressions des nouveaux ministres"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">06-05-2026</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">À la une</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                À la sortie du Conseil ordinaire des Ministres, les nouveaux ministres livrent leurs impressions
              </h3>
              <p className="text-gray-600 text-sm">
                Découvrez les premières déclarations des nouveaux membres du gouvernement après leur nomination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid - Centrée */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📹 Toutes les vidéos</h2>
            <div className="w-12 h-0.5 bg-yellow-500" />
          </div>

          {filteredVideos.length > 0 ? (
            <div className="space-y-3">
              {filteredVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url !== "#" ? video.url : "#"}
                  target={video.url !== "#" ? "_blank" : "_self"}
                  rel={video.url !== "#" ? "noopener noreferrer" : ""}
                  className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{video.date}</span>
                        <span className="text-xs text-blue-600 font-medium">{video.source}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{video.categorie}</span>
                      </div>
                      <h3 className="text-md font-medium text-gray-900 hover:text-blue-600 transition">
                        {video.titre}
                      </h3>
                      {video.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{video.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">🎬 {video.duree}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-blue-600 font-medium">
                        {video.url !== "#" ? "▶ Regarder" : "🔜 Bientôt"}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-gray-400">Aucune vidéo trouvée.</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats - Centrées */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="px-8">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-semibold text-blue-700">{videos.length}</div>
                <div className="text-xs text-gray-400">Vidéos disponibles</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-700">100%</div>
                <div className="text-xs text-gray-400">Contenu officiel</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xl font-semibold text-blue-700"> Le Ministère de l'Éducation Nationale
 </div>
                <div className="text-xs text-gray-400">Ministère du Tchad</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière CHADCONNECTION2030 */}
      

    </div>
  )
}