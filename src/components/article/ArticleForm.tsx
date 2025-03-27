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
import LoadingPopup from '@/components/ui/loading-popup';

// Validation schema
const articleFormSchema = z.object({
  Titre: z.string().min(5, 'Le titre doit comporter au moins 5 caractères'),
  Source: z.string().url('Veuillez entrer une URL valide').or(z.string().length(0)),
  sourceUrl2: z.string().url('Veuillez entrer une URL valide').or(z.string().length(0)),
  keyword: z.string().min(1, 'Veuillez entrer un mot-clé principal'),
  Nombredemot: z.coerce.number().min(300, 'Le nombre de mots doit être d\'au moins 300').max(5000, 'Le nombre de mots ne peut pas dépasser 5000'),
  InformationComplementaire: z.string(),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

const ArticleForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    Titre: '',
    Source: '',
    sourceUrl2: '',
    keyword: '',
    Nombredemot: 1000,
    InformationComplementaire: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Convertir en nombre si c'est le champ Nombredemot
    const finalValue = name === 'Nombredemot' ? Number(value) : value;
    
    setFormData({
      ...formData,
      [name]: finalValue,
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

    // Vérifier si l'utilisateur est connecté et a un idUser
    if (!user || !user.idUser) {
      toast({
        title: "Erreur d'authentification",
        description: "Veuillez vous reconnecter",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough credits
    if (user.credits < 1) {
      toast({
        title: "Crédits insuffisants",
        description: "Veuillez acheter plus de crédits pour générer des articles",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setShowLoadingPopup(true);
    
    try {
      // Créer l'objet de données avec l'idUser
      const formDataWithUser = {
        ...formData,
        idUser: user.idUser // S'assurer que l'idUser est inclus
      };

      console.log('Données envoyées:', formDataWithUser); // Pour le débogage

      const response = await fetch('https://tool.servprivjbd.fr/webhook/97e1db7d-dedd-447d-9189-77f83c42f5c6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUser),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de la structure');
      }

      const data = await response.json();
      
      toast({
        title: "Structure générée",
        description: "Votre article est prêt à être édité",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Échec de la génération",
        description: "Une erreur s'est produite lors de la génération de la structure",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowLoadingPopup(false);
    }
  };

  return (
    <>
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
              <Label htmlFor="Titre" className="flex items-center">
                <AlignLeft className="h-4 w-4 mr-2" />
                Titre de l'article
              </Label>
              <Input
                id="Titre"
                name="Titre"
                value={formData.Titre}
                onChange={handleChange}
                placeholder="ex: Le guide ultime de la création de contenu"
                className={formErrors.Titre ? 'border-red-500' : ''}
              />
              {formErrors.Titre && (
                <p className="text-red-500 text-xs mt-1">{formErrors.Titre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="Source" className="flex items-center">
                <Link2 className="h-4 w-4 mr-2" />
                URL source #1
              </Label>
              <Input
                id="Source"
                name="Source"
                value={formData.Source}
                onChange={handleChange}
                placeholder="https://exemple.com/source1"
                className={formErrors.Source ? 'border-red-500' : ''}
              />
              {formErrors.Source && (
                <p className="text-red-500 text-xs mt-1">{formErrors.Source}</p>
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
              <Label htmlFor="Nombredemot" className="flex items-center">
                Nombre de mots
              </Label>
              <Input
                id="Nombredemot"
                name="Nombredemot"
                type="number"
                min={300}
                max={5000}
                value={formData.Nombredemot}
                onChange={handleChange}
                className={formErrors.Nombredemot ? 'border-red-500' : ''}
              />
              {formErrors.Nombredemot && (
                <p className="text-red-500 text-xs mt-1">{formErrors.Nombredemot}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="InformationComplementaire" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Informations complémentaires (Optionnel)
              </Label>
              <Textarea
                id="InformationComplementaire"
                name="InformationComplementaire"
                value={formData.InformationComplementaire}
                onChange={handleChange}
                placeholder="Ajoutez des exigences ou notes spécifiques concernant l'article"
                rows={4}
                className={formErrors.InformationComplementaire ? 'border-red-500' : ''}
              />
              {formErrors.InformationComplementaire && (
                <p className="text-red-500 text-xs mt-1">{formErrors.InformationComplementaire}</p>
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

      {showLoadingPopup && (
        <LoadingPopup message="Génération de la structure, veuillez patienter" />
      )}
    </>
  );
};

export default ArticleForm;
