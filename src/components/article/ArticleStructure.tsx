
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GripVertical, X, Plus, Image, RefreshCw } from 'lucide-react';

// Mock structure data
const generateMockStructure = (title: string) => {
  return {
    title: title,
    outline: [
      {
        id: 'section-1',
        title: 'Introduction',
        content: 'Brief overview of the topic and why it matters',
      },
      {
        id: 'section-2',
        title: 'What is Content Creation?',
        content: 'Definition and explanation of key concepts',
      },
      {
        id: 'section-3',
        title: 'Types of Content',
        content: 'Detailed breakdown of different content formats',
      },
      {
        id: 'section-4',
        title: 'Best Practices',
        content: 'Strategies and tips for effective content creation',
      },
      {
        id: 'section-5',
        title: 'Common Challenges',
        content: 'Addressing potential obstacles in the content creation process',
      },
      {
        id: 'section-6',
        title: 'Conclusion',
        content: 'Summary of key points and next steps',
      },
    ],
  };
};

interface ArticleStructureProps {
  articleData: {
    title: string;
    keyword: string;
    wordCount: number;
  };
  structureId: string;
}

const ArticleStructure: React.FC<ArticleStructureProps> = ({ 
  articleData, 
  structureId 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [structure, setStructure] = useState(generateMockStructure(articleData.title));
  const [thumbnailPrompt, setThumbnailPrompt] = useState('');

  const handleSectionChange = (id: string, field: 'title' | 'content', value: string) => {
    setStructure((prev) => ({
      ...prev,
      outline: prev.outline.map((section) => 
        section.id === id ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleAddSection = () => {
    const newId = `section-${structure.outline.length + 1}`;
    setStructure((prev) => ({
      ...prev,
      outline: [
        ...prev.outline,
        {
          id: newId,
          title: 'New Section',
          content: 'Add content description here',
        },
      ],
    }));
  };

  const handleRemoveSection = (id: string) => {
    setStructure((prev) => ({
      ...prev,
      outline: prev.outline.filter((section) => section.id !== id),
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(structure.outline);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setStructure({
      ...structure,
      outline: items,
    });
  };

  const handleRefreshStructure = async () => {
    setIsRefreshing(true);
    
    try {
      // In a real app, this would call an API to regenerate the structure
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a slightly different structure for demonstration
      const newStructure = generateMockStructure(articleData.title);
      newStructure.outline = newStructure.outline.map(section => ({
        ...section,
        title: section.title + ' (Refreshed)',
      }));
      
      setStructure(newStructure);
      
      toast({
        title: "Structure refreshed",
        description: "The article structure has been regenerated",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "There was an error regenerating the structure",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Structure approved",
        description: "Your article is now being generated",
      });
      
      // Navigate to the edit article page
      navigate('/edit-article', { 
        state: { 
          articleData: {
            ...articleData,
            structure: structure,
            thumbnailPrompt: thumbnailPrompt,
          },
          articleId: 'article-' + Date.now(),
        } 
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error approving the structure",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle>Article Structure</CardTitle>
          <CardDescription>
            Review and edit the generated structure before proceeding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="article-title">Article Title</Label>
              <Input 
                id="article-title" 
                value={structure.title}
                onChange={(e) => setStructure({...structure, title: e.target.value})}
                className="font-medium"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Article Sections</Label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshStructure}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddSection}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {structure.outline.map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border border-gray-200 dark:border-gray-800 rounded-md p-3 bg-white dark:bg-gray-900"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div 
                                {...provided.dragHandleProps}
                                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-grab"
                              >
                                <GripVertical className="h-4 w-4 text-gray-500" />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSection(section.id)}
                                className="h-6 w-6"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={section.title}
                                onChange={(e) => 
                                  handleSectionChange(section.id, 'title', e.target.value)
                                }
                                className="font-medium"
                                placeholder="Section Title"
                              />
                              <Textarea
                                value={section.content}
                                onChange={(e) => 
                                  handleSectionChange(section.id, 'content', e.target.value)
                                }
                                rows={2}
                                placeholder="Section description"
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
              <Label htmlFor="thumbnail-prompt" className="flex items-center">
                <Image className="h-4 w-4 mr-2" />
                Thumbnail Generation Prompt
              </Label>
              <Textarea
                id="thumbnail-prompt"
                value={thumbnailPrompt}
                onChange={(e) => setThumbnailPrompt(e.target.value)}
                placeholder="Describe the image you want for your article thumbnail"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide details about the style, subject, and mood of the thumbnail image you want to generate.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="button-transition"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Approve Structure & Generate Article'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleStructure;
