import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Lock } from 'lucide-react';

// Ces identifiants seraient normalement stockés sécurisés côté serveur
// C'est uniquement pour démontrer la fonction
const SECRET_USERNAME = 'l-vs-admin';
const SECRET_PASSWORD = 'portfolio2025';

export function SecretAdmin() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation pour secouer le formulaire quand les identifiants sont incorrects
  const shakeAnimation = {
    initial: { x: 0 },
    shake: { 
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === SECRET_USERNAME && password === SECRET_PASSWORD) {
      // Stocker dans sessionStorage (pas localStorage pour des raisons de sécurité)
      sessionStorage.setItem('admin-auth', 'true');
      // Rediriger vers le CMS admin
      navigate('/super-admin-dashboard');
    } else {
      setError('Identifiants incorrects');
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          variants={shakeAnimation}
          animate={isAnimating ? 'shake' : 'initial'}
        >
          <Card className="shadow-lg border-gray-200 dark:border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Lock className="h-6 w-6" />
                Accès Administrateur
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Espace réservé
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Identifiant
                  </label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      placeholder="Identifiant"
                      required
                    />
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="Mot de passe"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Button type="submit" className="w-full">
                  Connexion
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}