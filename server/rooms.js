
const rooms = ['Transportation', 'Siblings', 'Paranormal', 'Literature', 'Shit 4chan Says']

const addRoom = ({ id, room }) => {
    room = room.trim().toLowerCase();

    const existingRoom = rooms.find((a) => a.room === room);

    if(existingRoom) return {error: 'Room name exists'};

    const roomName = { id, room }

    rooms.push(roomName)

    return { roomName }
}

const removeRoom = (id) => {
    const index = rooms.findIndex( a => a.id === id)

    if(index !== -1) return rooms.splice(index, 1)[0];
}

const getRoom = id => rooms.find(a=>a.id === id)

module.exports = { addRoom, removeRoom, getRoom }