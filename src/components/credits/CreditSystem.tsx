
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Check, CreditCard, Sparkles } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 19,
    credits: 10,
    features: [
      '10 article generations',
      'Standard image quality',
      'Email support',
      '7-day history',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 49,
    credits: 30,
    features: [
      '30 article generations',
      'Premium image quality',
      'Priority email support',
      '30-day history',
      'WordPress integration',
    ],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 99,
    credits: 70,
    features: [
      '70 article generations',
      'Highest image quality',
      'Priority email & phone support',
      '90-day history',
      'WordPress integration',
      'Custom branding',
    ],
  },
];

const CreditSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPlanData = pricingPlans.find(plan => plan.id === selectedPlan);
      
      toast({
        title: "Purchase successful",
        description: `You've added ${selectedPlanData?.credits} credits to your account.`,
      });
      
      // In a real app, the user's credits would be updated via the API
      // and the auth context would be refreshed
      setSelectedPlan(null);
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium">Current Credit Balance</h3>
            <p className="text-sm text-muted-foreground">
              You have credits available for generating articles
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 dark:bg-primary/20 rounded-md px-4 py-2 text-2xl font-bold text-primary flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              {user?.credits || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              credits
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-6">Choose a Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`${
              plan.popular
                ? 'border-primary shadow-md dark:shadow-primary/10'
                : 'border-gray-200 dark:border-gray-800'
            } relative transition-all duration-300 ${
              selectedPlan === plan.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.credits} article credits
              </CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full button-transition"
                onClick={() => handleSelectPlan(plan.id)}
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <div className="glass-card p-6 rounded-lg mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium">
                Selected Plan: {pricingPlans.find(plan => plan.id === selectedPlan)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                ${pricingPlans.find(plan => plan.id === selectedPlan)?.price}.00 for {pricingPlans.find(plan => plan.id === selectedPlan)?.credits} credits
              </p>
            </div>
            <Button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="button-transition"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Purchase
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSystem;
