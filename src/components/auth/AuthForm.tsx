import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';

// Schémas de validation
const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, loginWithGoogle, register, loading, error, clearErrors } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
    ...(type === 'register' ? { name: '', confirmPassword: '' } : {}),
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Effacer l'erreur spécifique au champ lors de la saisie
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    try {
      if (type === 'login') {
        loginSchema.parse(formData);
      } else {
        registerSchema.parse(formData);
      }
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
    
    try {
      if (type === 'login') {
        const { email, password } = formData as LoginFormData;
        await login(email, password);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur Bloggio",
        });
        navigate('/dashboard');
      } else {
        const { name, email, password } = formData as RegisterFormData;
        await register(name, email, password);
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé",
        });
        navigate('/dashboard');
      }
    } catch (err) {
      // L'erreur est gérée par le contexte d'authentification
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Connexion Google réussie",
        description: "Bienvenue sur Bloggio",
      });
      navigate('/dashboard');
    } catch (err) {
      // L'erreur est gérée par le contexte d'authentification
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="glass-card p-8 rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {type === 'login' ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Jean Dupont"
                value={(formData as RegisterFormData).name || ''}
                onChange={handleChange}
                className={formErrors.name ? 'border-red-500' : ''}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'border-red-500' : ''}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>
          
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={(formData as RegisterFormData).confirmPassword || ''}
                  onChange={handleChange}
                  className={formErrors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full button-transition" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === 'login' ? 'Connexion en cours...' : 'Création du compte...'}
              </>
            ) : (
              type === 'login' ? 'Se connecter' : 'Créer un compte'
            )}
          </Button>
        </form>
        
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-gray-500 dark:text-gray-400">
              Ou continuer avec
            </span>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4 button-transition"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
