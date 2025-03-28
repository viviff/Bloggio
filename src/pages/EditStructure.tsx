import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { structureService } from '@/services/airtable';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const EditStructure: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [structure, setStructure] = useState<ArticleStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedStructure, setEditedStructure] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchStructure = async () => {
      if (id && user?.idUser) {
        try {
          const structures = await structureService.getUserStructures(user.idUser);
          const foundStructure = structures.find(s => s.id === id);
          if (foundStructure) {
            setStructure(foundStructure);
            setEditedStructure(foundStructure.structure);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la structure:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStructure();
  }, [id, user?.idUser]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const handleCancel = () => {
    setEditedStructure(structure?.structure || '');
    toast({
      title: "Modifications annulées",
      description: "La structure a été restaurée à son état initial",
    });
  };

  const handleSave = async () => {
    if (!structure) return;
    
    setIsSaving(true);
    try {
      await structureService.updateStructure(structure.id, editedStructure);
      toast({
        title: "Structure mise à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
      // Mettre à jour la structure locale avec les nouvelles données
      setStructure({
        ...structure,
        structure: editedStructure,
        update_date: new Date().toISOString()
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!structure) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Structure non trouvée</h2>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Retour au tableau de bord
          </Button>
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
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{structure.title}</h1>
        </div>

        <div className="text-sm text-muted-foreground">
          Créée le {formatDate(structure.creation_date)}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Structure Markdown</label>
            <Textarea
              value={editedStructure}
              onChange={(e) => setEditedStructure(e.target.value)}
              className="font-mono min-h-[600px] text-sm"
              placeholder="Entrez votre structure Markdown ici..."
            />
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleCancel} 
              disabled={isSaving}
              variant="destructive"
            >
              Annuler
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSave}
              disabled={isSaving || editedStructure === structure.structure}
              className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditStructure;
