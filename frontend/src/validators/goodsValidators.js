export const checkGoodsSelected = (data) => {
    if (data.items?.length < 1) {
        return {
            message: 'Выберите хотя бы один товар',
            pageId: 'goods',
            place: 'itemCards',
        };
    }
    return null;
};

export const checkGoodsQuantity = (data) => {
    try {
        if (
            !data.items.every(
                (item) =>
                    item.quantity <=
                    data.inventory.find(
                        (inventoryItem) => inventoryItem.slug === item.slug
                    ).quantity
            )
        ) {
            return {
                message: 'Недостаточно товаров',
                pageId: 'goods',
                place: 'itemCards',
            };
        }
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return null;
    }

    return null;
};
