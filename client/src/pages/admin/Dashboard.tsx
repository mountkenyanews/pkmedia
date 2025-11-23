import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  BarChart3,
  Menu,
  Image as ImageIcon,
  Tags,
  MoreVertical,
  Pencil,
  Trash2,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_ARTICLES, MOCK_STATS, CATEGORIES } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isArticleSheetOpen, setIsArticleSheetOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Mock States for interactivity
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [categories, setCategories] = useState(CATEGORIES);

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    toast({
      title: editingArticle ? "Article Updated" : "Article Published",
      description: "The changes have been saved successfully.",
    });
    setIsArticleSheetOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter(a => a.id !== id));
      toast({
        title: "Article Deleted",
        description: "The article has been removed.",
        variant: "destructive"
      });
    }
  };

  const openArticleEditor = (article?: any) => {
    setEditingArticle(article || null);
    setIsArticleSheetOpen(true);
  };

  const Sidebar = () => (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300 w-64">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight">MK Admin</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === 'overview' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          onClick={() => setActiveTab('overview')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === 'articles' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          onClick={() => setActiveTab('articles')}
        >
          <FileText className="mr-2 h-4 w-4" /> Articles
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === 'media' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          onClick={() => setActiveTab('media')}
        >
          <ImageIcon className="mr-2 h-4 w-4" /> Media Library
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === 'categories' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          onClick={() => setActiveTab('categories')}
        >
          <Tags className="mr-2 h-4 w-4" /> Categories
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeTab === 'settings' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <Button 
          variant="destructive" 
          className="w-full justify-start"
          onClick={() => setLocation("/admin/login")}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 border-r-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
               <Button variant="outline" size="sm">View Site</Button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
                      <h3 className="text-3xl font-bold mt-2">{articles.length}</h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                      <h3 className="text-3xl font-bold mt-2">{categories.length}</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                      <Tags className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Readers</p>
                      <h3 className="text-3xl font-bold mt-2">{MOCK_STATS.activeUsers}</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                      <Users className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">New Posts (24h)</p>
                      <h3 className="text-3xl font-bold mt-2">{MOCK_STATS.recentPosts}</h3>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div>
                                            <p className="text-sm font-medium">Article Published</p>
                                            <p className="text-xs text-muted-foreground">2 hours ago by Admin</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Database</span>
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Operational</Badge>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-sm">API Latency</span>
                                <span className="text-sm font-mono text-muted-foreground">45ms</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-sm">Storage</span>
                                <span className="text-sm font-mono text-muted-foreground">45% Used</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ARTICLES TAB */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search articles..." className="pl-8" />
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => openArticleEditor()}>
                  <Plus className="mr-2 h-4 w-4" /> Add Article
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-md truncate">{article.title}</TableCell>
                        <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openArticleEditor(article)}>
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {/* MEDIA TAB */}
          {activeTab === 'media' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">Media Library</h2>
                      <Button>
                          <Upload className="mr-2 h-4 w-4" /> Upload New
                      </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {[1,2,3,4,5,6,7,8].map((i) => (
                          <div key={i} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border hover:border-primary cursor-pointer">
                              <img src={`https://picsum.photos/seed/${i}/300/300`} alt="Media" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <Button variant="secondary" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                  <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold">Manage Categories</h2>
                      <div className="flex gap-2">
                          <Input placeholder="New Category Name" className="w-64" />
                          <Button><Plus className="mr-2 h-4 w-4" /> Add</Button>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categories.map((cat) => (
                          <Card key={cat} className="group hover:border-primary transition-colors">
                              <CardContent className="p-4 flex justify-between items-center">
                                  <span className="font-medium">{cat}</span>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                  </div>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
              </div>
          )}

        </main>
      </div>

      {/* Article Editor Sheet */}
      <Sheet open={isArticleSheetOpen} onOpenChange={setIsArticleSheetOpen}>
        <SheetContent side="right" className="w-[100%] sm:w-[600px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>{editingArticle ? "Edit Article" : "Create New Article"}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSaveArticle} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input id="title" defaultValue={editingArticle?.title} placeholder="Enter a catchy headline" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={editingArticle?.category || "Politics"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" defaultValue={editingArticle?.author} placeholder="Author Name" />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <div className="flex gap-2">
                <Input id="image" defaultValue={editingArticle?.image} placeholder="https://..." />
                <Button type="button" variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                defaultValue={editingArticle?.content} 
                placeholder="Write your article here..." 
                className="min-h-[300px] font-serif"
              />
            </div>

            <div className="flex items-center gap-8 p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Switch id="featured" defaultChecked={editingArticle?.featured} />
                    <Label htmlFor="featured">Featured Story</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Switch id="breaking" defaultChecked={editingArticle?.isBreaking} />
                    <Label htmlFor="breaking" className="text-red-600 font-bold">Breaking News</Label>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" className="flex-1">
                    {editingArticle ? "Update Article" : "Publish Article"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsArticleSheetOpen(false)}>
                    Cancel
                </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
