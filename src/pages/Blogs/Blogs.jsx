import React from 'react';
import { Calendar, Tag, MessageCircle, ChevronRight } from 'lucide-react';

const Blogs = () => {
    const blogPosts = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "1 Comments",
            title: "The Art of Coffee in Workspace",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "3 Comments",
            title: "Little Bird 2.0 Sceneries",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "0 Comments",
            title: "Link For Join Ellakay",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        },
        {
            id: 4,
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "0 Comments",
            title: "Team Collaboration Secrets",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        },
        {
            id: 5,
            image: "https://images.pexels.com/photos/3184315/pexels-photo-3184315.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "0 Comments",
            title: "Modern Office Essentials",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        },
        {
            id: 6,
            image: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
            date: "April 26, 2021",
            category: "Education",
            comments: "2 Comments",
            title: "Digital Nomad Lifestyle",
            description: "A job ravenously while Far much that one rank beheld after outside...."
        }
    ];

    return (
        <section id='blog-section' className="bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Heading Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Latest Blog Posts
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Explore our insights and news about the industry, career tips, and workspace culture.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            {/* Image Container */}
                            <div className="h-64 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Meta Data */}
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Tag size={14} /> {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={14} /> {post.comments}
                                    </span>
                                </div>

                                {/* Title & Text */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-primary cursor-pointer transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {post.description}
                                </p>

                                {/* Read More Link */}
                                <button className="flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all group">
                                    Read More 
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;