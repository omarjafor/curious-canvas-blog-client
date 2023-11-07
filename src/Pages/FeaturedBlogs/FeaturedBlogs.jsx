import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'Serial Number',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Profile Photo',
        selector: row => row.profile,
        sortable: true
    },
    {
        name: 'Owner Name',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Blog Title',
        selector: row => row.title,
        sortable: true
    },
];

const data = [
    {
        id: 1,
        profile: 'profile1.jpg',
        name: 'John Doe',
        title: 'Software Engineer'
    },
    {
        id: 2,
        profile: 'profile2.jpg',
        name: 'Alice Smith',
        title: 'Graphic Designer'
    },
    {
        id: 3,
        profile: 'profile3.jpg',
        name: 'Bob Johnson',
        title: 'Marketing Manager'
    },
    {
        id: 4,
        profile: 'profile4.jpg',
        name: 'Emily Brown',
        title: 'Data Scientist'
    },
    {
        id: 5,
        profile: 'profile5.jpg',
        name: 'David Wilson',
        title: 'Product Manager'
    },
    {
        id: 6,
        profile: 'profile6.jpg',
        name: 'Olivia Lee',
        title: 'UX Designer'
    },
    {
        id: 7,
        profile: 'profile7.jpg',
        name: 'Michael Davis',
        title: 'Financial Analyst'
    },
    {
        id: 8,
        profile: 'profile8.jpg',
        name: 'Sophia Martinez',
        title: 'Content Writer'
    },
    {
        id: 9,
        profile: 'profile9.jpg',
        name: 'William White',
        title: 'Sales Manager'
    },
    {
        id: 10,
        profile: 'profile10.jpg',
        name: 'Ava Harris',
        title: 'Front-end Developer'
    }
]


const FeaturedBlogs = () => {
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                fixedHeader
                pagination
            />
        </div>
    );
};

export default FeaturedBlogs;