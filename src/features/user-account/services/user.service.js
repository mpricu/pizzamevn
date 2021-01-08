const getOrders = async userId => {
    try {
        const response = await fetch(
            `http://localhost:3000/orders?userId=${userId}`
        );
        if (response.ok) {
            return response.json();
        } else {
            return Promise.resolve({
                isError: true,
                status: response.status,
                message: response.message
            });
        }
    } catch (e) {
        return Promise.reject({
            status: e.status,
            message: e.message
        });
    }
};

const getUser = async userId => {
    try {
        console.log("userSERVICE userId", userId);

        const response = await fetch(`http://localhost:3000/api/users/edit-user/${userId}`);
        if (response.ok) {
            return response.json();
        } else {
            return Promise.resolve({
                isError: true,
                status: response.status,
                message: response.message
            });
        }
    } catch (e) {
        return Promise.reject({
            status: e.status,
            message: e.message
        });
    }
};

const authenticateUser = async userName => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/users?userName=${userName}`
        );
        if (response.ok) {
            const userData = await response.json();
            // console.log('userData', userData[0]);
            localStorage.setItem('user', userData[0]);
            return Promise.resolve(userData[0]);
        } else {
            return Promise.resolve({
                isError: true,
                status: response.status,
                message: response.message
            });
        }
    } catch (e) {
        return Promise.reject({
            status: e.status,
            message: e.message
        });
    }
};

export default {
    getOrders,
    getUser,
    authenticateUser
};
