import { Donor } from './donor.model';
// import redis from 'redis';
// const client = redis.createClient();
// Service to fetch all donors from the database
const getAllDonorsFromDB = async () => {
    console.log('Fetching all donors...');
    const result = await Donor.find();
    return result;
};

// Service to fetch donors based on query parameters (like bloodGroup, division, district)
const getDonorsByQueryFromDB = async (bloodGroup: string, division: string, district: string) => {
    try {
        // const result = await Donor.find({
        //     bloodGroup,
        //     'presentAddress.division': division,
        //     'presentAddress.district': district,
        // });
        const result = await Donor.aggregate([
            { $match: { 
                "presentAddress.division": division,
                "presentAddress.district": district,
                bloodGroup: bloodGroup
            }},
            {
                $group: {
                    _id: "$presentAddress.district",
                    totalDonors: { $sum: 1 }
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error('Error fetching donors:', error);
        throw error; // Re-throw the error to be handled by the controller
    }
};

const getDonorsWithPagination = async (page: number, limit: number) => {
    const result = await Donor.find()
        .skip((page - 1) * limit)
        .limit(limit);
    return result;
}

// const getDonorsWithCache = async () => {
//     const cacheKey = "donorsCache";
    
//     // Check if data is in cache
//     client.get(cacheKey, async (err, cachedData) => {
//         if (cachedData) {
//             return JSON.parse(cachedData); // Return cached data
//         } else {
//             const donors = await Donor.find();
//             client.setex(cacheKey, 3600, JSON.stringify(donors)); // Cache for 1 hour
//             return donors;
//         }
//     });
// }

export const DonorServices = {
    getAllDonorsFromDB,
    getDonorsByQueryFromDB,
    getDonorsWithPagination
};
