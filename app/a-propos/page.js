export default function APropos() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">À propos du ministère</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">Notre mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Le Ministère de l'Éducation nationale a pour mission de garantir l'accès de tous à une éducation de qualité, 
            de former les citoyens de demain et de promouvoir l'excellence éducative sur l'ensemble du territoire.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">Nos valeurs</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>L'égalité des chances pour tous les élèves</li>
            <li>La laïcité et la neutralité du service public</li>
            <li>L'excellence et l'innovation pédagogique</li>
            <li>Le respect et l'inclusion de tous</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">Nos compétences</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Élaboration des programmes scolaires</li>
            <li>Gestion des personnels enseignants</li>
            <li>Organisation des examens nationaux</li>
            <li>Développement de la recherche en éducation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">Organisation</h2>
          <p className="text-gray-700 leading-relaxed">
            Le ministère est structuré en directions générales, services déconcentrés (rectorats, DASEN) 
            et établissements publics sous tutelle, permettant une mise en œuvre efficace de la politique éducative.
          </p>
        </section>
      </div>
    </div>
  )
}