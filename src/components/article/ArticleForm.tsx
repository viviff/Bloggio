
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Link2, Hash, AlignLeft, Info } from 'lucide-react';

// Validation schema
const articleFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  sourceUrl1: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  sourceUrl2: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  keyword: z.string().min(1, 'Please enter a main keyword'),
  wordCount: z.coerce.number().min(300, 'Word count must be at least 300').max(5000, 'Word count cannot exceed 5000'),
  additionalInfo: z.string(),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

const ArticleForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    sourceUrl1: '',
    sourceUrl2: '',
    keyword: '',
    wordCount: 1000,
    additionalInfo: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific field error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    try {
      articleFormSchema.parse(formData);
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

    // Check if user has enough credits
    if (user && user.credits < 1) {
      toast({
        title: "Insufficient credits",
        description: "Please purchase more credits to generate articles",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      toast({
        title: "Request submitted",
        description: "Your article structure is being generated",
      });
      
      // Navigate to the waiting page
      navigate('/edit-structure', { 
        state: { 
          articleData: formData,
          structureId: 'structure-' + Date.now() 
        } 
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate New Article</CardTitle>
        <CardDescription>
          Fill out the form below to generate a new article structure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center">
              <AlignLeft className="h-4 w-4 mr-2" />
              Article Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Ultimate Guide to Content Creation"
              className={formErrors.title ? 'border-red-500' : ''}
            />
            {formErrors.title && (
              <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceUrl1" className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              Source URL #1
            </Label>
            <Input
              id="sourceUrl1"
              name="sourceUrl1"
              value={formData.sourceUrl1}
              onChange={handleChange}
              placeholder="https://example.com/source1"
              className={formErrors.sourceUrl1 ? 'border-red-500' : ''}
            />
            {formErrors.sourceUrl1 && (
              <p className="text-red-500 text-xs mt-1">{formErrors.sourceUrl1}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceUrl2" className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              Source URL #2 (Optional)
            </Label>
            <Input
              id="sourceUrl2"
              name="sourceUrl2"
              value={formData.sourceUrl2}
              onChange={handleChange}
              placeholder="https://example.com/source2"
              className={formErrors.sourceUrl2 ? 'border-red-500' : ''}
            />
            {formErrors.sourceUrl2 && (
              <p className="text-red-500 text-xs mt-1">{formErrors.sourceUrl2}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword" className="flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              Main Keyword
            </Label>
            <Input
              id="keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="e.g. content creation"
              className={formErrors.keyword ? 'border-red-500' : ''}
            />
            {formErrors.keyword && (
              <p className="text-red-500 text-xs mt-1">{formErrors.keyword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wordCount" className="flex items-center">
              Word Count
            </Label>
            <Input
              id="wordCount"
              name="wordCount"
              type="number"
              min={300}
              max={5000}
              value={formData.wordCount}
              onChange={handleChange}
              className={formErrors.wordCount ? 'border-red-500' : ''}
            />
            {formErrors.wordCount && (
              <p className="text-red-500 text-xs mt-1">{formErrors.wordCount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Additional Information (Optional)
            </Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Add any specific requirements or notes about the article"
              rows={4}
              className={formErrors.additionalInfo ? 'border-red-500' : ''}
            />
            {formErrors.additionalInfo && (
              <p className="text-red-500 text-xs mt-1">{formErrors.additionalInfo}</p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Cost: 1 credit
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="button-transition"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Article Structure'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleForm;
