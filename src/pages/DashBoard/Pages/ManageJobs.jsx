import React, { useMemo, Suspense } from 'react';
import HotJobs from '../../Home/HotJobs';

const ManageJobs = () => {
    const jobPromise = useMemo(() => 
        fetch('http://localhost:3000/jobs').then(res => res.json()), 
    []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Your Jobs</h2>
            <Suspense fallback={<p>Loading...</p>}>
                <HotJobs jobPromise={jobPromise} />
            </Suspense>
        </div>
    );
};

export default ManageJobs;