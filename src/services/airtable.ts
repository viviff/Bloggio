import Airtable from 'airtable';
import { UserRole } from '@/context/AuthContext';

const base = new Airtable({ apiKey: 'pat5IJwBe7TtFKVXT.f58b30fefcd6f5bb5d0454ad3bab39517e3b40f7fc0ed5423e55403fd694aabb' }).base('appScDudrheiWtzPE');

// Interface pour les données utilisateur
interface AirtableUser {
  id: string;
  fields: {
    name: string;
    email: string;
    password: string; // Note: Dans un vrai projet, utilisez le hachage des mots de passe
    role: UserRole;
    credits: number;
  };
}

// Interface pour les structures d'articles
interface AirtableStructure {
  id: string;
  fields: {
    id_structure_article: number;
    thread_id: string;
    title: string;
    structure: string;
    demande_article: string; // ID de la table Demande_article
    idUser: string;
    creation_date: string;
    update_date: string;
  };
}

// Interface pour les articles
interface AirtableArticle {
  id: string;
  fields: {
    ArticleNumber: number;
    title: string;
    meta_title: string;
    meta_description: string;
    introduction: string;
    body: string;
    conclusion: string;
    html: string;
    miniature: string;
    idStructure: string;
    idUser: string;
    idArticle: string; // ID généré par Airtable
  };
}

// Service d'authentification
export const authService = {
  // Vérifier les identifiants de connexion
  async login(email: string, password: string) {
    try {
      const records = await base('Users')
        .select({
          filterByFormula: `AND({email} = '${email}', {password} = '${password}')`
        })
        .firstPage();

      if (records.length === 0) {
        throw new Error('Email ou mot de passe incorrect');
      }

      const user = records[0];
      return {
        id: user.id,
        idUser: user.id,
        name: user.fields.name as string,
        email: user.fields.email as string,
        role: user.fields.role as UserRole,
        credits: user.fields.credits as number
      };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  async register(name: string, email: string, password: string) {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await base('Users')
        .select({
          filterByFormula: `{email} = '${email}'`
        })
        .firstPage();

      if (existingUser.length > 0) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Créer le nouvel utilisateur
      const record = await base('Users').create([
        {
          fields: {
            name,
            email,
            password, // Note: Dans un vrai projet, utilisez le hachage des mots de passe
            role: 'user',
            credits: 50 // Crédits initiaux pour les nouveaux utilisateurs
          }
        }
      ]);

      const user = record[0];
      return {
        id: user.id,
        idUser: user.id,
        name: user.fields.name as string,
        email: user.fields.email as string,
        role: user.fields.role as UserRole,
        credits: user.fields.credits as number
      };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  },

  // Mettre à jour les crédits d'un utilisateur
  async updateCredits(userId: string, newCredits: number) {
    try {
      const records = await base('Users').update([
        {
          id: userId,
          fields: {
            credits: newCredits
          }
        }
      ]);

      const record = records[0];
      return {
        id: record.id,
        credits: record.fields.credits as number
      };
    } catch (error) {
      console.error('Erreur de mise à jour des crédits:', error);
      throw error;
    }
  }
};

// Service pour les structures d'articles
export const structureService = {
  // Récupérer toutes les structures d'un utilisateur
  async getUserStructures(userId: string) {
    try {
      console.log('Airtable: Fetching structures for user:', userId);
      const records = await base('Structure_article')
        .select({
          filterByFormula: `{idUser} = '${userId}'`
        })
        .all();
      
      console.log('Airtable: Raw records received:', records);
      
      const mappedRecords = records.map(record => ({
        id: record.id,
        id_structure_article: record.fields.id_structure_article as number,
        thread_id: record.fields.thread_id as string,
        title: record.fields.title as string,
        structure: record.fields.structure as string,
        demande_article: record.fields.demande_article as string,
        idUser: record.fields.idUser as string,
        creation_date: record.fields.creation_date as string,
        update_date: record.fields.update_date as string
      }));
      
      console.log('Airtable: Mapped records:', mappedRecords);
      return mappedRecords;
    } catch (error) {
      console.error('Erreur lors de la récupération des structures:', error);
      throw error;
    }
  },

  // Créer une nouvelle structure
  async createStructure(structureData: Omit<AirtableStructure['fields'], 'id_structure_article'>) {
    try {
      const records = await base('Structure_article').create([
        {
          fields: {
            thread_id: structureData.thread_id,
            title: structureData.title,
            structure: structureData.structure,
            demande_article: structureData.demande_article,
            idUser: structureData.idUser
          }
        }
      ]);

      const record = records[0];
      return {
        id: record.id,
        id_structure_article: record.fields.id_structure_article as number,
        thread_id: record.fields.thread_id as string,
        title: record.fields.title as string,
        structure: record.fields.structure as string,
        demande_article: record.fields.demande_article as string,
        idUser: record.fields.idUser as string
      };
    } catch (error) {
      console.error('Erreur lors de la création de la structure:', error);
      throw error;
    }
  },

  updateStructure: async (id: string, structure: string) => {
    try {
      const response = await base('Structure_article').update([
        {
          id: id,
          fields: {
            structure: structure
          }
        }
      ]);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la structure:', error);
      throw error;
    }
  }
};

// Service pour les articles
export const articleService = {
  // Récupérer tous les articles d'un utilisateur
  async getUserArticles(userId: string) {
    try {
      const records = await base('Article')
        .select({
          filterByFormula: `{idUser} = '${userId}'`
        })
        .all();
      
      const mappedRecords = records.map(record => ({
        id: record.id,
        ArticleNumber: record.fields.ArticleNumber as number,
        title: record.fields.title as string,
        meta_title: record.fields.meta_title as string,
        meta_description: record.fields.meta_description as string,
        introduction: record.fields.introduction as string,
        body: record.fields.body as string,
        conclusion: record.fields.conclusion as string,
        html: record.fields.html as string,
        miniature: record.fields.miniature as string,
        idStructure: record.fields.idStructure as string,
        idUser: record.fields.idUser as string,
        idArticle: record.id // On utilise l'ID de la ligne Airtable
      }));
      
      return mappedRecords;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;
    }
  },

  // Créer un nouvel article
  async createArticle(articleData: Omit<AirtableArticle['fields'], 'ArticleNumber' | 'idArticle'>) {
    try {
      const records = await base('Article').create([
        {
          fields: {
            title: articleData.title,
            meta_title: articleData.meta_title,
            meta_description: articleData.meta_description,
            introduction: articleData.introduction,
            body: articleData.body,
            conclusion: articleData.conclusion,
            html: articleData.html,
            miniature: articleData.miniature,
            idStructure: articleData.idStructure,
            idUser: articleData.idUser
          }
        }
      ]);

      const record = records[0];
      return {
        id: record.id,
        ArticleNumber: record.fields.ArticleNumber as number,
        title: record.fields.title as string,
        meta_title: record.fields.meta_title as string,
        meta_description: record.fields.meta_description as string,
        introduction: record.fields.introduction as string,
        body: record.fields.body as string,
        conclusion: record.fields.conclusion as string,
        html: record.fields.html as string,
        miniature: record.fields.miniature as string,
        idStructure: record.fields.idStructure as string,
        idUser: record.fields.idUser as string,
        idArticle: record.id // On utilise l'ID de la ligne Airtable
      };
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
  },

  // Mettre à jour un article
  async updateArticle(id: string, articleData: Partial<AirtableArticle['fields']>) {
    try {
      const response = await base('Article').update([
        {
          id: id,
          fields: articleData
        }
      ]);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      throw error;
    }
  }
}; 