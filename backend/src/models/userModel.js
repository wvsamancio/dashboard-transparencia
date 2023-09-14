const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM users');
    return users;
};

const create = async (name, email, password) => {
    await connection.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return true;
};

const deleteById = async (id) => {
    await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
    );
    return true;
};

const updateById = async (id, name, email, password) => {
    await connection.execute(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, id]
    );
    return true;
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById
};