import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  FileText, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  Image,
  Upload,
  CornerDownRight
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Section Héro */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Générez des Articles de <span className="text-primary">Haute Qualité</span> avec l'IA
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                Créez du contenu optimisé pour le SEO pour votre blog en quelques minutes, pas en heures. 
                Notre IA génère des articles bien documentés selon vos instructions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto button-transition">
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto button-transition">
                    Se connecter
                  </Button>
                </Link>
              </div>
              
              <div className="relative mt-12 mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4 text-gray-400">
                  Voir en action
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              
              <div className="glass-card overflow-hidden rounded-xl shadow-soft border border-gray-200 dark:border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="Interface du générateur d'articles" 
                  className="w-full h-auto rounded-t-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Fonctionnalités */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça fonctionne</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Du matériel source à un article prêt à publier en trois étapes simples
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Saisissez vos sources</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Entrez le titre de votre article, le mot-clé principal et jusqu'à deux URLs de référence. 
                  Ajoutez des instructions spécifiques pour la personnalisation.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Modifiez la structure</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Examinez et modifiez la structure d'article générée par l'IA. 
                  Ajoutez, supprimez ou réorganisez les sections selon vos besoins.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Publiez ou téléchargez</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Modifiez l'article final, générez une vignette personnalisée, 
                  et publiez directement sur WordPress ou téléchargez sous forme de fichier texte.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Avantages */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pourquoi choisir Bloggio
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Notre générateur d'articles IA vous aide à créer du contenu de haute qualité, 
                  optimisé pour le SEO en quelques minutes, pas en heures.
                </p>
                
                <ul className="space-y-4">
                  {[
                    'Contenu de haute qualité sans plagiat',
                    'Articles optimisés SEO avec mots-clés personnalisés',
                    'Intégration directe avec WordPress',
                    'Génération de vignettes personnalisées',
                    'Tarification simple à l\'article'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10">
                  <Link to="/register">
                    <Button size="lg" className="button-transition">
                      Commencer à créer des articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 glass-card rounded-xl overflow-hidden shadow-soft">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Personne rédigeant du contenu" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Témoignages */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ce que disent nos utilisateurs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Rejoignez des milliers de créateurs de contenu qui gagnent du temps avec Bloggio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Durand',
                  role: 'Responsable marketing de contenu',
                  image: 'https://randomuser.me/api/portraits/women/12.jpg',
                  quote: 'Bloggio a transformé mon processus de création de contenu. Ce qui me prenait des heures prend maintenant quelques minutes, et la qualité est tout aussi bonne, voire meilleure.'
                },
                {
                  name: 'Michel Chen',
                  role: 'Spécialiste SEO',
                  image: 'https://randomuser.me/api/portraits/men/32.jpg',
                  quote: 'L\'optimisation SEO est incroyable. Nos articles générés via Bloggio sont bien mieux classés que notre contenu créé manuellement. Ça a changé la donne.'
                },
                {
                  name: 'Émilie Lefèvre',
                  role: 'Propriétaire de blog',
                  image: 'https://randomuser.me/api/portraits/women/23.jpg',
                  quote: 'En tant que gestionnaire de plusieurs blogs, Bloggio m\'a permis d\'augmenter ma production de contenu sans sacrifier la qualité. L\'intégration WordPress est parfaite.'
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card rounded-lg p-6 flex flex-col animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="flex-1 text-gray-600 dark:text-gray-300 italic">
                    <CornerDownRight className="h-4 w-4 text-gray-400 inline mr-2" />
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section CTA */}
        <section className="py-12 md:py-20 bg-primary/5 dark:bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à transformer votre création de contenu ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                Commencez à créer des articles de haute qualité en quelques minutes avec notre plateforme alimentée par l'IA.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto button-transition">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto button-transition">
                    Se connecter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
