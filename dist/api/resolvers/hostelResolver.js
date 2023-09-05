const hostels = [
    { id: '1', name: 'Hostel A', description: 'Cozy and affordable' },
    { id: '2', name: 'Hostel B', description: 'Modern and vibrant' },
    // Add more hostels
];
const resolvers = {
    Query: {
        hostels: () => hostels,
    },
    Mutation: {
        createHostel: (parent, args) => {
            return {
                id: args.input.id,
                name: args.input.name,
                description: args.input.description
            };
        }
    }
};
export default resolvers;
