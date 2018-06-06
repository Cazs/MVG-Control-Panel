export const trip_booking_statuses = 
[
    {
        status: 0,
        status_description: 'pending, awaiting confirmation'
    },
    {
        status: 1,
        status_description: 'confirmed/ready'
    },
    {
        status: 2,
        status_description: 'complete'
    },
    {
        status: 3,
        status_description: 'cancelled'
    }
];

export const accommodation_statuses = 
[
    {
    status: 0,
    status_description: 'pending'
    },
    {
    status: 1,
    status_description: 'approved'
    },
    {
    status: 2,
    status_description: 'denied'
    }
];

const general_statuses = 
[
    {
    status: 0,
    status_description: 'Pending'
    },
    {
    status: 1,
    status_description: 'Authorised'
    },
    {
    status: 2,
    status_description: 'Rejected'
    }
];

export default general_statuses;