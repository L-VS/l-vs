import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Brush,
  Settings,
  ImagePlus,
  Link,
  FilePlus,
  Edit,
  LayoutDashboard,
  Palette,
  LogOut,
  Trash2,
  Save,
  Eye
} from 'lucide-react';

// Types of themes
interface ThemeOption {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

// Sample project data
const initialProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Responsive portfolio with dark mode and accessibility features",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=1200&q=80",
    technologies: ["React", "TailwindCSS", "Node.js"],
    featured: true
  },
  {
    id: 2,
    title: "Mobile App UI Kit",
    description: "Comprehensive UI kit for mobile applications",
    category: "design",
    imageUrl: "https://images.unsplash.com/photo-1543069190-4dd17733f9ff?auto=format&fit=crop&w=1200&h=1200&q=80",
    technologies: ["Figma", "Sketch", "Adobe XD"],
    featured: false
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with admin panel",
    category: "web",
    imageUrl: "https://images.unsplash.com/photo-1572177191856-3cde618dee1f?auto=format&fit=crop&w=1200&h=1200&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    featured: true
  }
];

// Sample theme options
const themeOptions: ThemeOption[] = [
  { name: "Black & White", primary: "#000000", secondary: "#f5f5f5", accent: "#333333" },
  { name: "Dark Mode", primary: "#121212", secondary: "#2d2d2d", accent: "#bb86fc" },
  { name: "Nord", primary: "#3b4252", secondary: "#e5e9f0", accent: "#88c0d0" },
  { name: "Minimal", primary: "#ffffff", secondary: "#f0f0f0", accent: "#000000" },
];

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(themeOptions[0]);
  const [customLogoUrl, setCustomLogoUrl] = useState("");
  const [customCss, setCustomCss] = useState("");
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPage, setNewPage] = useState({ title: "", path: "", content: "" });

  // Check if user is authorized
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem('admin-auth') === 'true';
    if (!isAuthorized) {
      navigate('/');
    }
  }, [navigate]);

  // Apply theme instantly for preview
  useEffect(() => {
    const root = document.documentElement;
    if (selectedTheme) {
      root.style.setProperty('--primary', hexToRgb(selectedTheme.primary));
      root.style.setProperty('--secondary', hexToRgb(selectedTheme.secondary));
      root.style.setProperty('--accent', hexToRgb(selectedTheme.accent));
    }

    // Apply custom CSS if any
    let styleEl = document.getElementById('custom-admin-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'custom-admin-styles';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = customCss;

    return () => {
      // Cleanup on unmount
      if (styleEl) {
        document.head.removeChild(styleEl);
      }
    };
  }, [selectedTheme, customCss]);

  // Convert hex to RGB format
  function hexToRgb(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r} ${g} ${b}`;
  }

  const handleAddProject = () => {
    setEditingProject({
      id: Date.now(),
      title: "",
      description: "",
      category: "web",
      imageUrl: "",
      technologies: [],
      featured: false
    });
  };

  const handleEditProject = (project: any) => {
    setEditingProject({...project});
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSaveProject = () => {
    if (editingProject) {
      const exists = projects.some(p => p.id === editingProject.id);
      if (exists) {
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      } else {
        setProjects([...projects, editingProject]);
      }
      setEditingProject(null);
    }
  };

  const handleAddPage = () => {
    setIsAddingPage(true);
  };

  const handleSavePage = () => {
    // In a real app, you would save this to a database
    console.log("New page:", newPage);
    setIsAddingPage(false);
    setNewPage({ title: "", path: "", content: "" });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    navigate('/');
  };

  // If not authorized, return empty div (will redirect)
  if (!sessionStorage.getItem('admin-auth')) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin CMS | L-VS</title>
      </Helmet>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-64 bg-card border-r border-border h-screen flex flex-col"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin CMS</h1>
            
            <nav className="space-y-2">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button 
                variant={activeTab === "projects" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("projects")}
              >
                <Brush className="mr-2 h-4 w-4" />
                Projets
              </Button>
              
              <Button 
                variant={activeTab === "appearance" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("appearance")}
              >
                <Palette className="mr-2 h-4 w-4" />
                Apparence
              </Button>
              
              <Button 
                variant={activeTab === "settings" ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </nav>
          </div>
          
          <div className="mt-auto p-6">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          <header className="border-b border-border p-4">
            <h2 className="text-xl font-semibold">
              {activeTab === "dashboard" && "Tableau de bord"}
              {activeTab === "projects" && "Gestion des projets"}
              {activeTab === "appearance" && "Personnalisation de l'apparence"}
              {activeTab === "settings" && "Paramètres du site"}
            </h2>
          </header>
          
          <main className="p-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Total Projets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{projects.length}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Projets en vedette</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {projects.filter(p => p.featured).length}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Dernière mise à jour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl">
                        {new Date().toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Button onClick={() => setActiveTab("projects")} className="justify-start">
                      <FilePlus className="mr-2 h-4 w-4" /> Ajouter un projet
                    </Button>
                    <Button onClick={() => setActiveTab("appearance")} className="justify-start">
                      <Palette className="mr-2 h-4 w-4" /> Modifier l'apparence
                    </Button>
                    <Button onClick={handleAddPage} className="justify-start">
                      <FilePlus className="mr-2 h-4 w-4" /> Créer une page
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                {editingProject ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingProject.id ? "Modifier le projet" : "Ajouter un projet"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input 
                          id="title" 
                          value={editingProject.title} 
                          onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          value={editingProject.description} 
                          onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <select 
                          id="category" 
                          className="w-full p-2 border rounded-md" 
                          value={editingProject.category}
                          onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                        >
                          <option value="web">Web</option>
                          <option value="mobile">Mobile</option>
                          <option value="design">Design</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL de l'image</Label>
                        <Input 
                          id="imageUrl" 
                          value={editingProject.imageUrl} 
                          onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="technologies">Technologies (séparées par des virgules)</Label>
                        <Input 
                          id="technologies" 
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(", ") : ""}
                          onChange={e => setEditingProject({
                            ...editingProject, 
                            technologies: e.target.value.split(",").map((tech: string) => tech.trim())
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="featured" 
                          checked={editingProject.featured} 
                          onCheckedChange={(checked) => setEditingProject({...editingProject, featured: checked})}
                        />
                        <Label htmlFor="featured">En vedette</Label>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingProject(null)}>
                          Annuler
                        </Button>
                        <Button onClick={handleSaveProject}>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Liste des projets</h3>
                      <Button onClick={handleAddProject}>
                        <FilePlus className="mr-2 h-4 w-4" /> Ajouter un projet
                      </Button>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titre</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>En vedette</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map(project => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div className="font-medium">{project.title}</div>
                            </TableCell>
                            <TableCell>{project.category}</TableCell>
                            <TableCell>
                              {project.featured ? "Oui" : "Non"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </div>
            )}
            
            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Tabs defaultValue="themes">
                  <TabsList>
                    <TabsTrigger value="themes">Thèmes</TabsTrigger>
                    <TabsTrigger value="logo">Logo</TabsTrigger>
                    <TabsTrigger value="css">CSS personnalisé</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="themes" className="space-y-4 mt-4">
                    <h3 className="text-lg font-medium">Choix du thème</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {themeOptions.map((theme) => (
                        <Card 
                          key={theme.name}
                          className={`cursor-pointer transition-all ${selectedTheme.name === theme.name ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                          onClick={() => setSelectedTheme(theme)}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{theme.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex space-x-2">
                              <div 
                                className="w-8 h-8 rounded-full border" 
                                style={{ backgroundColor: theme.primary }}
                              />
                              <div 
                                className="w-8 h-8 rounded-full border" 
                                style={{ backgroundColor: theme.secondary }}
                              />
                              <div 
                                className="w-8 h-8 rounded-full border" 
                                style={{ backgroundColor: theme.accent }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Personnaliser les couleurs</CardTitle>
                        <CardDescription>Ajuster les couleurs du thème actuel</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="primaryColor">Couleur primaire</Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="primaryColor"
                                value={selectedTheme.primary}
                                onChange={(e) => setSelectedTheme({...selectedTheme, primary: e.target.value})}
                                className="w-10 h-10 border-none rounded"
                              />
                              <Input
                                value={selectedTheme.primary}
                                onChange={(e) => setSelectedTheme({...selectedTheme, primary: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="secondaryColor"
                                value={selectedTheme.secondary}
                                onChange={(e) => setSelectedTheme({...selectedTheme, secondary: e.target.value})}
                                className="w-10 h-10 border-none rounded"
                              />
                              <Input
                                value={selectedTheme.secondary}
                                onChange={(e) => setSelectedTheme({...selectedTheme, secondary: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="accentColor">Couleur d'accent</Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                id="accentColor"
                                value={selectedTheme.accent}
                                onChange={(e) => setSelectedTheme({...selectedTheme, accent: e.target.value})}
                                className="w-10 h-10 border-none rounded"
                              />
                              <Input
                                value={selectedTheme.accent}
                                onChange={(e) => setSelectedTheme({...selectedTheme, accent: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Button>
                          <Save className="mr-2 h-4 w-4" /> Enregistrer les changements
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="logo" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Logo du site</CardTitle>
                        <CardDescription>Personnalisez le logo de votre site</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="logoUrl">URL du logo</Label>
                          <Input 
                            id="logoUrl" 
                            value={customLogoUrl} 
                            onChange={(e) => setCustomLogoUrl(e.target.value)}
                            placeholder="https://votre-site.com/logo.png"
                          />
                        </div>
                        
                        <div className="p-6 border rounded-md flex justify-center">
                          {customLogoUrl ? (
                            <img 
                              src={customLogoUrl} 
                              alt="Logo personnalisé" 
                              className="max-h-20 max-w-full" 
                            />
                          ) : (
                            <div className="flex flex-col items-center text-muted-foreground">
                              <ImagePlus className="h-12 w-12 mb-2" />
                              <span>Prévisualisation du logo</span>
                            </div>
                          )}
                        </div>
                        
                        <Button>
                          <Save className="mr-2 h-4 w-4" /> Appliquer le logo
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="css" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>CSS personnalisé</CardTitle>
                        <CardDescription>Ajoutez du CSS personnalisé pour personnaliser l'apparence du site</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea 
                          value={customCss} 
                          onChange={(e) => setCustomCss(e.target.value)}
                          placeholder="/* Votre CSS personnalisé ici */\n.header { background-color: #000; }"
                          className="font-mono min-h-[200px]"
                        />
                        
                        <Button>
                          <Save className="mr-2 h-4 w-4" /> Appliquer le CSS
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres généraux</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteTitle">Titre du site</Label>
                      <Input id="siteTitle" defaultValue="L-VS | Portfolio" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Description du site</Label>
                      <Textarea 
                        id="siteDescription" 
                        defaultValue="Portfolio de L-VS présentant des projets créatifs de développement web et mobile."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="faviconUrl">URL du favicon</Label>
                      <Input 
                        id="faviconUrl" 
                        placeholder="https://votre-site.com/favicon.ico"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="darkModeDefault" defaultChecked />
                      <Label htmlFor="darkModeDefault">Mode sombre par défaut</Label>
                    </div>
                    
                    <Button>
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les paramètres
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Liens sociaux</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn</Label>
                      <Input id="linkedinUrl" placeholder="https://linkedin.com/in/votre-profil" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub</Label>
                      <Input id="githubUrl" placeholder="https://github.com/votre-profil" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitterUrl">Twitter</Label>
                      <Input id="twitterUrl" placeholder="https://twitter.com/votre-profil" />
                    </div>
                    
                    <Button>
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les liens
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Add Page Modal */}
            {isAddingPage && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Ajouter une nouvelle page</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pageTitle">Titre</Label>
                    <Input 
                      id="pageTitle" 
                      value={newPage.title} 
                      onChange={e => setNewPage({...newPage, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pagePath">Chemin URL</Label>
                    <div className="flex">
                      <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">
                        /
                      </span>
                      <Input 
                        id="pagePath" 
                        value={newPage.path} 
                        onChange={e => setNewPage({...newPage, path: e.target.value})}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pageContent">Contenu</Label>
                    <Textarea 
                      id="pageContent" 
                      value={newPage.content} 
                      onChange={e => setNewPage({...newPage, content: e.target.value})}
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingPage(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSavePage}>
                      <Save className="mr-2 h-4 w-4" /> Créer la page
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </motion.div>
      </div>
    </div>
  );
}