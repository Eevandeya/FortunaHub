const paymentMethods = [
    {
        id: 'online',
        title: 'Оплата онлайн полной суммы',
        description:
            'Оплата всей суммы онлайн. Бронь подтверждается мгновенно.',
    },
    {
        id: 'deposit',
        title: 'Частичная оплата с внесением депозита',
        description:
            'Внесение предоплаты для бронирования. Остаток оплачивается на месте.',
    },
    {
        id: 'manager',
        title: 'Оплата через менеджера',
        description: 'Связаться с администратором лично',
    },
];

export default paymentMethods;
