const initialState = {
    notifications: [
        {
            id: 1,
            icon: "mdi-cart-outline",
            title: "Your order is placed",
            desc: "If several languages coalesce the grammar",
        },
        {
            id: 2,
            icon: "mdi-message",
            title: "New Message received",
            desc: "You have 87 unread messages",
        },
        {
            id: 3,
            icon: "mdi-glass-cocktail",
            title: "Your item is shipped",
            desc: "It is a long established fact that a reader will",
        },
        {
            id: 4,
            icon: "mdi-cart-outline",
            title: "Your order is placed",
            desc: "Dummy text of the printing and typesetting industry.",
        },
        {
            id: 5,
            icon: "mdi-message",
            title: "New Message received",
            desc: "You have 87 unread messages",
        },
    ],
    totalNotifications: 220,
    totalUnreadNotifications: 3,
};

export default function Notifications(state = initialState, { type, payload }) {
    switch (type) {
        default:
            return {
                ...state,
                ...payload,
                error: null,
                loading: false,
            };
    }
}
