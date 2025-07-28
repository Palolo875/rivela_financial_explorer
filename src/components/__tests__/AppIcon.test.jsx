import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Icon from '../AppIcon';

describe('AppIcon', () => {
  it('renders a valid Lucide icon', () => {
    render(<Icon name="Home" />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('lucide-house');
  });

  it('renders fallback icon for invalid icon name', () => {
    render(<Icon name="InvalidIconName" />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('lucide-circle-help');
  });

  it('applies custom size prop', () => {
    render(<Icon name="Home" size={32} />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('applies custom color prop', () => {
    render(<Icon name="Home" color="#FF0000" />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('stroke', '#FF0000');
  });

  it('applies custom className', () => {
    render(<Icon name="Home" className="custom-class" />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveClass('custom-class');
  });

  it('applies custom strokeWidth', () => {
    render(<Icon name="Home" strokeWidth={3} />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('stroke-width', '3');
  });

  it('uses default values when no props provided', () => {
    render(<Icon name="Home" />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
    expect(svgElement).toHaveAttribute('stroke-width', '2');
  });
});