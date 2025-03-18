
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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Generate <span className="text-primary">High-Quality</span> Articles with AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                Create SEO-optimized content for your blog in minutes, not hours. 
                Our AI generates well-researched articles based on your instructions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto button-transition">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto button-transition">
                    Log In
                  </Button>
                </Link>
              </div>
              
              <div className="relative mt-12 mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4 text-gray-400">
                  See it in action
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              
              <div className="glass-card overflow-hidden rounded-xl shadow-soft border border-gray-200 dark:border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="Article Generator Interface" 
                  className="w-full h-auto rounded-t-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From source material to a publish-ready blog post in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Input Your Sources</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your article title, main keyword, and up to two reference URLs. 
                  Add any specific instructions for customization.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Edit Structure</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review and modify the AI-generated article structure. 
                  Add, remove, or rearrange sections to fit your needs.
                </p>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex flex-col items-center text-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Publish or Download</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Edit the final article, generate a custom thumbnail, 
                  and publish directly to WordPress or download as a text file.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose ArticleGen
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our AI article generator helps you create high-quality, 
                  SEO-optimized content in minutes, not hours.
                </p>
                
                <ul className="space-y-4">
                  {[
                    'High-quality, plagiarism-free content',
                    'SEO-optimized articles with custom keywords',
                    'Direct WordPress integration',
                    'Custom thumbnail generation',
                    'Simple pay-per-article pricing'
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
                      Start Creating Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 glass-card rounded-xl overflow-hidden shadow-soft">
                <img 
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Person writing content" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join thousands of content creators who save time with ArticleGen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Content Marketer',
                  image: 'https://randomuser.me/api/portraits/women/12.jpg',
                  quote: 'ArticleGen has transformed my content creation process. What used to take me hours now takes minutes, and the quality is just as good if not better.'
                },
                {
                  name: 'Michael Chen',
                  role: 'SEO Specialist',
                  image: 'https://randomuser.me/api/portraits/men/32.jpg',
                  quote: 'The SEO optimization is amazing. Our articles generated through ArticleGen rank much better than our manually created content. It\'s been a game-changer.'
                },
                {
                  name: 'Emily Williams',
                  role: 'Blog Owner',
                  image: 'https://randomuser.me/api/portraits/women/23.jpg',
                  quote: 'As someone who runs multiple blogs, ArticleGen has allowed me to scale my content production without sacrificing quality. The WordPress integration is seamless.'
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
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary/5 dark:bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Content Creation?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                Start creating high-quality articles in minutes with our AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto button-transition">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto button-transition">
                    Log In
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
