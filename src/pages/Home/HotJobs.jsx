import React, { use } from 'react';
import JobCard from '../Shared/JobCard';

const HotJobs = ({ jobPromise }) => {
    const jobs = use(jobPromise);
    
    return (
        <section id="hot-jobs-section" className="w-full px-4 sm:px-8 md:px-12 py-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10">
                    Hot Jobs of the Day
                </h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
                    {
                        jobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default HotJobs;