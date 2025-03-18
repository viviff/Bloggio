
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loader2, Download, Globe, Upload, RefreshCw, Eye } from 'lucide-react';

interface ArticleData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  thumbnailUrl: string;
  thumbnailPrompt: string;
  wordCount: number;
}

interface ArticleEditorProps {
  articleId: string;
  articleData: ArticleData;
}

// Mock article data
const mockArticleContent = `
# The Ultimate Guide to Content Creation

Content creation is the process of generating topic ideas that appeal to your buyer persona, creating written or visual content around those ideas, and making that information accessible to your audience as a blog, video, infographic, or other format.

## What is Content Creation?

Content creation is the process of developing and publishing original content to communicate with your target audience. The content can be in various formats, such as blog posts, videos, podcasts, infographics, social media posts, and more.

The main goal of content creation is to provide value to your audience by addressing their needs, interests, and pain points. By doing so, you can build trust and authority in your industry, which can eventually lead to increased conversions and customer loyalty.

## Types of Content

There are many different types of content that you can create, each with its own advantages and purposes. Here are some common types:

- **Blog Posts**: Long-form written content that provides in-depth information on a specific topic.
- **Videos**: Visual content that can be used to explain concepts, showcase products, or entertain your audience.
- **Podcasts**: Audio content that allows you to share your thoughts and insights on various topics.
- **Infographics**: Visual representations of data or information that make complex concepts easier to understand.
- **Social Media Posts**: Short-form content shared on social media platforms to engage with your audience.

## Best Practices

Creating high-quality content requires a strategic approach. Here are some best practices to follow:

1. **Know Your Audience**: Understand who your target audience is and what they're interested in.
2. **Set Clear Goals**: Define what you want to achieve with your content.
3. **Create a Content Calendar**: Plan your content creation schedule in advance.
4. **Focus on Quality**: Create valuable, well-researched content.
5. **Optimize for SEO**: Use relevant keywords and meta tags to make your content discoverable.
6. **Promote Your Content**: Share your content through various channels to reach a wider audience.
7. **Measure Results**: Track the performance of your content and make adjustments as needed.

## Common Challenges

Content creation isn't without its challenges. Here are some common obstacles you might face:

- **Consistency**: Maintaining a regular content creation schedule.
- **Quality vs. Quantity**: Finding the right balance between creating a lot of content and creating high-quality content.
- **Writer's Block**: Coming up with fresh ideas for your content.
- **Resource Constraints**: Limited time, budget, or skills for content creation.
- **Measuring ROI**: Determining the return on investment for your content marketing efforts.

## Conclusion

Content creation is a crucial aspect of digital marketing. By creating valuable, relevant content, you can attract and engage your target audience, build trust and authority, and ultimately drive conversions.

Remember, the key to successful content creation is to focus on your audience's needs and interests. By providing content that they find valuable, you can build a loyal following and achieve your marketing goals.

Stay consistent, focus on quality, and don't be afraid to experiment with different types of content to see what works best for your audience.
`;

const ArticleEditor: React.FC<ArticleEditorProps> = ({ articleId, articleData }) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegeneratingThumbnail, setIsRegeneratingThumbnail] = useState(false);
  const [article, setArticle] = useState<ArticleData>({
    title: articleData.title || 'The Ultimate Guide to Content Creation',
    metaTitle: articleData.metaTitle || 'The Ultimate Guide to Content Creation | Your Blog',
    metaDescription: articleData.metaDescription || 'Learn everything you need to know about content creation in this comprehensive guide. Tips, best practices, and strategies included.',
    content: articleData.content || mockArticleContent,
    thumbnailUrl: articleData.thumbnailUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    thumbnailPrompt: articleData.thumbnailPrompt || 'A modern workspace with a laptop, notebook, and coffee cup, seen from above',
    wordCount: articleData.wordCount || 1500,
  });
  const [activeTab, setActiveTab] = useState('content');

  const handleInputChange = (
    field: keyof ArticleData,
    value: string
  ) => {
    setArticle({
      ...article,
      [field]: value,
    });
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setArticle({
            ...article,
            thumbnailUrl: event.target.result as string,
          });
          
          toast({
            title: "Thumbnail updated",
            description: "Your custom thumbnail has been uploaded",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleRegenerateThumbnail = async () => {
    setIsRegeneratingThumbnail(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just use a different Unsplash image
      const newThumbnailUrl = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc';
      
      setArticle({
        ...article,
        thumbnailUrl: newThumbnailUrl,
      });
      
      toast({
        title: "Thumbnail regenerated",
        description: "A new thumbnail has been created based on your prompt",
      });
    } catch (error) {
      toast({
        title: "Regeneration failed",
        description: "There was an error creating a new thumbnail",
        variant: "destructive",
      });
    } finally {
      setIsRegeneratingThumbnail(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "Article published",
        description: "Your article has been successfully published to WordPress",
      });
    } catch (error) {
      toast({
        title: "Publication failed",
        description: "There was an error publishing your article",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // This would generate a file in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll create a simple text file
      const content = `
Title: ${article.title}
Meta Title: ${article.metaTitle}
Meta Description: ${article.metaDescription}
Word Count: ${article.wordCount}

${article.content}
      `.trim();
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Article downloaded",
        description: "Your article has been saved as a text file",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your article",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="glass-card mb-6">
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
          <CardDescription>
            Refine your generated article before publishing or downloading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="meta">Meta Information</TabsTrigger>
              <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="article-title">Article Title</Label>
                <Input 
                  id="article-title" 
                  value={article.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="font-medium"
                />
              </div>
              
              <div>
                <Label htmlFor="article-content">Article Content</Label>
                <Textarea 
                  id="article-content" 
                  value={article.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Markdown formatting. Current word count: approximately {article.content.split(/\s+/).length} words.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="meta" className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={article.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The title that appears in search engine results. Aim for 50-60 characters.
                </p>
              </div>
              
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  value={article.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  A brief summary that appears in search engine results. Aim for 150-160 characters.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="thumbnail" className="space-y-4">
              <div>
                <Label>Current Thumbnail</Label>
                <div className="mt-2 border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
                  <AspectRatio ratio={16/9}>
                    <img
                      src={article.thumbnailUrl}
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </div>
              
              <div>
                <Label htmlFor="thumbnail-prompt">Thumbnail Generation Prompt</Label>
                <Textarea
                  id="thumbnail-prompt"
                  value={article.thumbnailPrompt}
                  onChange={(e) => handleInputChange('thumbnailPrompt', e.target.value)}
                  placeholder="Describe the image you want for your article thumbnail"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outline"
                    onClick={handleRegenerateThumbnail}
                    disabled={isRegeneratingThumbnail}
                  >
                    {isRegeneratingThumbnail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Thumbnail
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="thumbnail-upload">Upload Custom Thumbnail</Label>
                <div className="mt-2">
                  <Input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended size: 1200x675 pixels (16:9 ratio). Max file size: 2MB.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-800 rounded-md p-6 bg-white dark:bg-gray-900">
                <div className="mb-6">
                  <AspectRatio ratio={16/9}>
                    <img
                      src={article.thumbnailUrl}
                      alt="Article thumbnail"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </AspectRatio>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {/* This would use a Markdown renderer in a real app */}
                  <div dangerouslySetInnerHTML={{ 
                    __html: article.content
                      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/- (.*$)/gm, '<li>$1</li>')
                      .replace(/<li>(.*)<\/li>/gm, '<ul><li>$1</li></ul>')
                      .replace(/\n\n/g, '<p></p>')
                      .replace(/\n\n/g, '<br />')
                  }} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            variant="outline"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Article
              </>
            )}
          </Button>
          
          <Button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="button-transition"
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publish to WordPress
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleEditor;
