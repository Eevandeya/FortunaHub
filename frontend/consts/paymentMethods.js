const paymentMethods = [
    {
        id: 'full',
        title: 'Оплата онлайн полной суммы',
        description:
            'Оплата всей суммы онлайн. Бронь подтверждается мгновенно.',
        price: 0,
    },
    {
        id: 'deposit',
        title: 'Частичная оплата с внесением депозита',
        description:
            'Внесение предоплаты для бронирования. Остаток оплачивается на месте.',
        price: 0,
    },
    {
        id: 'offline',
        title: 'Оплата через менеджера',
        description: 'Связаться с администратором лично',
        price: 0,
    },
];

export default paymentMethods;
