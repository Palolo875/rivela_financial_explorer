import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InsightCard from './components/InsightCard';
import SearchAndFilter from './components/SearchAndFilter';
import RecommendedSection from './components/RecommendedSection';
import ProgressTracker from './components/ProgressTracker';
import CategoryGrid from './components/CategoryGrid';

const NeuroscienceInsightsLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    difficulty: '',
    sort: 'relevance',
    bookmarked: false,
    completed: false
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bookmarkedInsights, setBookmarkedInsights] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [showProgressTracker, setShowProgressTracker] = useState(true);

  // Mock data for insights
  const allInsights = [
    {
      id: 1,
      title: "L\'Impact des Émotions sur les Décisions d\'Achat",
      description: "Découvrez comment le système limbique influence vos choix financiers et comment reprendre le contrôle de vos dépenses émotionnelles.",
      category: "Déclencheurs Émotionnels",
      difficulty: "Débutant",
      readingTime: 8,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      publicationDate: "15 Jan 2025",
      citations: 23,
      progress: 0,
      detailedExplanation: `Le cerveau humain traite les décisions financières dans deux systèmes distincts : le système limbique (émotionnel) et le cortex préfrontal (rationnel).\n\nLorsque nous sommes stressés, fatigués ou émotionnellement chargés, le système limbique prend le dessus, nous poussant vers des décisions impulsives. C'est pourquoi nous achetons souvent des choses dont nous n'avons pas besoin quand nous nous sentons tristes, anxieux ou même très heureux.\n\nLes neurosciences montrent que les émotions positives et négatives peuvent toutes deux déclencher des comportements d'achat compensatoires. La dopamine, libérée lors d'un achat, procure une satisfaction temporaire qui peut créer une dépendance.`,
      practicalApplications: [
        "Identifiez vos déclencheurs émotionnels avant de faire des achats importants",
        "Instaurez une règle des 24 heures pour les achats non essentiels",
        "Créez un environnement d'achat moins stimulant (supprimez les apps, évitez les centres commerciaux quand vous êtes vulnérable)",
        "Développez des alternatives saines pour gérer vos émotions (sport, méditation, appel à un ami)"
      ],
      personalRelevance: "Vos données montrent des pics de dépenses les vendredis soirs et après des journées stressantes. Cette corrélation suggère un pattern de dépenses émotionnelles compensatoires.",
      quiz: [
        {
          question: "Quel système cérébral est principalement responsable des achats impulsifs ?",
          options: [
            "Le cortex préfrontal",
            "Le système limbique",
            "L\'hippocampe",
            "Le cervelet"
          ]
        },
        {
          question: "Quelle hormone est libérée lors d\'un achat et procure du plaisir ?",
          options: [
            "La sérotonine",
            "Le cortisol",
            "La dopamine",
            "L\'adrénaline"
          ]
        }
      ],
      sources: [
        {
          title: "Emotional Decision Making and Financial Behavior",
          authors: "Dr. Sarah Chen, Prof. Michael Rodriguez",
          journal: "Journal of Behavioral Economics",
          year: "2024"
        },
        {
          title: "Neuroscience of Consumer Behavior",
          authors: "Dr. Emma Thompson",
          journal: "Cognitive Science Review",
          year: "2023"
        }
      ]
    },
    {
      id: 2,
      title: "La Fatigue Décisionnelle et Vos Finances",
      description: "Pourquoi nous prenons de mauvaises décisions financières en fin de journée et comment optimiser notre énergie mentale.",
      category: "Fatigue Décisionnelle",
      difficulty: "Intermédiaire",
      readingTime: 12,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      publicationDate: "12 Jan 2025",
      citations: 31,
      progress: 45,
      detailedExplanation: `La fatigue décisionnelle est un phénomène neurologique où notre capacité à prendre des décisions de qualité diminue après avoir pris de nombreuses décisions.\n\nLe cortex préfrontal, responsable de la prise de décision rationnelle, consomme énormément d'énergie. Comme un muscle, il se fatigue avec l'usage. C'est pourquoi nous sommes plus susceptibles de céder aux tentations financières en fin de journée.\n\nLes études montrent que les juges prononcent des sentences plus sévères le matin et sont plus cléments après le déjeuner. Le même principe s'applique à nos décisions financières : nous sommes plus disciplinés le matin et plus impulsifs le soir.`,
      practicalApplications: [
        "Planifiez vos décisions financières importantes le matin",
        "Automatisez vos épargnes et investissements pour éviter la fatigue décisionnelle",
        "Créez des règles simples pour les décisions récurrentes",
        "Prenez des pauses régulières lors de sessions de planification financière longues"
      ],
      personalRelevance: "Vos achats en ligne se concentrent entre 19h et 22h, période de fatigue décisionnelle maximale. Considérez bloquer les sites d'achat après 18h.",
      quiz: [
        {
          question: "À quel moment de la journée notre capacité décisionnelle est-elle optimale ?",
          options: [
            "Le matin",
            "L\'après-midi",
            "Le soir",
            "La nuit"
          ]
        }
      ],
      sources: [
        {
          title: "Decision Fatigue and Financial Choices",
          authors: "Dr. James Wilson, Dr. Lisa Park",
          journal: "Behavioral Finance Quarterly",
          year: "2024"
        }
      ]
    },
    {
      id: 3,
      title: "Le Système de Récompense et l\'Argent",
      description: "Comment la dopamine influence nos habitudes d'épargne et de dépense, et comment utiliser cette connaissance à notre avantage.",
      category: "Psychologie des Récompenses",
      difficulty: "Avancé",
      readingTime: 15,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      publicationDate: "10 Jan 2025",
      citations: 42,
      progress: 0,
      detailedExplanation: `Le système de récompense du cerveau, centré sur la dopamine, joue un rôle crucial dans nos comportements financiers.\n\nLa dopamine n'est pas libérée lors de la récompense elle-même, mais en anticipation de celle-ci. C'est pourquoi l'acte d'acheter procure souvent plus de plaisir que la possession de l'objet acheté.\n\nCe système peut être "piraté" par le marketing et les techniques de vente, mais il peut aussi être utilisé positivement pour développer de bonnes habitudes financières en créant des récompenses pour l'épargne et les investissements.`,
      practicalApplications: [
        "Créez des récompenses immédiates pour vos objectifs d'épargne",
        "Visualisez vos objectifs financiers pour activer le système de récompense",
        "Utilisez des applications qui gamifient l'épargne",
        "Célébrez vos petites victoires financières"
      ],
      quiz: [
        {
          question: "Quand la dopamine est-elle principalement libérée ?",
          options: [
            "Pendant la récompense",
            "Après la récompense",
            "En anticipation de la récompense",
            "Jamais"
          ]
        }
      ],
      sources: [
        {
          title: "Dopamine and Financial Behavior",
          authors: "Dr. Robert Kim, Dr. Anna Martinez",
          journal: "Neuroscience & Economics",
          year: "2024"
        }
      ]
    },
    {
      id: 4,
      title: "Les Biais Cognitifs dans l'Investissement",
      description: "Identifiez et surmontez les biais mentaux qui sabotent vos décisions d'investissement.",
      category: "Biais Cognitifs",
      difficulty: "Intermédiaire",
      readingTime: 10,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      publicationDate: "08 Jan 2025",
      citations: 28,
      progress: 100,
      detailedExplanation: `Les biais cognitifs sont des déviations systématiques de la rationalité dans notre prise de décision.\n\nEn finance, ces biais peuvent coûter cher : biais de confirmation (chercher uniquement les informations qui confirment nos croyances), effet d'ancrage (se fier trop fortement à la première information reçue), aversion aux pertes (préférer éviter les pertes plutôt que d'acquérir des gains équivalents).\n\nComprendre ces biais permet de mettre en place des stratégies pour les contourner et prendre des décisions plus rationnelles.`,
      practicalApplications: [
        "Diversifiez vos sources d'information financière",
        "Utilisez des règles de décision prédéfinies",
        "Demandez l\'avis d\'une tierce personne pour les décisions importantes",
        "Tenez un journal de vos décisions pour identifier vos patterns de biais"
      ],
      quiz: [
        {
          question: "Qu\'est-ce que l\'aversion aux pertes ?",
          options: [
            "La peur de perdre de l\'argent",
            "Préférer éviter les pertes plutôt que d\'acquérir des gains équivalents",
            "Ne jamais investir",
            "Investir uniquement dans des produits sûrs"
          ]
        }
      ],
      sources: [
        {
          title: "Cognitive Biases in Investment Decisions",
          authors: "Dr. Helen Chang, Prof. David Brown",
          journal: "Investment Psychology Review",
          year: "2023"
        }
      ]
    },
    {
      id: 5,
      title: "Formation des Habitudes Financières",
      description: "La science derrière la création d\'habitudes durables d\'épargne et de gestion financière.",
      category: "Habitudes Financières",
      difficulty: "Débutant",
      readingTime: 7,
      image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop",
      publicationDate: "05 Jan 2025",
      citations: 19,
      progress: 30,
      detailedExplanation: `Les habitudes se forment dans les ganglions de la base, une région du cerveau qui automatise les comportements répétitifs.\n\nUne habitude suit toujours le même schéma : signal → routine → récompense. Pour créer une habitude d'épargne durable, il faut identifier le bon signal (par exemple, recevoir son salaire), définir une routine simple (virer automatiquement 10% sur un compte épargne), et s'assurer d'une récompense (visualiser ses objectifs atteints).\n\nLes neurosciences montrent qu'il faut en moyenne 66 jours pour qu'une nouvelle habitude devienne automatique.`,
      practicalApplications: [
        "Commencez par de petites habitudes (épargner 1€ par jour)",
        "Liez vos nouvelles habitudes à des habitudes existantes",
        "Créez un environnement qui favorise les bonnes habitudes",
        "Suivez vos progrès visuellement"
      ],
      quiz: [
        {
          question: "Combien de temps faut-il en moyenne pour qu\'une habitude devienne automatique ?",
          options: [
            "21 jours",
            "30 jours",
            "66 jours",
            "100 jours"
          ]
        }
      ],
      sources: [
        {
          title: "The Neuroscience of Habit Formation",
          authors: "Dr. Maria Garcia, Dr. John Smith",
          journal: "Behavioral Science Today",
          year: "2024"
        }
      ]
    },
    {
      id: 6,
      title: "Stress Financier et Cortisol",
      description: "Comment le stress chronique affecte vos décisions financières et votre capacité d\'épargne.",
      category: "Stress et Argent",
      difficulty: "Intermédiaire",
      readingTime: 9,
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
      publicationDate: "03 Jan 2025",
      citations: 35,
      progress: 0,
      detailedExplanation: `Le stress financier déclenche la libération de cortisol, l'hormone du stress, qui affecte directement notre capacité à prendre des décisions rationnelles.\n\nLe cortisol chronique réduit l'activité du cortex préfrontal et augmente l'activité de l'amygdale, nous rendant plus impulsifs et moins capables de planifier à long terme. C'est un cercle vicieux : le stress financier nous fait prendre de mauvaises décisions, qui créent plus de stress.\n\nLes techniques de gestion du stress peuvent littéralement améliorer nos capacités financières en restaurant l'équilibre hormonal optimal pour la prise de décision.`,
      practicalApplications: [
        "Pratiquez la méditation ou la respiration profonde avant les décisions financières importantes",
        "Créez un fonds d\'urgence pour réduire l\'anxiété financière",
        "Séparez les émotions des décisions financières",
        "Consultez un professionnel si le stress financier devient chronique"
      ],
      quiz: [
        {
          question: "Quelle hormone est principalement libérée lors du stress financier ?",
          options: [
            "La dopamine",
            "La sérotonine",
            "Le cortisol",
            "L\'adrénaline"
          ]
        }
      ],
      sources: [
        {
          title: "Financial Stress and Cortisol Impact",
          authors: "Dr. Rachel Green, Dr. Mark Johnson",
          journal: "Stress & Finance Quarterly",
          year: "2024"
        }
      ]
    }
  ];

  // Mock recommendations based on user behavior
  const recommendations = [
    allInsights[0], // Emotional triggers
    allInsights[1], // Decision fatigue
    allInsights[5]  // Stress and money
  ];

  // Mock progress data
  const progressData = {
    completedModules: 8,
    totalModules: 24,
    currentStreak: 5,
    longestStreak: 12,
    weeklyGoal: 5,
    weeklyProgress: 3,
    achievements: [
      {
        id: 1,
        title: "Premier Insight Complété",
        description: "Vous avez terminé votre premier module d\'apprentissage",
        icon: "BookOpen",
        rarity: "common",
        earnedDate: "Il y a 2 jours"
      },
      {
        id: 2,
        title: "Série de 5 Jours",
        description: "Apprentissage quotidien pendant 5 jours consécutifs",
        icon: "Flame",
        rarity: "rare",
        earnedDate: "Aujourd\'hui"
      }
    ]
  };

  // Filter insights based on search and filters
  const filteredInsights = allInsights.filter(insight => {
    const matchesSearch = searchQuery === '' || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeFilters.category === '' || 
      insight.category === activeFilters.category;

    const matchesDifficulty = activeFilters.difficulty === '' || 
      insight.difficulty === activeFilters.difficulty;

    const matchesBookmarked = !activeFilters.bookmarked || 
      bookmarkedInsights.includes(insight.id);

    const matchesCompleted = !activeFilters.completed || 
      insight.progress === 100;

    return matchesSearch && matchesCategory && matchesDifficulty && 
           matchesBookmarked && matchesCompleted;
  });

  // Sort insights
  const sortedInsights = [...filteredInsights].sort((a, b) => {
    switch (activeFilters.sort) {
      case 'newest':
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      case 'oldest':
        return new Date(a.publicationDate) - new Date(b.publicationDate);
      case 'popular':
        return b.citations - a.citations;
      case 'reading-time':
        return a.readingTime - b.readingTime;
      default:
        return 0;
    }
  });

  const handleBookmark = (insightId) => {
    setBookmarkedInsights(prev => 
      prev.includes(insightId) 
        ? prev.filter(id => id !== insightId)
        : [...prev, insightId]
    );

    // Add notification
    const insight = allInsights.find(i => i.id === insightId);
    const isBookmarked = bookmarkedInsights.includes(insightId);
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      title: isBookmarked ? 'Favori retiré' : 'Ajouté aux favoris',
      message: `"${insight.title}" ${isBookmarked ? 'retiré de vos' : 'ajouté à vos'} favoris.`,
      persistent: false
    }, ...prev]);
  };

  const handleShare = (insight) => {
    // Mock share functionality
    setNotifications(prev => [{
      id: Date.now(),
      type: 'insight',
      title: 'Insight partagé',
      message: `"${insight.title}" a été copié dans votre presse-papiers.`,
      persistent: false
    }, ...prev]);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Convert category ID to category name for filtering
    const categoryMap = {
      'emotional-triggers': 'Déclencheurs Émotionnels',
      'decision-fatigue': 'Fatigue Décisionnelle',
      'reward-psychology': 'Psychologie des Récompenses',
      'cognitive-biases': 'Biais Cognitifs',
      'financial-habits': 'Habitudes Financières',
      'stress-money': 'Stress et Argent'
    };
    
    setActiveFilters(prev => ({
      ...prev,
      category: categoryMap[categoryId] || ''
    }));
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  // Initialize with welcome notification
  useEffect(() => {
    setNotifications([{
      id: Date.now(),
      type: 'insight',
      title: 'Bienvenue dans votre bibliothèque d\'insights !',
      message: 'Découvrez comment la neuroscience peut transformer votre relation à l\'argent.',
      details: 'Explorez nos 39 insights basés sur des recherches scientifiques vérifiées.',
      persistent: false
    }]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16">
        {/* Progress Indicator */}
        <div className="border-b border-border/20 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ProgressIndicator 
              currentStep={5} 
              totalSteps={6}
              variant="minimal"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Brain" size={28} color="white" strokeWidth={2.5} />
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                Bibliothèque d'Insights Neuroscientifiques
              </h1>
            </div>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Découvrez les mécanismes cérébraux qui gouvernent vos décisions financières 
              et apprenez à optimiser votre comportement grâce à la science.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
                iconPosition="left"
              >
                Grille
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                iconName="List"
                iconPosition="left"
              >
                Liste
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowProgressTracker(!showProgressTracker)}
                iconName={showProgressTracker ? "EyeOff" : "Eye"}
                iconPosition="left"
              >
                {showProgressTracker ? 'Masquer' : 'Afficher'} progression
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/financial-health-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
              >
                Tableau de bord
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Search and Filter */}
              <SearchAndFilter
                onSearch={setSearchQuery}
                onFilter={setActiveFilters}
                searchQuery={searchQuery}
                activeFilters={activeFilters}
                totalResults={sortedInsights.length}
              />

              {/* Category Grid (shown when no search/filter active) */}
              {searchQuery === '' && activeFilters.category === '' && (
                <CategoryGrid
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              )}

              {/* Recommended Section */}
              {searchQuery === '' && activeFilters.category === '' && (
                <RecommendedSection
                  recommendations={recommendations}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  bookmarkedInsights={bookmarkedInsights}
                />
              )}

              {/* Insights Grid/List */}
              {(searchQuery !== '' || activeFilters.category !== '') && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      {activeFilters.category ? `${activeFilters.category}` : 'Résultats de recherche'}
                    </h2>
                    <span className="text-sm text-text-secondary">
                      {sortedInsights.length} résultat{sortedInsights.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className={`
                    ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-6'
                    }
                  `}>
                    {sortedInsights.map((insight) => (
                      <InsightCard
                        key={insight.id}
                        insight={insight}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                        isBookmarked={bookmarkedInsights.includes(insight.id)}
                      />
                    ))}
                  </div>

                  {sortedInsights.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Aucun résultat trouvé
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Essayez de modifier vos critères de recherche ou explorez nos catégories.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilters({
                            category: '',
                            difficulty: '',
                            sort: 'relevance',
                            bookmarked: false,
                            completed: false
                          });
                        }}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            {showProgressTracker && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ProgressTracker
                    completedModules={progressData.completedModules}
                    totalModules={progressData.totalModules}
                    currentStreak={progressData.currentStreak}
                    longestStreak={progressData.longestStreak}
                    weeklyGoal={progressData.weeklyGoal}
                    weeklyProgress={progressData.weeklyProgress}
                    achievements={progressData.achievements}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <NotificationBanner
        notifications={notifications}
        onDismiss={handleDismissNotification}
        position="top"
        maxVisible={3}
        autoHideDelay={5000}
      />
    </div>
  );
};

export default NeuroscienceInsightsLibrary;