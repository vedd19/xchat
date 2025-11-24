import { db } from "./firebase";
import { config } from "../config";
import {
    ref,
    get,
    set,
    push,
    update,
    onValue
} from "firebase/database";


export async function getOrCreateRoom(currentUid, otherUid) {

    let roomData;
    let roomId;

    try {
        const response = await fetch(`${config.BACKEND_URL}/api/rooms/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ otheruser: otherUid }),
        });
        const data = await response.json();
        if (data.success) {
            roomData = data.data

        } else {
            console.log("Error creating room in backend:", data.message);

        }
    } catch (err) {
        console.log("Error creating room in backend:", err);
    }

    if (!roomData) {
        console.log("No room data returned from backend");
        return;
    }

    try {
        roomId = roomData._id;
        const roomRef = ref(db, "rooms/" + roomId);
        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            await set(roomRef, {
                users: {
                    [currentUid]: true,
                    [otherUid]: true,
                },
                lastMessage: "",
                updatedAt: Date.now(),
            });
        }
    } catch (err) {
        console.log("Error setting up room in realtime database:", err);
    }

    return roomId;
}

export async function getAllRooms() {

    try {
        const response = await fetch(`${config.BACKEND_URL}/api/rooms/userrooms`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,

            }
        });
        const data = await response.json();
        if (data.success) {
            return data.data;
        } else {
            console.log("Error fetching user rooms from backend:", data.message);
            return [];
        }
    } catch (err) {
        console.log("Error fetching user rooms from backend:", err);
        return [];
    }

}

export async function sendMessage(roomId, senderId, text) {
    const msgRef = push(ref(db, "messages/" + roomId));

    const msgData = {
        content: text,
        senderId,
        timestamp: Date.now(),
    };

    await set(msgRef, msgData);


    await update(ref(db, "rooms/" + roomId), {
        lastMessage: text,
        updatedAt: Date.now(),
    });
}

export function listenMessages(roomId, callback) {
    const messageRef = ref(db, "messages/" + roomId);

    return onValue(messageRef, (snapshot) => {
        const data = snapshot.val() || {};
        callback(Object.values(data));
    });
}

export function listenRooms(userId, callback) {
    const roomsRef = ref(db, "rooms");

    return onValue(roomsRef, (snap) => {
        const data = snap.val() || {};
        const userRooms = [];

        Object.entries(data).forEach(([roomId, room]) => {
            if (room.users?.[userId]) {
                userRooms.push({ roomId, ...room });
            }
        });

        callback(userRooms);
    });
}

export function getUserRooms(currentUid, callback) {
    const roomsRef = ref(db, "rooms");

    onValue(roomsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            callback([]);
            return;
        }

        const userRooms = Object.entries(data)
            .map(([roomId, roomData]) => ({
                id: roomId,
                ...roomData
            }))
            .filter(r => r.users && r.users[currentUid]);

        callback(userRooms);
    });
}

export function setTyping(roomId, userId, isTyping) {
    return set(ref(db, `typing/${roomId}/${userId}`), isTyping);
}

export function listenTyping(roomId, currentUid, callback) {
    const typingRef = ref(db, "typing/" + roomId);

    return onValue(typingRef, (snap) => {
        const data = snap.val() || {};
        Object.entries(data).forEach(([uid, isTyping]) => {
            if (uid !== currentUid) callback(isTyping);
        });
    });
}
