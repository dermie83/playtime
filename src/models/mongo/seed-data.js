export const seedData = {
    users: {
        _model: "User",
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret"
        },
        marge: {
            firstName: "Marge",
            lastName: "Simpson",
            email: "marge@simpson.com",
            password: "secret"
        },
        bart: {
            firstName: "Bart",
            lastName: "Simpson",
            email: "bart@simpson.com",
            password: "secret"
        }
    },
    groups: {
        _model: "Group",
        myTestGroup: {
            title: "Test Group 1",
            img: "http://res.cloudinary.com/dbx8kj5x4/image/upload/v1712088094/erxlob4tqjqne8wfdjr8.jpg",
            userid: "->users.bart"
        }
    },
    lighthouses: {
        _model: "Lighthouse",
        Lighthouse_1: {
            title: "Lighthouse 1",
            towerHeight: 35,
            lightHeight: 46,
            character: "Fl(3) W3s",
            daymark: "Painted Black and White",
            range: 23,
            latitude: 53.333,
            longitude: -7.444,
            report: { temperature: 17.78,
                tempTrend: [
                    15.06,
                    14.68,
                    14.57,
                    15.43,
                    15.07,
                    14.55,
                    16.54,
                    16.7
                ],
                trendLabels: [
                    "25/8/2023",
                    "26/8/2023",
                    "27/8/2023",
                    "28/8/2023",
                    "29/8/2023",
                    "30/8/2023",
                    "31/8/2023",
                    "1/9/2023"
                ], },
            groupid: "->groups.myTestGroup"
        },
    }
};
