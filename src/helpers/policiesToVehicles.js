export default policies => {
    const vehicles = [];

    policies.forEach(({ vehicle, ...policy }) => {
        const exists = vehicles.findIndex(({ reqNumber }) => vehicle.reqNumber === reqNumber);
        if (exists < 0) {
            vehicles.push({
                ...vehicle,
                policies: [policy]
            });
        } else {
            vehicles[exists].policies.push(policy);
        }
    });

    return vehicles;
};
