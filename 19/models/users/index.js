
const Users = [
    {
        id: 1,
        firstName: 'Diana',
        lastName: 'Agapkina'
    },
    {
        id: 2,
        firstName: 'Nastya',
        lastName: 'Septilko'
    },
    {
        id: 3,
        firstName: 'Vlad',
        lastName: 'Lalala'
    }
];

module.exports = {
    getUserByFirstName: (firstName) => {
        return Users.find(user => user.firstName === firstName);
    },

    createUser: ({firstName, lastName}) => {
        const id = Users.length + 1;
        const newUser = {id, firstName, lastName};
        Users.push(newUser);
        return newUser;
    }
};
