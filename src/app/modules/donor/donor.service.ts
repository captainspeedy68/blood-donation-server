import { Donor } from './donor.model';

// Service to fetch all donors from the database
const getAllDonorsFromDB = async () => {
    console.log('Fetching all donors...');
    const result = await Donor.find();
    return result;
};

// Service to fetch donors based on query parameters (like bloodGroup, division, district)
const getDonorsByQueryFromDB = async (bloodGroup: string, division: string, district: string) => {
    try {
        const result = await Donor.find({
            bloodGroup,
            'presentAddress.division': division,
            'presentAddress.district': district,
        });
        return result;
    } catch (error) {
        console.error('Error fetching donors:', error);
        throw error; // Re-throw the error to be handled by the controller
    }
};

export const DonorServices = {
    getAllDonorsFromDB,
    getDonorsByQueryFromDB,
};
