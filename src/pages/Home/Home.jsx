import React, { Suspense, useMemo } from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';

const Home = () => {
    const jobPromise = useMemo(() => 
        fetch('http://localhost:3000/jobs').then(res => res.json()), 
    []);

    return (
        <div>
            <Banner />
            <Suspense fallback={<p className="text-center">Loading jobs...</p>}>
                <HotJobs jobPromise={jobPromise} />
            </Suspense>
        </div>
    );
};

export default Home;