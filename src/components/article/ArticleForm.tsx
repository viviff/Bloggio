
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Link2, Hash, AlignLeft, Info } from 'lucide-react';

// Validation schema
const articleFormSchema = z.object({
  title: z.string().min(5, 'Le titre doit comporter au moins 5 caractères'),
  sourceUrl1: z.string().url('Veuillez entrer une URL valide').or(z.string().length(0)),
  sourceUrl2: z.string().url('Veuillez entrer une URL valide').or(z.string().length(0)),
  keyword: z.string().min(1, 'Veuillez entrer un mot-clé principal'),
  wordCount: z.coerce.number().min(300, 'Le nombre de mots doit être d\'au moins 300').max(5000, 'Le nombre de mots ne peut pas dépasser 5000'),
  additionalInfo: z.string(),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

const ArticleForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    sourceUrl1: '',
    sourceUrl2: '',
    keyword: '',
    wordCount: 1000,
    additionalInfo: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific field error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    try {
      articleFormSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check if user has enough credits
    if (user && user.credits < 1) {
      toast({
        title: "Crédits insuffisants",
        description: "Veuillez acheter plus de crédits pour générer des articles",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      toast({
        title: "Demande soumise",
        description: "La structure de votre article est en cours de génération",
      });
      
      // Navigate to the waiting page
      navigate('/edit-structure', { 
        state: { 
          articleData: formData,
          structureId: 'structure-' + Date.now() 
        } 
      });
    } catch (error) {
      toast({
        title: "Échec de la soumission",
        description: "Une erreur s'est produite lors de la soumission de votre demande",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Générer un nouvel article</CardTitle>
        <CardDescription>
          Remplissez le formulaire ci-dessous pour générer une nouvelle structure d'article.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center">
              <AlignLeft className="h-4 w-4 mr-2" />
              Titre de l'article
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex: Le guide ultime de la création de contenu"
              className={formErrors.title ? 'border-red-500' : ''}
            />
            {formErrors.title && (
              <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceUrl1" className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              URL source #1
            </Label>
            <Input
              id="sourceUrl1"
              name="sourceUrl1"
              value={formData.sourceUrl1}
              onChange={handleChange}
              placeholder="https://exemple.com/source1"
              className={formErrors.sourceUrl1 ? 'border-red-500' : ''}
            />
            {formErrors.sourceUrl1 && (
              <p className="text-red-500 text-xs mt-1">{formErrors.sourceUrl1}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceUrl2" className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              URL source #2 (Optionnel)
            </Label>
            <Input
              id="sourceUrl2"
              name="sourceUrl2"
              value={formData.sourceUrl2}
              onChange={handleChange}
              placeholder="https://exemple.com/source2"
              className={formErrors.sourceUrl2 ? 'border-red-500' : ''}
            />
            {formErrors.sourceUrl2 && (
              <p className="text-red-500 text-xs mt-1">{formErrors.sourceUrl2}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword" className="flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              Mot-clé principal
            </Label>
            <Input
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="ex: création de contenu"
              className={formErrors.keyword ? 'border-red-500' : ''}
            />
            {formErrors.keyword && (
              <p className="text-red-500 text-xs mt-1">{formErrors.keyword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wordCount" className="flex items-center">
              Nombre de mots
            </Label>
            <Input
              id="wordCount"
              name="wordCount"
              type="number"
              min={300}
              max={5000}
              value={formData.wordCount}
              onChange={handleChange}
              className={formErrors.wordCount ? 'border-red-500' : ''}
            />
            {formErrors.wordCount && (
              <p className="text-red-500 text-xs mt-1">{formErrors.wordCount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Informations complémentaires (Optionnel)
            </Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Ajoutez des exigences ou notes spécifiques concernant l'article"
              rows={4}
              className={formErrors.additionalInfo ? 'border-red-500' : ''}
            />
            {formErrors.additionalInfo && (
              <p className="text-red-500 text-xs mt-1">{formErrors.additionalInfo}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Coût: 1 crédit
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="button-transition"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            'Générer la structure d\'article'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleForm;
