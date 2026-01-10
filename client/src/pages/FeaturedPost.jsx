function FeaturedPost(){
    return(<>
    {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-purple-600" size={24} />
          <h3 className="text-2xl font-bold text-gray-900">Featured Post</h3>
        </div>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                {featuredPost.category}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <button className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                  Read More <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>);

}
export default FeaturedPost