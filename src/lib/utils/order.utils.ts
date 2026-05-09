import { formatDate } from "./date.utils";

export const transFormOrderData = (orders: any) => {
    if (!Array.isArray(orders)) return [];

    const transformedOrders = orders.map((order: any) => {
        const firstItem = order.items[0];
        const item = firstItem.productId;
        return {
            title: `Order #${order._id.slice(-7).toUpperCase()}`, // Item title from the product data 
            image: item.images[0], // Image URL from the product data
            price: order.summary.total, // order price total
            date: formatDate(order.createdAt), // Order creation date
            orderStatus: order.order_status, // order status
            itemCount: order.items.length, // Number of items in the order
        }
    });
    return transformedOrders
}