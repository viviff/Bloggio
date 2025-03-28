import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { structureService, articleService } from '@/services/airtable';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  Edit, 
  CheckCircle,
  RefreshCw,
  XCircle,
  Eye,
  ArrowRight,
  LayoutDashboard,
  CreditCard,
  Settings,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ArticleStructure {
  id: string;
  id_structure_article: number;
  thread_id: string;
  title: string;
  structure: string;
  demande_article: string;
  idUser: string;
  creation_date: string;
  update_date: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structures');
  const [structures, setStructures] = useState<ArticleStructure[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!user?.idUser) {
          throw new Error('Utilisateur non connecté');
        }

        // Récupérer les structures
        const structuresData = await structureService.getUserStructures(user.idUser);
        console.log('Structures récupérées:', structuresData);
        setStructures(structuresData);

        // Récupérer les articles
        const articlesData = await articleService.getUserArticles(user.idUser);
        console.log('Articles récupérés:', articlesData);
        setArticles(articlesData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.idUser]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  // Badges de statut
  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'completed') {
      return (
        <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="h-3 w-3 mr-1" />
          terminé
        </div>
      );
    } else if (status === 'processing') {
      return (
        <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          en cours
        </div>
      );
    } else {
      return (
        <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Edit className="h-3 w-3 mr-1" />
          brouillon
        </div>
      );
    }
  };

  // Filtrer les structures qui ont un article généré
  const structuresWithArticle = structures.filter(s => s.demande_article);
  const structuresWithoutArticle = structures.filter(s => !s.demande_article);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          
          <Link to="/new-article">
            <Button className="button-transition">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Structures générés</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {structures.filter(s => s.demande_article).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles générés</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {articles.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crédits restants</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.credits || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paramètres</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    Configurer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="structures" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="structures">Structures</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="structures">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : structures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {structures.map((structure) => (
                  <Card key={structure.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{structure.title}</CardTitle>
                      </div>
                      <CardDescription>
                        Créé le {formatDate(structure.creation_date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Dernière mise à jour :</strong> {formatDate(structure.update_date)}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Link to={`/edit-structure/${structure.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Valider
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Pas encore de structures</CardTitle>
                  <CardDescription>
                    Commencez par créer votre première structure d'article
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/new-article">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Créer une structure
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="articles">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <Badge 
                          variant={article.statut === 'Article généré' ? "default" : "secondary"}
                          className={article.statut === 'Article généré' ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {article.statut === 'Article généré' ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              {article.statut}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.statut}
                            </div>
                          )}
                        </Badge>
                      </div>
                      <CardDescription>
                        Créé le {formatDate(article.creation_date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {article.meta_description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Link to={`/edit-article/${article.id}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                        </Link>
                        {article.statut === 'Article généré' && (
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Publier
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Aucun article généré</CardTitle>
                  <CardDescription>
                    Les articles générés à partir de vos structures apparaîtront ici
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
