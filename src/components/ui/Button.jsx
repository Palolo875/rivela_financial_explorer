import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-heading",
    {
        variants: {
            variant: {
                // Glassmorphism variants
                glass: "btn-glass text-text-primary hover:text-primary",
                gradient: "btn-gradient shadow-glass hover:shadow-glass-hover",
                ghost: "btn-ghost",
                
                // Traditional variants with glassmorphism touches
                primary: "bg-gradient-accent text-white shadow-glass hover:shadow-glass-hover hover:scale-[1.02] transition-all duration-glass",
                secondary: "glass text-text-primary border border-glass-border hover:border-glass-border-hover hover:glass-hover",
                success: "bg-gradient-success text-white shadow-glass hover:shadow-glass-hover hover:scale-[1.02]",
                warning: "bg-gradient-warning text-warning-foreground shadow-glass hover:shadow-glass-hover hover:scale-[1.02]",
                danger: "bg-gradient-to-r from-error to-error/80 text-white shadow-glass hover:shadow-glass-hover hover:scale-[1.02]",
                
                // Specialized variants
                outline: "border border-glass-border-hover glass-subtle text-text-primary hover:glass-hover hover:border-primary/30",
                link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto",
                floating: "glass-intense shadow-glass-hover hover:shadow-strong hover:scale-[1.05] hover:-translate-y-1 transition-all duration-spring",
            },
            size: {
                xs: "h-8 px-3 py-1 text-xs rounded-lg",
                sm: "h-9 px-4 py-2 text-sm rounded-xl",
                default: "h-10 px-6 py-3 text-sm rounded-xl",
                lg: "h-12 px-8 py-3 text-base rounded-xl",
                xl: "h-14 px-10 py-4 text-lg rounded-2xl",
                icon: "h-10 w-10 rounded-xl",
                "icon-sm": "h-8 w-8 rounded-lg",
                "icon-lg": "h-12 w-12 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "glass",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    animate = true,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    const iconSizeMap = {
        xs: 12,
        sm: 14,
        default: 16,
        lg: 18,
        xl: 20,
        icon: 16,
        "icon-sm": 14,
        "icon-lg": 20,
    };

    const calculatedIconSize = iconSize || iconSizeMap[size] || 16;

    // Animation classes
    const animationClasses = animate ? 'micro-bounce' : '';

    // Loading spinner with glassmorphism style
    const LoadingSpinner = () => (
        <div className="animate-spin mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent opacity-70" />
    );

    // Icon rendering with improved styling
    const renderIcon = () => {
        if (!iconName) return null;

        return (
            <Icon
                name={iconName}
                size={calculatedIconSize}
                className={cn(
                    "transition-all duration-glass",
                    children && iconPosition === 'left' && "mr-2",
                    children && iconPosition === 'right' && "ml-2"
                )}
                strokeWidth={2}
            />
        );
    };

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size }),
                fullWidth && "w-full",
                animationClasses,
                disabled && "cursor-not-allowed",
                className
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </Comp>
    );
});

Button.displayName = "Button";

// Specialized button components for common use cases
export const GlassButton = React.forwardRef((props, ref) => (
    <Button variant="glass" ref={ref} {...props} />
));

export const GradientButton = React.forwardRef((props, ref) => (
    <Button variant="gradient" ref={ref} {...props} />
));

export const FloatingActionButton = React.forwardRef(({ 
    iconName, 
    className,
    animate = true,
    ...props 
}, ref) => (
    <Button 
        variant="floating" 
        size="icon-lg"
        iconName={iconName}
        className={cn(
            "fixed bottom-6 right-6 z-1000",
            animate && "animate-breathe",
            className
        )}
        ref={ref} 
        {...props} 
    />
));

export const IconButton = React.forwardRef(({ size = "icon", ...props }, ref) => (
    <Button variant="glass" size={size} ref={ref} {...props} />
));

export const CelebrationButton = React.forwardRef(({ 
    onClick,
    className,
    ...props 
}, ref) => {
    const handleClick = (e) => {
        // Add celebration animation
        e.currentTarget.classList.add('animate-celebration');
        setTimeout(() => {
            e.currentTarget.classList.remove('animate-celebration');
        }, 600);
        
        if (onClick) onClick(e);
    };

    return (
        <Button 
            variant="primary"
            onClick={handleClick}
            className={cn("hover:animate-celebration", className)}
            ref={ref} 
            {...props} 
        />
    );
});

// Named exports for convenience
GlassButton.displayName = "GlassButton";
GradientButton.displayName = "GradientButton";
FloatingActionButton.displayName = "FloatingActionButton";
IconButton.displayName = "IconButton";
CelebrationButton.displayName = "CelebrationButton";

export default Button;