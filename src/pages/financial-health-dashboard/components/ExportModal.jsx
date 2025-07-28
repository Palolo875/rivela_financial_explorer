import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ 
  isOpen = false,
  onClose,
  onExport,
  className = "" 
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportPeriod, setExportPeriod] = useState('last_6_months');
  const [selectedSections, setSelectedSections] = useState({
    health_score: true,
    goals_progress: true,
    trends: true,
    behavioral_alerts: true,
    emotional_analysis: true,
    transactions: false,
    insights: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      label: 'Rapport PDF',
      description: 'Document complet avec graphiques',
      icon: 'FileText',
      color: 'var(--color-error)'
    },
    {
      id: 'excel',
      label: 'Fichier Excel',
      description: 'Données brutes pour analyse',
      icon: 'Table',
      color: 'var(--color-success)'
    },
    {
      id: 'csv',
      label: 'Données CSV',
      description: 'Format compatible universellement',
      icon: 'Database',
      color: 'var(--color-primary)'
    }
  ];

  const exportPeriods = [
    { id: 'last_month', label: 'Dernier mois' },
    { id: 'last_3_months', label: '3 derniers mois' },
    { id: 'last_6_months', label: '6 derniers mois' },
    { id: 'last_year', label: 'Dernière année' },
    { id: 'all_time', label: 'Toutes les données' }
  ];

  const exportSections = [
    {
      id: 'health_score',
      label: 'Indice de santé financière',
      description: 'Score global et évolution'
    },
    {
      id: 'goals_progress',
      label: 'Progression des objectifs',
      description: 'Statut et recommandations'
    },
    {
      id: 'trends',
      label: 'Analyse des tendances',
      description: 'Graphiques et projections'
    },
    {
      id: 'behavioral_alerts',
      label: 'Alertes comportementales',
      description: 'Détection d\'anomalies'
    },
    {
      id: 'emotional_analysis',
      label: 'Corrélation émotionnelle',
      description: 'Analyse humeur-dépenses'
    },
    {
      id: 'transactions',
      label: 'Historique des transactions',
      description: 'Détail de toutes les opérations'
    },
    {
      id: 'insights',
      label: 'Insights personnalisés',
      description: 'Conseils et recommandations'
    }
  ];

  const handleSectionToggle = (sectionId) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportData = {
      format: exportFormat,
      period: exportPeriod,
      sections: selectedSections,
      timestamp: new Date().toISOString()
    };

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onExport) {
        onExport(exportData);
      }
      
      // Simulate file download
      const filename = `rivela-financial-report-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      // Exporting data...
      
      onClose();
    } catch (error) {
      // Export failed
    } finally {
      setIsExporting(false);
    }
  };

  const getSelectedSectionsCount = () => {
    return Object.values(selectedSections).filter(Boolean).length;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-1200 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">
                Exporter vos Données
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Téléchargez votre analyse financière personnalisée
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isExporting}
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          {/* Export Format Selection */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Format d'export
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setExportFormat(format.id)}
                  className={`
                    p-4 rounded-xl border transition-all duration-300
                    ${exportFormat === format.id 
                      ? 'border-primary bg-primary/10' :'border-border/20 hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={format.icon} 
                      size={24} 
                      color={exportFormat === format.id ? 'var(--color-primary)' : format.color}
                    />
                    <div className="text-left">
                      <div className="font-medium text-foreground text-sm">
                        {format.label}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {format.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Period Selection */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Période d'analyse
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {exportPeriods.map((period) => (
                <Button
                  key={period.id}
                  variant={exportPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExportPeriod(period.id)}
                  className="justify-start"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sections Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-foreground">
                Sections à inclure
              </h3>
              <span className="text-sm text-text-secondary">
                {getSelectedSectionsCount()} / {exportSections.length} sélectionnées
              </span>
            </div>
            
            <div className="space-y-3">
              {exportSections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-start space-x-3 p-3 bg-surface rounded-lg border border-border/10"
                >
                  <Checkbox
                    checked={selectedSections[section.id]}
                    onChange={(e) => handleSectionToggle(section.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">
                      {section.label}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {section.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Preview */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Aperçu de l'export
                </h4>
                <div className="text-sm text-text-secondary space-y-1">
                  <p>Format: {exportFormats.find(f => f.id === exportFormat)?.label}</p>
                  <p>Période: {exportPeriods.find(p => p.id === exportPeriod)?.label}</p>
                  <p>Sections: {getSelectedSectionsCount()} incluses</p>
                  <p>Taille estimée: {exportFormat === 'pdf' ? '2-5 MB' : exportFormat === 'excel' ? '500 KB - 2 MB' : '100-500 KB'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || getSelectedSectionsCount() === 0}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Export en cours...' : 'Exporter'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;