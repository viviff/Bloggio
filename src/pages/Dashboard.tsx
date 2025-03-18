
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  Edit, 
  CheckCircle,
  RefreshCw,
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

// Mock data for structures and articles
const mockStructures = [
  {
    id: 'structure-1',
    title: 'The Ultimate Guide to Content Creation',
    status: 'completed',
    keyword: 'content creation',
    wordCount: 1500,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'structure-2',
    title: '10 SEO Tips for Beginners',
    status: 'processing',
    keyword: 'seo tips',
    wordCount: 1200,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'structure-3',
    title: 'How to Create Engaging Social Media Posts',
    status: 'failed',
    keyword: 'social media engagement',
    wordCount: 1800,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

const mockArticles = [
  {
    id: 'article-1',
    title: 'The Ultimate Guide to Content Creation',
    status: 'published',
    wordCount: 1547,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'article-2',
    title: 'How to Improve Your Website SEO',
    status: 'draft',
    wordCount: 1823,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

// Status badges
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'completed' || status === 'published') {
    return (
      <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle className="h-3 w-3 mr-1" />
        {status}
      </div>
    );
  } else if (status === 'processing') {
    return (
      <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
        {status}
      </div>
    );
  } else if (status === 'draft') {
    return (
      <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
        <Edit className="h-3 w-3 mr-1" />
        {status}
      </div>
    );
  } else {
    return (
      <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
        <XCircle className="h-3 w-3 mr-1" />
        {status}
      </div>
    );
  }
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <Link to="/new-article">
            <Button className="button-transition">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Generated Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockArticles.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Structures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStructures.filter(s => s.status === 'processing').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockArticles.filter(a => a.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">100</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="structures">Structures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            {mockArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={article.thumbnail} 
                        alt={article.title}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <StatusBadge status={article.status} />
                      </div>
                      <CardDescription>
                        {formatDate(article.createdAt)} • {article.wordCount} words
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <div className="flex space-x-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>No Articles Yet</CardTitle>
                  <CardDescription>
                    Start by creating your first article
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/new-article">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Article
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="structures">
            {mockStructures.length > 0 ? (
              <div className="space-y-4">
                {mockStructures.map((structure) => (
                  <Card key={structure.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{structure.title}</CardTitle>
                        <StatusBadge status={structure.status} />
                      </div>
                      <CardDescription>
                        {formatDate(structure.createdAt)} • Keyword: {structure.keyword} • {structure.wordCount} words
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0 flex justify-end">
                      {structure.status === 'completed' && (
                        <Button size="sm">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Continue to Article
                        </Button>
                      )}
                      {structure.status === 'processing' && (
                        <Button size="sm" variant="outline" disabled>
                          <Clock className="h-4 w-4 mr-2" />
                          Processing...
                        </Button>
                      )}
                      {structure.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>No Structures Yet</CardTitle>
                  <CardDescription>
                    Start by creating your first article structure
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/new-article">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Structure
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
