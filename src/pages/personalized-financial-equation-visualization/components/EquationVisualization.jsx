import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';

const EquationVisualization = ({ 
  equationData, 
  isFullscreen = false, 
  onVariableChange,
  emotionalContext = null 
}) => {
  const svgRef = useRef();
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('idle');

  // Mock equation data structure
  const mockEquationData = equationData || {
    formula: "Dépenses Weekend × État Émotionnel = Dépassement Mensuel",
    variables: [
      {
        id: 'weekend_spending',
        name: 'Dépenses Weekend',
        value: 280,
        unit: '€',
        impact: 0.85,
        color: '#EF4444',
        description: 'Moyenne des dépenses de weekend sur 3 mois'
      },
      {
        id: 'emotional_state',
        name: 'État Émotionnel',
        value: 6.2,
        unit: '/10',
        impact: 0.72,
        color: '#F59E0B',
        description: 'Score moyen de stress financier'
      },
      {
        id: 'monthly_overage',
        name: 'Dépassement Mensuel',
        value: 420,
        unit: '€',
        impact: 1.0,
        color: '#DC2626',
        description: 'Montant moyen de dépassement budgétaire'
      }
    ],
    insights: [
      {
        id: 1,
        type: 'correlation',
        strength: 0.89,
        message: "Forte corrélation entre stress émotionnel et dépenses impulsives le weekend"
      },
      {
        id: 2,
        type: 'pattern',
        strength: 0.76,
        message: "Les dépenses augmentent de 34% quand le stress dépasse 7/10"
      }
    ]
  };

  const data = mockEquationData;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = isFullscreen ? 1200 : 800;
    const height = isFullscreen ? 600 : 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create equation flow visualization
    const nodeWidth = 120;
    const nodeHeight = 80;
    const spacing = 200;

    data.variables.forEach((variable, index) => {
      const x = index * spacing + 50;
      const y = height / 2 - nodeHeight / 2;

      // Variable node
      const node = g.append("g")
        .attr("class", "variable-node")
        .attr("transform", `translate(${x},${y})`)
        .style("cursor", "pointer")
        .on("click", () => setSelectedVariable(variable));

      // Node background with glassmorphism effect
      node.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 12)
        .style("fill", variable.color)
        .style("fill-opacity", 0.1)
        .style("stroke", variable.color)
        .style("stroke-width", 2)
        .style("stroke-opacity", 0.3);

      // Variable name
      node.append("text")
        .attr("x", nodeWidth / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "600")
        .style("fill", variable.color)
        .text(variable.name);

      // Variable value
      node.append("text")
        .attr("x", nodeWidth / 2)
        .attr("y", 45)
        .attr("text-anchor", "middle")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "18px")
        .style("font-weight", "700")
        .style("fill", "#1E293B")
        .text(`${variable.value}${variable.unit}`);

      // Impact indicator
      const impactWidth = (nodeWidth - 20) * variable.impact;
      node.append("rect")
        .attr("x", 10)
        .attr("y", nodeHeight - 15)
        .attr("width", impactWidth)
        .attr("height", 4)
        .attr("rx", 2)
        .style("fill", variable.color)
        .style("opacity", 0.8);

      // Connection arrows (except for last variable)
      if (index < data.variables.length - 1) {
        const arrowX = x + nodeWidth + 20;
        const arrowY = height / 2;

        // Arrow line
        g.append("line")
          .attr("x1", arrowX)
          .attr("y1", arrowY)
          .attr("x2", arrowX + 40)
          .attr("y2", arrowY)
          .style("stroke", "#64748B")
          .style("stroke-width", 2)
          .style("opacity", 0.6);

        // Arrow head
        g.append("polygon")
          .attr("points", `${arrowX + 40},${arrowY} ${arrowX + 30},${arrowY - 5} ${arrowX + 30},${arrowY + 5}`)
          .style("fill", "#64748B")
          .style("opacity", 0.6);

        // Operator symbol
        if (index === 0) {
          g.append("text")
            .attr("x", arrowX + 20)
            .attr("y", arrowY - 15)
            .attr("text-anchor", "middle")
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "16px")
            .style("font-weight", "600")
            .style("fill", "#64748B")
            .text("×");
        } else if (index === 1) {
          g.append("text")
            .attr("x", arrowX + 20)
            .attr("y", arrowY - 15)
            .attr("text-anchor", "middle")
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "16px")
            .style("font-weight", "600")
            .style("fill", "#64748B")
            .text("=");
        }
      }
    });

    // Animate nodes on load
    g.selectAll(".variable-node")
      .style("opacity", 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 200)
      .style("opacity", 1)
      .attr("transform", (d, i) => {
        const x = i * spacing + 50;
        const y = height / 2 - nodeHeight / 2;
        return `translate(${x},${y}) scale(1)`;
      });

  }, [data, isFullscreen, selectedVariable]);

  const handleVariableInteraction = (variable, newValue) => {
    if (onVariableChange) {
      onVariableChange(variable.id, newValue);
    }
    setAnimationPhase('updating');
    setTimeout(() => setAnimationPhase('idle'), 1000);
  };

  return (
    <div className={`relative ${isFullscreen ? 'h-screen' : 'h-96'} bg-gradient-to-br from-background to-muted rounded-2xl overflow-hidden`}>
      {/* Particle effects background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * (isFullscreen ? 1200 : 800),
              y: Math.random() * (isFullscreen ? 600 : 400),
              opacity: 0
            }}
            animate={{
              x: Math.random() * (isFullscreen ? 1200 : 800),
              y: Math.random() * (isFullscreen ? 600 : 400),
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main equation title */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-xl px-6 py-3"
        >
          <h2 className="font-heading font-bold text-lg text-center text-foreground">
            {data.formula}
          </h2>
        </motion.div>
      </div>

      {/* SVG Visualization */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Emotional context indicator */}
      {emotionalContext && (
        <div className="absolute top-6 right-6 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-xl p-3 flex items-center space-x-2"
          >
            <Icon 
              name="Heart" 
              size={16} 
              color={emotionalContext.color || 'var(--color-primary)'} 
            />
            <span className="text-sm font-medium text-foreground">
              Humeur: {emotionalContext.level}/10
            </span>
          </motion.div>
        </div>
      )}

      {/* Variable detail panel */}
      <AnimatePresence>
        {selectedVariable && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-0 right-0 h-full w-80 glass border-l border-border/20 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-foreground">
                {selectedVariable.name}
              </h3>
              <button
                onClick={() => setSelectedVariable(null)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <Icon name="X" size={20} color="var(--color-text-secondary)" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {selectedVariable.value}{selectedVariable.unit}
                </div>
                <div className="text-sm text-text-secondary">
                  {selectedVariable.description}
                </div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Impact</span>
                  <span className="text-sm font-bold text-primary">
                    {Math.round(selectedVariable.impact * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${selectedVariable.impact * 100}%`,
                      backgroundColor: selectedVariable.color
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ajuster la valeur
                </label>
                <input
                  type="range"
                  min="0"
                  max={selectedVariable.value * 2}
                  value={selectedVariable.value}
                  onChange={(e) => handleVariableInteraction(selectedVariable, parseFloat(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${selectedVariable.color} 0%, ${selectedVariable.color} 50%, #F1F5F9 50%, #F1F5F9 100%)`
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insight indicators */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="flex flex-wrap gap-2">
          {data.insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-lg px-3 py-2 flex items-center space-x-2"
            >
              <Icon 
                name={insight.type === 'correlation' ? 'TrendingUp' : 'Zap'} 
                size={14} 
                color="var(--color-primary)" 
              />
              <span className="text-xs font-medium text-foreground">
                {Math.round(insight.strength * 100)}% - {insight.message}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animation phase indicator */}
      <AnimatePresence>
        {animationPhase === 'updating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-20"
          >
            <div className="glass rounded-xl p-6 flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="RefreshCw" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-medium text-foreground">
                Recalcul en cours...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EquationVisualization;