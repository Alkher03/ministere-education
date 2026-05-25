export default function Galeries() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Galerie photos et vidéos</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Tu pourras ajouter des images ici plus tard */}
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <span className="text-gray-500">Photo 1</span>
        </div>
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <span className="text-gray-500">Photo 2</span>
        </div>
        <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
          <span className="text-gray-500">Photo 3</span>
        </div>
      </div>
    </div>
  )
}