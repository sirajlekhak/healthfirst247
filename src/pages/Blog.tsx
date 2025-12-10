import { Calendar, User, ArrowRight, Tag, Clock, ArrowLeft, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogProps {
  onNavigate: (page: string) => void;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  tags: string[];
}

interface BlogData {
  articles: Article[];
  categories: string[];
}

export default function Blog({ onNavigate }: BlogProps) {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call or import
      const response = await fetch('/data/blogData.json');
      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      // Fallback to static data
      setBlogData({
        articles: [],
        categories: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  const handleShare = async (article: Article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing! You'll receive health insights at ${email}`);
      setEmail('');
    }
  };

  const filteredArticles = blogData?.articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = ['All', ...(blogData?.categories || [])];

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health insights...</p>
        </div>
      </div>
    );
  }

  // Article Detail View
  if (selectedArticle) {
    return (
      <div className="min-h-screen pt-24">
        <article className="bg-white">
          {/* Article Header */}
          <div className="relative bg-gradient-to-br from-blue-50 to-emerald-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-8"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Articles
              </button>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedArticle.category}
                </span>
                {selectedArticle.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span className="font-medium">{selectedArticle.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h3>
                  <p className="text-gray-600">Help others benefit from this information</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare(selectedArticle)}
                    className="flex items-center bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(selectedArticle.title + ' - ' + window.location.href)}`, '_blank')}
                    className="flex items-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">More Health Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogData?.articles
                  .filter(article => article.id !== selectedArticle.id)
                  .slice(0, 3)
                  .map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                          {article.category}
                        </span>
                        <h4 className="font-bold text-gray-900 line-clamp-2 mb-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.date}</span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </article>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Health Insights</h2>
            <p className="text-blue-200 mb-8">Get expert medical advice delivered to your inbox</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Article List View
  return (
    <div className="min-h-screen pt-24">
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-5 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Health Insights from Dr. Shailendra
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Medical Wisdom From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">32+ Years</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Evidence-based health information, practical advice, and medical insights based on decades of clinical experience.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
              
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-teal-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors">
                      Read Article
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Join Our Health Community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Expert Health Insights Delivered
              </h2>
              <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-2xl mx-auto">
                Receive evidence-based health advice, preventive care tips, and medical updates from Dr. Shailendra's 32+ years of experience.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-blue-300 text-sm mt-4">
                No spam. Unsubscribe anytime. Your health information is confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dr. Shailendra"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-700 to-teal-600 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <p className="text-3xl font-bold">32+</p>
                  <p className="text-sm font-medium">Years Experience</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Insights From Decades of Medical Practice
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Each article is based on Dr. Shailendra's extensive clinical experience across India's premier medical institutions, providing you with trustworthy, evidence-based health information.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Clinical Experience:</strong> Real-world insights from treating thousands of patients
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Evidence-Based:</strong> Information backed by medical research and guidelines
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Practical Advice:</strong> Actionable tips you can implement in your daily life
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                Schedule a Personal Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}