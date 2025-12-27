import React from 'react';

const DashboardHome = () => {
    const stats = [
        { label: 'Posted Jobs', count: '12', color: 'bg-blue-100 text-blue-600' },
        { label: 'Applications', count: '120', color: 'bg-green-100 text-green-600' },
        { label: 'Shortlisted', count: '45', color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`p-6 rounded-xl shadow-sm border border-gray-100 ${stat.color}`}>
                        <h3 className="text-lg font-medium">{stat.label}</h3>
                        <p className="text-3xl font-bold">{stat.count}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4">Recent Activities</h3>
                <p className="text-gray-500">No recent activities to show.</p>
            </div>
        </div>
    );
};

export default DashboardHome;