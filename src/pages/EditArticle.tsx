import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { articleService } from '@/services/airtable';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, X, CheckCircle, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Article {
  id: string;
  title: string;
  'meta-title': string;
  'meta-description': string;
  introduction: string;
  body: string;
  conclusion: string;
  html: string;
  statut: string;
  creation_date: string;
}

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    'meta-title': '',
    'meta-description': '',
    introduction: '',
    body: '',
    conclusion: ''
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id || !user?.idUser) return;

        const articles = await articleService.getUserArticles(user.idUser);
        const foundArticle = articles.find(a => a.id === id);
        
        if (foundArticle) {
          setArticle({
            id: foundArticle.id,
            title: foundArticle.title,
            'meta-title': foundArticle.meta_title as string,
            'meta-description': foundArticle.meta_description as string,
            introduction: foundArticle.introduction,
            body: foundArticle.body,
            conclusion: foundArticle.conclusion,
            html: foundArticle.html,
            statut: foundArticle.statut,
            creation_date: foundArticle.creation_date
          });
          setFormData({
            title: foundArticle.title,
            'meta-title': foundArticle.meta_title as string,
            'meta-description': foundArticle.meta_description as string,
            introduction: foundArticle.introduction,
            body: foundArticle.body,
            conclusion: foundArticle.conclusion
          });
        } else {
          setError('Article non trouvé');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'article:', err);
        setError('Erreur lors du chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, user?.idUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!id || !user?.idUser) return;

      await articleService.updateArticle(id, {
        title: formData.title,
        'meta-title': formData['meta-title'],
        'meta-description': formData['meta-description'],
        introduction: formData.introduction,
        body: formData.body,
        conclusion: formData.conclusion
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      if (!id || !user?.idUser) return;

      await articleService.updateArticle(id, {
        title: formData.title,
        'meta-title': formData['meta-title'],
        'meta-description': formData['meta-description'],
        introduction: formData.introduction,
        body: formData.body,
        conclusion: formData.conclusion,
        statut: 'Article généré'
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la publication:', err);
      setError('Erreur lors de la publication');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/dashboard')}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Modifier l'article</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta titre</Label>
                <Input
                  id="meta-title"
                  name="meta-title"
                  value={formData['meta-title']}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta description</Label>
                <Input
                  id="meta-description"
                  name="meta-description"
                  value={formData['meta-description']}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="introduction">Introduction</Label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Corps de l'article</Label>
                <Textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conclusion">Conclusion</Label>
                <Textarea
                  id="conclusion"
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prévisualisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="whitespace-pre-line">{children}</p>
                  }}
                >
                  {`# ${formData.title}\n\n${formData.introduction}\n\n${formData.body}\n\n${formData.conclusion}`}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              disabled={saving}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
            {article?.statut === 'Article généré' && (
              <Button 
                onClick={handlePublish}
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Publier
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditArticle;
